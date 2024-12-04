import { isEmpty } from 'lodash-es';

export type WordSearch = Array<Array<string>>;
export type Coordinate = [x: number, y: number];

const DIRECTIONS: Array<Coordinate> = [
	[-1, -1], // up-left
	[0, -1], // up
	[1, -1], // up-right
	[1, 0], // right
	[1, 1], // down-right
	[0, 1], // down
	[-1, 1], // down-left
	[-1, 0], // left
];

export function buildWordSearch(input: string): WordSearch {
	const rows = input.split('\n');
	return rows.reduce((wordSearch, row) => {
		if (isEmpty(row.trim())) return wordSearch;
		wordSearch.push(row.trim().split(''));
		return wordSearch;
	}, [] as WordSearch);
}

function walkDirection(
	wordSearch: WordSearch,
	wordToFind: string,
	location: Coordinate,
	direction: Coordinate
): boolean {
	for (let depth = 1, n = wordToFind.length; depth < n; depth++) {
		const coordinate: Coordinate = [
			location[0] + direction[0] * depth,
			location[1] + direction[1] * depth,
		];
		if (
			coordinate[1] < 0 ||
			coordinate[1] >= wordSearch.length ||
			coordinate[0] < 0 ||
			coordinate[0] >= wordSearch[0].length
		) {
			// Gone out of bounds
			return false;
		}
		if (wordSearch[coordinate[1]][coordinate[0]] !== wordToFind[depth]) {
			// Word not found
			return false;
		}
	}
	return true;
}

export function solveWordSearch(wordSearch: WordSearch, wordToFind: string): number {
	let startingLocations: Array<Coordinate> = [];
	for (let y = 0, n = wordSearch.length; y < n; y++) {
		for (let x = 0, m = wordSearch[y].length; x < m; x++) {
			if (wordSearch[y][x] === wordToFind[0]) {
				startingLocations.push([x, y]);
			}
		}
	}

	let appearances = 0;

	for (let i = 0, n = startingLocations.length; i < n; i++) {
		const location = startingLocations[i];
		for (let d = 0, m = DIRECTIONS.length; d < m; d++) {
			const direction = DIRECTIONS[d];
			if (walkDirection(wordSearch, wordToFind, location, direction)) {
				appearances++;
			}
		}
	}

	return appearances;
}

function checkXmas(wordSearch: WordSearch, location: Coordinate) {
	const downDiagonal =
		(wordSearch[location[1] - 1][location[0] - 1] === 'M' &&
			wordSearch[location[1] + 1][location[0] + 1] === 'S') ||
		(wordSearch[location[1] - 1][location[0] - 1] === 'S' &&
			wordSearch[location[1] + 1][location[0] + 1] === 'M');

	const upDiagonal =
		(wordSearch[location[1] + 1][location[0] - 1] === 'M' &&
			wordSearch[location[1] - 1][location[0] + 1] === 'S') ||
		(wordSearch[location[1] + 1][location[0] - 1] === 'S' &&
			wordSearch[location[1] - 1][location[0] + 1] === 'M');

	return downDiagonal && upDiagonal;
}

export function solveXmasPuzzle(wordSearch: WordSearch): number {
	let startingLocations: Array<Coordinate> = [];
	for (let y = 1, n = wordSearch.length - 1; y < n; y++) {
		for (let x = 1, m = wordSearch[y].length - 1; x < m; x++) {
			if (wordSearch[y][x] === 'A') {
				startingLocations.push([x, y]);
			}
		}
	}

	let appearances = 0;

	for (let i = 0, n = startingLocations.length; i < n; i++) {
		const location = startingLocations[i];
		if (checkXmas(wordSearch, location)) appearances++;
	}

	return appearances;
}
