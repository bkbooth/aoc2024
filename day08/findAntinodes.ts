import { isEmpty } from 'lodash-es';

export type AreaMap = Array<Array<string>>;
export type Coordinate = [x: number, y: number];

export function buildMap(input: string): AreaMap {
	const rows = input.split('\n');
	return rows.reduce((wordSearch, row) => {
		if (isEmpty(row.trim())) return wordSearch;
		wordSearch.push(row.trim().split(''));
		return wordSearch;
	}, [] as AreaMap);
}

export function findUniqueAntinodes(map: AreaMap): Map<string, string> {
	let antinodePositions = new Map<string, string>();

	return antinodePositions;
}
