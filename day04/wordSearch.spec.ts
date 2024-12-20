import { describe, expect, it } from 'vitest';
import { buildWordSearch, solveWordSearch, solveXmasPuzzle } from './wordSearch';

const INPUT = `
	MMMSXXMASM
	MSAMXMSMSA
	AMXSXMAAMM
	MSAMASMSMX
	XMASAMXAMM
	XXAMMXXAMA
	SMSMSASXSS
	SAXAMASAAA
	MAMMMXMMMM
	MXMXAXMASX`;
const WORD_TO_FIND = 'XMAS';

describe('day04 : wordSearch', () => {
	it('finds all appearances of a given word in a word search', () => {
		const wordSearch = buildWordSearch(INPUT);
		expect(solveWordSearch(wordSearch, WORD_TO_FIND)).toEqual(18);
	});

	it('finds all appearances of X-MAS within a word search', () => {
		const wordSearch = buildWordSearch(INPUT);
		expect(solveXmasPuzzle(wordSearch)).toEqual(9);
	});
});
