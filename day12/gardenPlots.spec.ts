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
	EEEEE
	EXXXX
	EEEEE
	EXXXX
	EEEEE`;
const INPUT4 = `
	AAAAAA
	AAABBA
	AAABBA
	ABBAAA
	ABBAAA
	AAAAAA`;
const INPUT5 = `
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
const INPUT6 = `
	LDDDDDDXXX
	LLLDDVDXXX
	LLLDDDXXXX`;
const INPUT7 = `
	AAAEAAAAAA
	FFAEAADAAA
	FFAAAADACA
	FFAABAAAAB
	FFABBBABBB
	FAAAABBBBB
	FAGGABBBBB
	FAGAABBBBB`;
const INPUT8 = `
	AAAAAAAA
	AACBBDDA
	AACBBAAA
	ABBAAAAA
	ABBADDDA
	AAAADADA
	AAAAAAAA`;

describe('day12 : gardenPlots', () => {
	it.each([
		{ input: INPUT1, size: '4x4', expected: 140 },
		{ input: INPUT2, size: '5x5', expected: 772 },
		{ input: INPUT3, size: '5x5', expected: 692 },
		{ input: INPUT4, size: '6x6', expected: 1184 },
		{ input: INPUT5, size: '10x10', expected: 1930 },
		{ input: INPUT6, size: '10x3', expected: 492 },
		{ input: INPUT7, size: '10x8', expected: 3402 },
		{ input: INPUT8, size: '8x7', expected: 2566 },
	])('calculates $expected total price for $size garden', ({ input, expected }) => {
		const garden = buildGardenMap(input);
		const regions = findGardenRegions(garden);
		expect(calculateTotalPrice(regions, false)).toEqual(expected);
	});

	it.each([
		{ input: INPUT1, size: '4x4', expected: 80 },
		{ input: INPUT2, size: '5x5', expected: 436 },
		{ input: INPUT3, size: '5x5', expected: 236 },
		{ input: INPUT4, size: '6x6', expected: 368 },
		{ input: INPUT5, size: '10x10', expected: 1206 },
		{ input: INPUT6, size: '10x3', expected: 250 },
		{ input: INPUT7, size: '10x8', expected: 1992 },
		{ input: INPUT8, size: '8x7', expected: 946 },
	])('calculates $expected discounted price for $size garden', ({ input, expected }) => {
		const garden = buildGardenMap(input);
		const regions = findGardenRegions(garden);
		expect(calculateTotalPrice(regions, true)).toEqual(expected);
	});
});
