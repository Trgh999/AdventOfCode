'use strict';

const { match } = require('assert');

const fs = require('fs').promises;

async function readFileAsArray(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const file = content.split(/\n/)
        console.log(file);
        return file;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

async function detectXMAS(file){
    let i,j,k = 0;
    let total = 0;
    const XMAS = "XMAS";
    for (i=0;i<file.length;i++){
        for (j=0;j<file[0].length;j++){
            if(file[i][j]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    k = 0;
                }
            } else {
                k = 0;
            }
        }
    }
}


const file = readFileAsArray('day4input.txt');
const totalXMAS = detectXMAS(file);
console.log(totalXMAS);