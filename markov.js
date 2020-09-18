/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    //split text on spaces and line breaks
    let words = text.split(/[ \r\n]+/);
    //only keep words that are not ""
    this.words = words.filter(c => c !== "");
    
    //create the set of markov chains
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    // let uniqueWords = this.words.filter((x, i, a) => a.indexOf(x) === i);
    let chains = {}   

    this.words.forEach(function(item, index, arr){
      let nextWord = arr[index + 1] || null;
      if(chains[item]){
        chains[item].push(nextWord);
      } else {
        let chain = [nextWord];
        chains[item] = chain;
        }
      })
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 50) {
    let keys = Array.from(Object.keys(this.chains));
    let randNum = Math.floor(Math.random() * keys.length);
    let key = keys[randNum];
    let text = [];

    while (text.length < numWords){
      text.push(key);
      randNum = Math.floor(Math.random() * keys.length);
      key = keys[randNum];
    }

    let fullText = text.join(" ");
    return fullText;
  }
}

module.exports = { MarkovMachine };