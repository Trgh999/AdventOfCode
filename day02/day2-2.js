'use strict';

const fs = require('fs').promises;

async function readFileAsArray(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const numbers = content
            .split(/\r?\n/);
        let i = 0;
        let mappedNumbers = numbers
        for(i=0; i<numbers.length;i++){
            mappedNumbers[i] = numbers[i].split(/\s+/)
            .map(Number);
        }
        console.log(mappedNumbers);
        return mappedNumbers;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

function NumberOfSafe(tab){
    let i,j = 0;
    //let cpt = 0;
    let boolIncr = true;
    let totalSafe = 0;
    let popable = true;
    for(i=0;i<tab.length;i++){
        for(j=0;j<tab[i].length;j++){
            if (j==0){
                let k,sum=0;
                for(k=1;k<tab[i].length-1;k++){
                    sum += tab[i][k] - tab[i][k-1];
                }
                if (sum > 0){boolIncr = true;}
                else {boolIncr = false;}
            } else if (j==tab[i].length-1){
                totalSafe++;
                break;
            }
            if (((tab[i][j+1]-tab[i][j])>0 && (tab[i][j+1]-tab[i][j])<4 && boolIncr) || ((tab[i][j+1]-tab[i][j])<0 && (tab[i][j+1]-tab[i][j])>-4 && !boolIncr)) {
                if (j==((tab[i].length)-2)){
                    totalSafe++;
                    break;
                }
            } else {
                if (!popable){
                    break;
                }
                else {
                    if(j==(tab[i].length-2)) {
                        totalSafe++;
                        break;
                    }
                    else if (((tab[i][j+2]-tab[i][j])>0 && (tab[i][j+2]-tab[i][j])<4 && boolIncr) || ((tab[i][j+2]-tab[i][j])<0 && (tab[i][j+2]-tab[i][j])>-4 && !boolIncr)){
                        popable = false;
                        j++;
                    }
                    else if (((j==0 && tab[i][j+2]-tab[i][j+1])>0 && (tab[i][j+2]-tab[i][j+1])<4 && boolIncr) || ((j==0 && tab[i][j+2]-tab[i][j+1])<0 && (tab[i][j+2]-tab[i][j+1])>-4 && !boolIncr)){
                        popable = false;
                        j++;
                    }
                    else if (((tab[i][j+1]-tab[i][j-1])>0 && (tab[i][j+1]-tab[i][j-1])<4 && boolIncr) || ((tab[i][j+1]-tab[i][j-1])<0 && (tab[i][j+1]-tab[i][j-1])>-4 && !boolIncr)){
                        popable = false;
                    }
                    else {break;}
                }
            }
        }
        //cpt++;
        //console.log(totalSafe, " : ",cpt);
        j=0;
        boolIncr=true;
        popable=true;
    }
    return totalSafe;
}

(async () => {
    const fileArray = await readFileAsArray('day2input.txt');
    const totalNumber = NumberOfSafe(fileArray);
    console.log(totalNumber);
})();
