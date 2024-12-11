import { isEmpty, isNil } from 'lodash-es';

export type AreaMap = Array<Array<string>>;
export type Coordinate = [x: number, y: number];
export type Antennas = Map<string, Array<Coordinate>>;

export function buildMap(input: string): AreaMap {
	const rows = input.split('\n');
	return rows.reduce((areaMap, row) => {
		if (isEmpty(row.trim())) return areaMap;
		areaMap.push(row.trim().split(''));
		return areaMap;
	}, [] as AreaMap);
}

function findAllAntennas(map: AreaMap): Antennas {
	const antennas: Antennas = new Map();
	for (let y = 0, n = map.length; y < n; y++) {
		for (let x = 0, m = map[y].length; x < m; x++) {
			const coordinate = map[y][x];
			if (coordinate === '.') continue;

			const frequency = map[y][x];
			let frequencyCoordinates = antennas.get(frequency);
			if (isNil(frequencyCoordinates)) {
				frequencyCoordinates = [[x, y]];
			} else {
				frequencyCoordinates.push([x, y]);
			}
			antennas.set(frequency, frequencyCoordinates);
		}
	}

	return antennas;
}

function findAntinodes([ax, ay]: Coordinate, [bx, by]: Coordinate): Array<Coordinate> {
	const dx = bx - ax;
	const dy = by - ay;
	return [
		[ax - dx, ay - dy],
		[bx + dx, by + dy],
	];
}

export function findUniqueAntinodes(map: AreaMap): Array<Coordinate> {
	const antennas = findAllAntennas(map);

	let antinodePositions = new Map<string, Coordinate>();
	for (const positions of antennas.values()) {
		for (let i = 0, n = positions.length; i < n - 1; i++) {
			const antennaA = positions[i];
			for (let j = i + 1, m = positions.length; j < m; j++) {
				const antennaB = positions[j];
				findAntinodes(antennaA, antennaB).forEach(([x, y]) => {
					if (y >= 0 && y < map.length && x >= 0 && x < map[0].length) {
						antinodePositions.set(`${x},${y}`, [x, y]);
					}
				});
			}
		}
	}
	return [...antinodePositions.values()];
}

function findResonantAntinodes(
	map: AreaMap,
	[ax, ay]: Coordinate,
	[bx, by]: Coordinate
): Array<Coordinate> {
	// set initial antinodes
	let antinodes: Array<Coordinate> = [
		[ax, ay],
		[bx, by],
	];

	// calculate diff
	const dx = bx - ax;
	const dy = by - ay;

	// walk negative values from a
	let nx = ax - dx;
	let ny = ay - dy;
	while (ny >= 0 && ny < map.length && nx >= 0 && nx < map[0].length) {
		antinodes.push([nx, ny]);
		nx = nx - dx;
		ny = ny - dy;
	}

	// walk positive values from b
	nx = bx + dx;
	ny = by + dy;
	while (ny >= 0 && ny < map.length && nx >= 0 && nx < map[0].length) {
		antinodes.push([nx, ny]);
		nx = nx + dx;
		ny = ny + dy;
	}

	return antinodes;
}

export function findUniqueResonantAntinodes(map: AreaMap): Array<Coordinate> {
	const antennas = findAllAntennas(map);

	let antinodePositions = new Map<string, Coordinate>();
	for (const positions of antennas.values()) {
		for (let i = 0, n = positions.length; i < n - 1; i++) {
			const antennaA = positions[i];
			for (let j = i + 1, m = positions.length; j < m; j++) {
				const antennaB = positions[j];
				findResonantAntinodes(map, antennaA, antennaB).forEach(([x, y]) => {
					if (y >= 0 && y < map.length && x >= 0 && x < map[0].length) {
						antinodePositions.set(`${x},${y}`, [x, y]);
					}
				});
			}
		}
	}
	return [...antinodePositions.values()];
}
