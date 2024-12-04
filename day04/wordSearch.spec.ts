import { describe, expect, it } from 'vitest';
import { buildWordSearch, solveWordSearch } from './wordSearch';

const TEST_WORD_SEARCH = `
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
		const wordSearch = buildWordSearch(TEST_WORD_SEARCH);
		expect(solveWordSearch(wordSearch, WORD_TO_FIND)).toEqual(18);
	});
});
