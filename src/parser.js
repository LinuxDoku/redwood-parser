module.exports = {
    parse: function(expression) {
        var reserved = function(str) {
            this.str = str;

            this.toString = function() {
                return this.str;
            }
        }

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
                if(words[i] instanceof Array || words[i] instanceof reserved) {
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

        var normalize = function(words) {
            for(var i = 0; i < words.length; i++) {
                if(words[i] instanceof Array) {
                    words[i] = normalize(words[i]);
                } else if(words[i] instanceof reserved) {
                    words[i] = words[i].toString();
                }
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
                    words.push(new reserved('or'));
                    inSub = true;
                    i++;
                    continue;
                }

                if (character === 'a' && expression[i + 1] === 'n' && expression[i + 2] === 'd') {
                    words = warpUntilLastConjunction(words);
                    words.push(new reserved('and'));
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

        return normalize(words);
    }
};