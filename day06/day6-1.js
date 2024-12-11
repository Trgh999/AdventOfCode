'use strict';

const { match } = require('assert');

const fs = require('fs').promises;

async function readFileAsArray(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');
        let array = content.split(/\n/);
        array = array.map((array) => array.split(""));
        return array;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

function getStart(array){
    const len = array[0].length;
    for(let i=0;i<array.length;i++){
        for (let j=0;j<len;j++){
            if(array[i][j]=='^'){return [i,j]}
        }
    }
}

async function prettyPrint(array){
    let printArr = ""
    for(let i=0;i<array.length;i++){
        for(let j=0;j<array[0].length;j++){
            printArr += array[i][j];
        }
        printArr += "\n";
    }

    await new Promise(r => setTimeout(r,100));

    process.stdout.write("\x1b[2J\x1b[H");
    // process.stdout.write(`\x1b[${array.length}A`);
    process.stdout.write(`\r${printArr}`);

    // console.log(array.length, array[0].length);
    // process.stdout.write(`\u001b[<${array.length}>A`);
    // process.stdout.write(`\u001b[<${array[0].length}>D`);
    // console.log('\u001b[31m');
    // process.stdout.write(printArr);
}


async function getStep(array,pos,total){
    await prettyPrint(array);
    const leni = array.length;
    const lenj = array[0].length;
    let i = pos[0];
    let j = pos[1];
    if(i==0 || j==0 || i==leni-1 || j==lenj-1){
        return total+1;
    }
    switch (array[i][j]){
        case '^':
            switch (array[i-1][j]){
                case '.':
                    array[i-1][j]='^';
                    array[i][j]="X";
                    return getStep(array,[i-1,j],total+1);
                    break;
                case 'X':
                    array[i-1][j]='^';
                    array[i][j]="X";
                    return getStep(array,[i-1,j],total);
                    break;
                case '#':
                    array[i][j]=">";
                    return getStep(array,[i,j],total);
                    break;
            }
            break;
        case '>':
            switch (array[i][j+1]){
                case '.':
                    array[i][j+1]='>';
                    array[i][j]="X";
                    return getStep(array,[i,j+1],total+1);
                    break;
                case 'X':
                    array[i][j+1]='>';
                    array[i][j]="X";
                    return getStep(array,[i,j+1],total);
                    break;
                case '#':
                    array[i][j]="v";
                    return getStep(array,[i,j],total);
                    break;
            }
            break;
        case 'v':
            switch (array[i+1][j]){
                case '.':
                    array[i+1][j]='v';
                    array[i][j]="X";
                    return getStep(array,[i+1,j],total+1);
                    break;
                case 'X':
                    array[i+1][j]='v';
                    array[i][j]="X";
                    return getStep(array,[i+1,j],total);
                    break;
                case '#':
                    array[i][j]="<";
                    return getStep(array,[i,j],total);
                    break;
            }
            break;
        case '<':
            switch (array[i][j-1]){
                case '.':
                    array[i][j-1]='<';
                    array[i][j]="X";
                    return getStep(array,[i,j-1],total+1);
                    break;
                case 'X':
                    array[i][j-1]='<';
                    array[i][j]="X";
                    return getStep(array,[i,j-1],total);
                    break;
                case '#':
                    array[i][j]="^";
                    return getStep(array,[i,j],total);
                    break;
            }
            break;
    }
}

(async () => {
    let array = await readFileAsArray(__dirname+'/day6input.txt');
    const total = await getStep(array,getStart(array),0);
    console.log(total);
})();