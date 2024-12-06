'use strict';

const { match } = require('assert');

const fs = require('fs').promises;

async function readFileAsArray(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const file = content.split(/\n\n/);
        const conditions = file[0].split(/\n/);
        const conditionsNumber = conditions.map((condition) => condition.split('|').map(Number));
        const arrays = file[1].split(/\n/);
        const arraysNumber = arrays.map((array) => array.split(',').map(Number));
        const array = [conditionsNumber, arraysNumber];
        return array;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

function verifyArray(array){
    let total = 0;
    const conditions = array[0];
    const arrays = array[1];
    let k=0;
    let j=0;
    let possible=true;
    for(let i = 0;i<arrays.length;i++){
        k=0
        j=0;
        possible=true;
        const len = arrays[i].length;
        while(j<conditions.length && possible){
            k=0;
            let iprec = -1;
            let isuiv = -1;
            while(k<len){
                let prec = conditions[j][0];
                let suiv = conditions[j][1];
                if (arrays[i][k]==prec){iprec=k;}
                else if(arrays[i][k]==suiv){isuiv=k;}
                k++;
                if(iprec != -1 && isuiv != -1){
                    if(iprec>isuiv){
                        possible=false;
                    }
                    k=len;
                }
            }
            j++;
        }
        if(possible){total+=arrays[i][Math.trunc(len/2)]}
        console.log(total);
    }
    return total;
}

(async () => {
    const file = await readFileAsArray('day5input.txt');
    const totalArray = verifyArray(file);
    console.log(totalArray);
})();