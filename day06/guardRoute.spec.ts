import { describe, expect, it } from 'vitest';
import { buildMap, calculateGuardUniquePositions } from './guardRoute';

const INPUT = `
	....#.....
	.........#
	..........
	..#.......
	.......#..
	..........
	.#..^.....
	........#.
	#.........
	......#...`;

describe('day06 : guardRoute', () => {
	it('calculates the number of distinct positions a guard will visit', () => {
		const map = buildMap(INPUT);
		expect(calculateGuardUniquePositions(map)).toEqual(41);
	});
});
