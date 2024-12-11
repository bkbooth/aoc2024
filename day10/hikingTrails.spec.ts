import { describe, expect, it } from 'vitest';
import {
	buildTopographicMap,
	findAllHikingTrails,
	sumTrailheadRatings,
	sumTrailheadScores,
} from './hikingTrails';

const INPUT = `
	89010123
	78121874
	87430965
	96549874
	45678903
	32019012
	01329801
	10456732`;

describe('day10 : hikingTrails', () => {
	it('calculates the sum of the scores of all trailheads in a map', () => {
		const topographicMap = buildTopographicMap(INPUT);
		const hikingTrails = findAllHikingTrails(topographicMap);
		expect(sumTrailheadScores(hikingTrails)).toEqual(36);
	});

	it('calculates the sum of the ratings of all trailheads in a map', () => {
		const topographicMap = buildTopographicMap(INPUT);
		const hikingTrails = findAllHikingTrails(topographicMap);
		expect(sumTrailheadRatings(hikingTrails)).toEqual(81);
	});
});
