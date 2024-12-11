import { describe, expect, it } from 'vitest';
import { calculateMoves, parseInitialStones } from './splittingStones';

const INPUT = '125 17';

describe('day11 : splittingStones', () => {
	it.each([
		{ input: INPUT, moves: 1, expected: 3 },
		{ input: INPUT, moves: 6, expected: 22 },
		{ input: INPUT, moves: 25, expected: 55312 },
	])(
		`calculates $expected stones for $input after blinking $moves times`,
		({ input, moves, expected }) => {
			const stones = parseInitialStones(input);
			expect(calculateMoves(stones, moves)).toHaveLength(expected);
		}
	);
});
