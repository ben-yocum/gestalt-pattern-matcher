# gestalt-pattern-matcher

This is an implementation of the Ratcliff/Obershelp pattern-matching algorithm in nodejs. Its purpose is to compare two strings and determine approxmiately how different they are. A score of 0 indicates that they share no characters at all; a score of 1 indicates that the two strings are identical.

This implementation is quick-and-dirty. It is suitable for short strings (on the order of 1000 characters long). I haven't thoroughly analyzed complexity, but it is roughly O(n^2) average case, O(n^3) in the worst case, and O(n) in the best case.

I have included a sample main.js to run everything, as well as some small dictionary files that can be used if desired. The sample main.js will compare thousands of words against each other and determine which ones are most similar.

# Usage

    var compareStrings = require('./gestalt-pattern-matcher');
    console.log(compareStrings('hello', 'goodbye'));

