/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');
const process = require("process");
const { MarkovMachine } = require('./markov');

function makeText(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        }
        let mm = new markov.MarkovMachine(data);
        console.log(mm.makeText());
    })
}

async function makeWebText(url){
    let results;

    try {
        results = await axios.get(url);
    }
    catch(e) {
        console.log(`Error fetching ${url}`, e.code, e.hostname)
        process.exit(1);
    }
    let mm = new markov.MarkovMachine(results.data);
    console.log(mm.makeText());
}

// What command is being given in the command line?
if (process.argv[2] === 'url') {
    let url = process.argv[3];
    makeWebText(url);
} else {
    let path = process.argv[3];
    makeText(path);
}