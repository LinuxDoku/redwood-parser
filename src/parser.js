module.exports = {
	parse: function(expression) {
		var pushWord = function(words, word, inSub) {
			if(word !== '') {
				if(inSub) {
					if(words[words.length - 1] instanceof Array) {
						words[words.length - 1].push(word);
					} else {
						words.push([word]);
					}
				} else {
					words.push(word);
				}
			}
		}

		var words = [],
            word = '';

		var inQuotes = false,
			inSub = false;

		for(var i = 0; i < expression.length; i++) {
			var character = expression[i];

			if(!inQuotes) {
				if(character === ' ') {
					pushWord(words, word, inSub);
					word = '';
					continue;
				}

				if(character === 'o' && expression[i + 1] === 'r') {
					words = [words, 'or'];
					inSub = true;
					i++;
					continue;
				}

                if(character === 'a' && expression[i + 1] === 'n' && expression[i + 2] === 'd') {
                    words = [words, 'and'];
                    inSub = true;
                    i += 2;
                    continue;
                }
			}

			if(character === '"') {
				inQuotes = !inQuotes;
				continue;
			}

			word = word + character;
		}

		pushWord(words, word, inSub);

		return words;
	}
};