import { describe, expect, it } from 'vitest';
import { compareLists, parseLists } from './compareLists';

const INPUT = `
	3   4
	4   3
	2   5
	1   3
	3   9
	3   3`;

describe('day01 : compareLists', () => {
	it('calculates total distance and similarity score between two lists', () => {
		const lists = parseLists(INPUT);
		expect(compareLists(lists)).toEqual({ distance: 11, similarity: 31 });
	});
});
