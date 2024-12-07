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

export function findGuardUniquePositions(map: AreaMap): Map<string, string> {
	let directionIndex = 0;
	let guardPath = new Map<string, string>();

	let [x, y] = findGuardStartPosition(map);
	while (x >= 0 && x < map.length && y >= 0 && y < map[0].length) {
		const position = `${x},${y}`;
		const existingDirections = guardPath.get(position);
		let updatedDirections = existingDirections;
		if (!updatedDirections) {
			updatedDirections = directionIndex.toString();
		} else if (!existingDirections.includes(directionIndex.toString())) {
			updatedDirections += directionIndex.toString();
		} else {
			// If the guard has already visited this position in the same direction then they are in a loop
			throw new Error('Invalid path, guard loops');
		}
		guardPath.set(position, updatedDirections);

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

	return guardPath;
}

export function findGuardObstructionPositions(map: AreaMap): Array<Coordinate> {
	const possibleObstructionPositions = findGuardUniquePositions(map);
	let [startX, startY] = findGuardStartPosition(map);
	possibleObstructionPositions.delete(`${startX},${startY}`);

	let obstructionPositions: Array<Coordinate> = [];
	for (const [key] of possibleObstructionPositions) {
		const keyCoordinates = key.split(',');
		const x = Number.parseInt(keyCoordinates[0]);
		const y = Number.parseInt(keyCoordinates[1]);
		// Temporarily add obstruction to map
		map[y][x] = '#';
		try {
			findGuardUniquePositions(map);
		} catch (error) {
			// Map update caused a guard loop
			obstructionPositions.push([x, y]);
		} finally {
			// Revert map change
			map[y][x] = '.';
		}
	}

	return obstructionPositions;
}
