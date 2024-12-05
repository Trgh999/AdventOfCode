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

function detectXMAS(file){
    let i = 0;
    let j = 0;
    let k = 0;
    let m = 0;
    let n = 0;
    let total = 0;
    const XMAS = "XMAS";
    for (i=0;i<file.length;i++){
        for (j=0;j<file[0].length;j++){
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                m++;
            }
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                n++;
            }
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                m--;
            }
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                n--;
            }
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                m++;
                n++;
            }
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                m--;
                n--;
            }
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                m++;
                n--;
            }
            k = 0;
            m = i;
            n = j;
            while(-1<n && n<file[0].length && -1<m && m<file.length && file[m][n]==XMAS[k]){
                k++;
                if(k==4){
                    total++;
                    n = -2;
                }
                m--;
                n++;
            }
        }
    }
    return total;
}

(async () => {
    const file = await readFileAsArray('day4input.txt');
    const totalXMAS = detectXMAS(file);
    console.log(totalXMAS);
})();