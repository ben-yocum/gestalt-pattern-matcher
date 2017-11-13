var compareStrings = require('./gestalt-pattern-matcher');
var fs = require('fs');
var ProgressBar = require('progress');

var wordArray = fs.readFileSync('all-pokemon.txt').toString().split("\n");
// var wordArray = fs.readFileSync('google-10000-english.txt').toString().split("\n");
var results = [];
var NUM_RESULTS_TO_TRACK = 30;
var bar = new ProgressBar('  calulating [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: wordArray.length * (wordArray.length / 2)
});

for(var i = 0; i < wordArray.length; i++) {
    var word1 = wordArray[i].toLowerCase().trim();

    for(var j = i+1; j < wordArray.length; j++) {
        var word2 = wordArray[j].toLowerCase().trim();
        
        var result = {
            names: word1 + " | " + word2,
            score: 0
        }

        result.score = compareStrings(word1, word2);

        if(results.length < NUM_RESULTS_TO_TRACK) {
            results.push(result);
            results.sort(function(a, b) {
                return b.score-a.score;
            }); 
        } 
        else if(result.score > results[results.length-1].score) {
            results[results.length - 1] = result;
            results.sort(function(a, b) {
                return b.score-a.score;
            });    
        }
    }
    bar.tick(wordArray.length - i - 1);
    bar.render();
}
console.log("");
for(var i = 0; i < results.length; i++) {
    console.log(results[i].names + " | " + results[i].score);
}