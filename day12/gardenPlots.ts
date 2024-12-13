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
	let regionEdges: Array<Coordinate> = [];
	let pendingPlots: Array<Coordinate> = [initialPlot];
	while (pendingPlots.length) {
		const [x, y] = pendingPlots.shift();

		for (let i = 0, n = DIRECTIONS.length; i < n; i++) {
			const [xOffset, yOffset] = DIRECTIONS[i];
			const xEdge = xOffset * 0.1;
			const yEdge = yOffset * 0.1;
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
				regionEdges.push([x + xEdge, y + yEdge]);
			}
		}

		mapped.push(`${x},${y}`);
		area++;
	}

	const perimeter = regionEdges.length;

	let sides = 0;
	while (regionEdges.length) {
		const [edgeX, edgeY] = regionEdges.shift();
		sides++;
		const isHorizontal = edgeY % 1 !== 0;
		if (isHorizontal) {
			let leftX = edgeX;
			let leftIndex = -1;
			do {
				leftX--;
				leftIndex = regionEdges.findIndex(([reX, reY]) => reX === leftX && reY === edgeY);
				if (leftIndex >= 0) {
					regionEdges.splice(leftIndex, 1);
				}
			} while (leftIndex >= 0);
			let rightX = edgeX;
			let rightIndex = -1;
			do {
				rightX++;
				rightIndex = regionEdges.findIndex(([reX, reY]) => reX === rightX && reY === edgeY);
				if (rightIndex >= 0) {
					regionEdges.splice(rightIndex, 1);
				}
			} while (rightIndex >= 0);
		} else {
			let topY = edgeY;
			let topIndex = -1;
			do {
				topY--;
				topIndex = regionEdges.findIndex(([reX, reY]) => reX === edgeX && reY === topY);
				if (topIndex >= 0) {
					regionEdges.splice(topIndex, 1);
				}
			} while (topIndex >= 0);
			let bottomY = edgeY;
			let bottomIndex = -1;
			do {
				bottomY++;
				bottomIndex = regionEdges.findIndex(([reX, reY]) => reX === edgeX && reY === bottomY);
				if (bottomIndex >= 0) {
					regionEdges.splice(bottomIndex, 1);
				}
			} while (bottomIndex >= 0);
		}
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
