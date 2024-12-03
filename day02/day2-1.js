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
    let boolIncr = true;
    let totalSafe = 0;
    for(i=0;i<tab.length;i++){
        for(j=0;j<tab[i].length-1;j++){
            if (j==0){
                if (tab[i][1]-tab[i][0] > 0){boolIncr = true;}
                else {boolIncr = false;}
            }
            if (((tab[i][j+1]-tab[i][j])>0 && (tab[i][j+1]-tab[i][j])<4 && boolIncr) || ((tab[i][j+1]-tab[i][j])<0 && (tab[i][j+1]-tab[i][j])>-4 && !boolIncr)) {
                if (j==((tab[i].length)-2)){
                    totalSafe++;
                }
            } else {break;}
        }
        j=0;
        boolIncr=true;
    }
    return totalSafe;
}

(async () => {
    const fileArray = await readFileAsArray('day2input.txt');
    const totalNumber = NumberOfSafe(fileArray);
    console.log(totalNumber);
})();
