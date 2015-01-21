module.exports = {
    parse: function(expression) {
        var pushWord = function(words, word, inSub) {
            if (word !== '') {
                if (inSub) {
                    if (words[words.length - 1] instanceof Array) {
                        words[words.length - 1].push(word);
                    } else {
                        words.push([word]);
                    }
                } else {
                    words.push(word);
                }
            }
        }

        var warpUntilLastConjunction = function(words) {
            var wrappedWords = [],
                i = words.length - 1;

            for(i; i >= 0; i--) {
                if(words[i] instanceof Array || words[i] === 'or' || words[i] === 'and') {
                    break;
                }

                wrappedWords.push(words[i]);
            }

            if(wrappedWords.length !== 0) {
                words = words.slice(i, i + words.length);
                words.push(wrappedWords);
            }

            return words;
        }

        var words = [],
            word = '';

        var inQuotes = false,
            inSub = false;

        for (var i = 0; i < expression.length; i++) {
            var character = expression[i];

            if (!inQuotes) {
                if (character === ' ') {
                    pushWord(words, word, inSub);
                    word = '';
                    continue;
                }

                if (character === 'o' && expression[i + 1] === 'r') {
                    words = warpUntilLastConjunction(words);
                    words.push('or');
                    inSub = true;
                    i++;
                    continue;
                }

                if (character === 'a' && expression[i + 1] === 'n' && expression[i + 2] === 'd') {
                    words = warpUntilLastConjunction(words);
                    words.push('and');
                    inSub = true;
                    i += 2;
                    continue;
                }
            }

            if (character === '"') {
                inQuotes = !inQuotes;
                continue;
            }

            word = word + character;
        }

        pushWord(words, word, inSub);

        return words;
    }
};