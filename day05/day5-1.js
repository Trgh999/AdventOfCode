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
        return conditionsNumber, arraysNumber;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        throw error;
    }
}

function verifyArray(file){
    return file;
}

(async () => {
    const file = await readFileAsArray('day5input.txt');
    const totalArray = verifyArray(file);
    //console.log(totalArray);
})();