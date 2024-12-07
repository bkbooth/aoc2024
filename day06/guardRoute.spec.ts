import { describe, expect, it } from 'vitest';
import { buildMap, findGuardObstructionPositions, findGuardUniquePositions } from './guardRoute';

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
		expect(findGuardUniquePositions(map)).toHaveProperty('size', 41);
	});

	it('calculates the number of obstructible positions that cause a guard loop', () => {
		const map = buildMap(INPUT);
		expect(findGuardObstructionPositions(map)).toHaveLength(6);
	});
});
