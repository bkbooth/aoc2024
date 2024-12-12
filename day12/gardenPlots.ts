import { isEmpty } from 'lodash-es';

export type GardenMap = Array<Array<string>>;
export type Coordinate = [x: number, y: number];
export interface GardenRegion {
	type: string;
	area: number;
	perimeter: number;
}
export type GardenRegions = Array<GardenRegion>; // TBD

export function buildGardenMap(input: string): GardenMap {
	const rows = input.split('\n');
	return rows.reduce((areaMap, row) => {
		if (isEmpty(row.trim())) return areaMap;
		areaMap.push(row.trim().split(''));
		return areaMap;
	}, [] as GardenMap);
}

function walkRegion(map: GardenMap, initialPlot: Coordinate, mapped: Array<string>): GardenRegion {
	const plotType = map[initialPlot[1]][initialPlot[0]];
	let area = 0;
	let perimeter = 0;
	let pendingPlots: Array<Coordinate> = [initialPlot];
	while (pendingPlots.length) {
		const [x, y] = pendingPlots.shift();
		mapped.push(`${x},${y}`);
		area++;

		const adjacentPlots: Array<Coordinate> = [
			[x, y - 1], // above
			[x + 1, y], // right
			[x, y + 1], // below
			[x - 1, y], // left
		];
		for (let i = 0, n = adjacentPlots.length; i < n; i++) {
			const [ax, ay] = adjacentPlots[i];
			if (map[ay]?.[ax] === plotType) {
				if (
					!mapped.includes(`${ax},${ay}`) &&
					!pendingPlots.some(([px, py]) => px === ax && py === ay)
				) {
					pendingPlots.push([ax, ay]);
				}
			} else {
				perimeter++;
			}
		}
	}

	return { type: plotType, area, perimeter };
}

export function findGardenRegions(map: GardenMap): GardenRegions {
	let regions: GardenRegions = [];
	let mapped: Array<string> = [];
	for (let y = 0, n = map.length; y < n; y++) {
		for (let x = 0, m = map[y].length; x < m; x++) {
			if (mapped.includes(`${x},${y}`)) continue;

			regions.push(walkRegion(map, [x, y], mapped));
		}
	}

	return regions;
}

export function calculateTotalPrice(regions: GardenRegions): number {
	return regions.reduce((sum, region) => sum + region.area * region.perimeter, 0);
}
