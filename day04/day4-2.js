'use strict';

const { match } = require('assert');

const fs = require('fs').promises;

async function readFileAsArray(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const file = content.split(/\n/);
        return file;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

function detectMAS(file){
    let i = 0;
    let j = 0;
    let total = 0;
    for (i=0;i<file.length;i++){
        for (j=0;j<file[0].length;j++){
            if(0<i && i<file[0].length-1 && 0<j && j<file.length-1 && file[i][j]=="A"){
                if((file[i+1][j+1]=="M" && file[i+1][j-1]=="M" && file[i-1][j-1]=="S" && file[i-1][j+1]=="S") || (file[i+1][j+1]=="M" && file[i+1][j-1]=="S" && file[i-1][j-1]=="S" && file[i-1][j+1]=="M") || (file[i+1][j+1]=="S" && file[i+1][j-1]=="M" && file[i-1][j-1]=="M" && file[i-1][j+1]=="S") || (file[i+1][j+1]=="S" && file[i+1][j-1]=="S" && file[i-1][j-1]=="M" && file[i-1][j+1]=="M")){
                    total++;
                }
            }
        }
    }
    return total;
}

(async () => {
    const file = await readFileAsArray('day4input.txt');
    const totalMAS = detectMAS(file);
    console.log(totalMAS);
})();