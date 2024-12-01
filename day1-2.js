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

function unique(value, i, tab){
    return tab.indexOf(value) === i;
}

function similarity(tab1,tab2) {
    let simi = 0;
    tab1.filter(unique);
    tab2.sort((a,b)=>a-b);
    for (let i=0;i<tab1.length; i++){
        const same = tab2.filter((element)=>element==tab1[i]);
        simi += tab1[i]*same.length;
    }
    return simi;
}

(async () => {
    const fileArray = await readFileAsArray('day1input.txt');
    const arrays = putInArray(fileArray);
    const finalSimilarity = similarity(arrays[0], arrays[1]);
    console.log(finalSimilarity);
})();
