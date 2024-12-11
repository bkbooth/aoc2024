import { isEmpty, uniq } from 'lodash-es';

export type TopographicMap = Array<Array<number>>;
export type Coordinate = [x: number, y: number];
export type Trailheads = Map<string, Array<string>>;
export interface Trail {
	start: Coordinate;
	end: Coordinate;
}

const MIN_HEIGHT = 0;
const MAX_HEIGHT = 9;

export function buildTopographicMap(input: string): TopographicMap {
	const rows = input.split('\n');
	return rows.reduce((topographicMap, row) => {
		if (isEmpty(row.trim())) return topographicMap;
		topographicMap.push(
			row
				.trim()
				.split('')
				.map((height) => Number.parseInt(height))
		);
		return topographicMap;
	}, [] as TopographicMap);
}

export function findAllHikingTrails(topographicMap: TopographicMap): Trailheads {
	let trailheads: Array<Coordinate> = [];
	for (let y = 0, n = topographicMap.length; y < n; y++) {
		for (let x = 0, m = topographicMap[y].length; x < m; x++) {
			if (topographicMap[y][x] === MIN_HEIGHT) {
				trailheads.push([x, y]);
			}
		}
	}

	let trails: Array<Trail> = trailheads.map(([x, y]) => ({ start: [x, y], end: [x, y] }));
	for (let h = 1, m = MAX_HEIGHT; h <= m; h++) {
		let continuedTrails: Array<Trail> = [];
		for (let t = 0, n = trails.length; t < n; t++) {
			const trail = trails[t];
			const [x, y] = trail.end;
			// check up
			if (topographicMap[y - 1]?.[x] === h) continuedTrails.push({ ...trail, end: [x, y - 1] });
			// check right
			if (topographicMap[y]?.[x + 1] === h) continuedTrails.push({ ...trail, end: [x + 1, y] });
			// check down
			if (topographicMap[y + 1]?.[x] === h) continuedTrails.push({ ...trail, end: [x, y + 1] });
			// check left
			if (topographicMap[y]?.[x - 1] === h) continuedTrails.push({ ...trail, end: [x - 1, y] });
		}
		trails = continuedTrails;
	}

	const allTrails = new Map<string, Array<string>>();
	for (let i = 0, n = trails.length; i < n; i++) {
		const { start, end } = trails[i];
		const startId = `${start[0]},${start[1]}`;
		const endId = `${end[0]},${end[1]}`;
		const trailEnds = allTrails.get(startId);
		if (!trailEnds) {
			allTrails.set(startId, [endId]);
		} else {
			trailEnds.push(endId);
			allTrails.set(startId, trailEnds);
		}
	}

	return allTrails;
}

export function sumTrailheadScores(trailheads: Trailheads): number {
	let sum = 0;
	for (let trailheadPaths of trailheads.values()) {
		sum += uniq(trailheadPaths).length;
	}
	return sum;
}

export function sumTrailheadRatings(trailheads: Trailheads): number {
	let sum = 0;
	for (let trailheadPaths of trailheads.values()) {
		sum += trailheadPaths.length;
	}
	return sum;
}
