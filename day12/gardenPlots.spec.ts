import { describe, expect, it } from 'vitest';
import { buildGardenMap, calculateTotalPrice, findGardenRegions } from './gardenPlots';

const INPUT1 = `
	AAAA
	BBCD
	BBCC
	EEEC`;
const INPUT2 = `
	OOOOO
	OXOXO
	OOOOO
	OXOXO
	OOOOO`;
const INPUT3 = `
	RRRRIICCFF
	RRRRIICCCF
	VVRRRCCFFF
	VVRCCCJFFF
	VVVVCJJCFE
	VVIVCCJJEE
	VVIIICJJEE
	MIIIIIJJEE
	MIIISIJEEE
	MMMISSJEEE`;

describe('day12 : gardenPlots', () => {
	it.each([
		{ input: INPUT1, size: '4x4', expected: 140 },
		{ input: INPUT2, size: '5x5', expected: 772 },
		{ input: INPUT3, size: '10x10', expected: 1930 },
	])('calculates $expected total price for $size garden', ({ input, expected }) => {
		const garden = buildGardenMap(input);
		const regions = findGardenRegions(garden);
		expect(calculateTotalPrice(regions)).toEqual(expected);
	});
});
