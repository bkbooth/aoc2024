import { describe, expect, it } from 'vitest';
import { buildMap, findUniqueAntinodes, findUniqueResonantAntinodes } from './findAntinodes';

const INPUT = `
	............
	........0...
	.....0......
	.......0....
	....0.......
	......A.....
	............
	............
	........A...
	.........A..
	............
	............`;

describe('day08 : findAntinodes', () => {
	it('finds all antinodes for a signal map', () => {
		const signalMap = buildMap(INPUT);
		expect(findUniqueAntinodes(signalMap)).toHaveLength(14);
	});

	it('finds all antinodes using resonant harmonics', () => {
		const signalMap = buildMap(INPUT);
		expect(findUniqueResonantAntinodes(signalMap)).toHaveLength(34);
	});
});
