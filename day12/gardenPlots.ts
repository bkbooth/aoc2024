import { isEmpty } from 'lodash-es';

export type GardenMap = Array<Array<string>>;
export type Coordinate = [x: number, y: number];
export interface GardenRegion {
	type: string;
	area: number;
	perimeter: number;
	sides: number;
}
export type GardenRegions = Array<GardenRegion>; // TBD

const DIRECTIONS: Array<Coordinate> = [
	[0, -1], // up
	[1, 0], // right
	[0, 1], // down
	[-1, 0], // left
];

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
	let sides = 0;
	let regionEdges: Array<Coordinate> = [];
	let pendingPlots: Array<Coordinate> = [initialPlot];
	while (pendingPlots.length) {
		const [x, y] = pendingPlots.shift();

		for (let i = 0, n = DIRECTIONS.length; i < n; i++) {
			const [xOffset, yOffset] = DIRECTIONS[i];
			const xEdge = xOffset * 0.5;
			const yEdge = yOffset * 0.5;
			const adjacentX = x + xOffset;
			const adjacentY = y + yOffset;
			if (map[adjacentY]?.[adjacentX] === plotType) {
				if (
					!mapped.includes(`${adjacentX},${adjacentY}`) &&
					!pendingPlots.some(
						([pendingX, pendingY]) => pendingX === adjacentX && pendingY === adjacentY
					)
				) {
					pendingPlots.push([adjacentX, adjacentY]);
				}
			} else {
				if (
					// top side exists
					(yOffset === -1 &&
						!regionEdges.some(
							([reX, reY]) => reY === y + yEdge && (reX === x - 1 || reX === x + 1)
						)) ||
					// bottom side exists
					(yOffset === 1 &&
						!regionEdges.some(
							([reX, reY]) => reY === y + yEdge && (reX === x - 1 || reX === x + 1)
						)) ||
					// left side exists
					(xOffset === -1 &&
						!regionEdges.some(
							([reX, reY]) => reX === x + xEdge && (reY === y - 1 || reY === y + 1)
						)) ||
					// right side exists
					(xOffset === 1 &&
						!regionEdges.some(
							([reX, reY]) => reX === x + xEdge && (reY === y - 1 || reY === y + 1)
						))
				) {
					sides++;
				}

				regionEdges.push([x + xEdge, y + yEdge]);
				perimeter++;
			}
		}

		mapped.push(`${x},${y}`);
		area++;
	}

	return { type: plotType, area, perimeter, sides };
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

export function calculateTotalPrice(regions: GardenRegions, useDiscount = true): number {
	return regions.reduce(
		(sum, region) => sum + region.area * (useDiscount ? region.sides : region.perimeter),
		0
	);
}
