'use strict';

const { match } = require('assert');

const fs = require('fs').promises;

async function readFileAsString(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

function matchRegex(str){
    return str.match(/(don\'t\(\))|(do\(\))|(mul\(\d+\,\d+\))/g);
}

function regexToInt(tab){
    let sum = 0;
    let willdo = true;
    let tab2 = [];
    for(let i=0;i<tab.length;i++){
        if (tab[i]=="do()"){willdo = true;} 
        else if (tab[i]=="don't()"){willdo = false;}
        else if (willdo){
            tab2 = tab[i].match(/\d+/g);
            sum += tab2[0]*tab2[1];
        }
    }
    return sum;
}

(async () => {
    const fileString = await readFileAsString('day3input.txt');
    const match = matchRegex(fileString);
    const sum = regexToInt(match);
    console.log(sum);
})();