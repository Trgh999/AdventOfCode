'use strict';

const fs = require('fs').promises;

async function readFileAsArray(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const numbers = content
            .split(/\s+/)
            .map(Number);
        return numbers;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

function putInArray(numbers) {
    let tab1 = [];
    let tab2 = [];
    while(numbers[0]){
        tab1.push(numbers[0]);
        tab2.push(numbers[1]);
        numbers.shift();
        numbers.shift();
    }
    return [tab1,tab2];
}

function distance(tab1,tab2) {
    let dist = 0;
    tab1.sort((a,b)=>a-b);
    tab2.sort((a,b)=>a-b);
    for (let i=0;i<tab1.length; i++){
        dist += Math.abs(tab1[i]-tab2[i])
    }
    return dist;
}

(async () => {
    const fileArray = await readFileAsArray('day1input.txt');
    const arrays = putInArray(fileArray);
    const finalDist = distance(arrays[0], arrays[1]);
    console.log(finalDist);
})();
