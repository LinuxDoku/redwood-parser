var assert = require('assert'),
	parser = require('../src/parser');

describe('redwood-parser', function() {
	describe('parse', function() {
		it('should return the value', function() {
			assert.deepEqual(['foo'], parser.parse('foo'));
		});

		it('should return the value in quotes', function() {
			assert.deepEqual(['foo'], parser.parse('"foo"'));
		});

		it('should return two words for non quoted string', function() {
			assert.deepEqual(['foo', 'bar'], parser.parse('foo bar'));
		});

		it('should return one word for quoted string', function() {
			assert.deepEqual(['foo bar'], parser.parse('"foo bar"'))
		});

		it('should return two word arrays connected with or', function() {
			assert.deepEqual([
				['foo'], 'or', ['bar']
			], parser.parse('"foo" or "bar"'));
		});

		it('should return two word arrays with more than one word', function() {
			assert.deepEqual([
				['foo'], 'or', ['bar', 'jim']
			], parser.parse('"foo" or bar jim'))
		});

		it('should return two word arrays with complete strings', function() {
			assert.deepEqual([
				['foo bar'], 'or', ['joe doe']
			], parser.parse('"foo bar" or "joe doe"'))
		})
	});
});