import { isEmpty } from 'lodash-es';

export type AreaMap = Array<Array<string>>;
export type Coordinate = [x: number, y: number];

const DIRECTIONS: Array<Coordinate> = [
	[0, -1], // up
	[1, 0], // right
	[0, 1], // down
	[-1, 0], // left
];

export function buildMap(input: string): AreaMap {
	const rows = input.split('\n');
	return rows.reduce((wordSearch, row) => {
		if (isEmpty(row.trim())) return wordSearch;
		wordSearch.push(row.trim().split(''));
		return wordSearch;
	}, [] as AreaMap);
}

function findGuardStartPosition(map: AreaMap): Coordinate {
	for (let y = 0, n = map.length; y < n; y++) {
		for (let x = 0, m = map[y].length; x < m; x++) {
			if (map[y][x] === '^') return [x, y];
		}
	}
}

export function calculateGuardUniquePositions(map: AreaMap): number {
	let directionIndex = 0;
	let guardPath = new Map<string, Coordinate>();

	let [x, y] = findGuardStartPosition(map);
	while (x >= 0 && x < map.length && y >= 0 && y < map[0].length) {
		guardPath.set(`${x},${y}`, [x, y]);

		const direction = DIRECTIONS[directionIndex];
		const newX = x + direction[0];
		const newY = y + direction[1];
		if (map[newY]?.[newX] === '#') {
			directionIndex += 1;
			if (directionIndex === DIRECTIONS.length) {
				directionIndex = 0;
			}
		} else {
			x = newX;
			y = newY;
		}
	}

	return guardPath.size;
}
