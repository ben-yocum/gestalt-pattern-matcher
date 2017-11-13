var log = require('loglevel');
log.setLevel('silent');

module.exports = function(s1, s2)
{
    var stack = [];
    stack.push(s1);
    stack.push(s2);
    
    var score = 0;
    
    while(stack.length != 0) {
        var string1 = stack.pop();
        var string2 = stack.pop();
        
        log.debug("Comparing substrings ", string1, " and ", string2);
        
        var longestSequenceLength = 0;
        var longestSequenceIndex1 = -1;
        var longestSequenceIndex2 = -1;
        for(var i = 0; i < string1.length; i++) {
            for(var j = 0; j < string2.length; j++) {
                var k = 0;
                while(i+k < string1.length && j+k < string2.length && string1.charAt(i+k) === string2.charAt(j+k)) {
                    k++;
                }
                if(k > longestSequenceLength) {
                    longestSequenceLength = k;
                    longestSequenceIndex1 = i;
                    longestSequenceIndex2 = j;
                    log.debug("New longest match found: " + string1.substring(i, i+k));
                }
            }
        }
    
        if(longestSequenceLength === 0) {
            log.debug("Strings have no similar characters.");
        }
        else {
            score += longestSequenceLength * 2;
            if(longestSequenceIndex1 !== 0 && longestSequenceIndex2 !== 0) {
                log.debug("Pushing " + string1.substring(0, longestSequenceIndex1));
                log.debug("Pushing " + string2.substring(0, longestSequenceIndex2));
                stack.push(string1.substring(0, longestSequenceIndex1));
                stack.push(string2.substring(0, longestSequenceIndex2));
            }
            if(longestSequenceIndex1 + longestSequenceLength !== string1.length && 
                longestSequenceIndex2 + longestSequenceLength !== string2.length) {
                log.debug("Pushing " + string1.substring(longestSequenceIndex1 + longestSequenceLength, string1.length));
                log.debug("Pushing " + string2.substring(longestSequenceIndex2 + longestSequenceLength, string2.length));
                stack.push(string1.substring(longestSequenceIndex1 + longestSequenceLength, string1.length));
                stack.push(string2.substring(longestSequenceIndex2 + longestSequenceLength, string2.length));
            }
        }
        log.debug("Current score: " + score);
    }
    log.info("Score for " + s1 + ", " + s2 + ": " + score / (s1.length + s2.length));
    return score / (s1.length + s2.length);
}
