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
	[xStart, yStart]: Coordinate,
	[xDirection, yDirection]: Coordinate
): boolean {
	for (let depth = 1, n = wordToFind.length; depth < n; depth++) {
		const x = xStart + xDirection * depth;
		const y = yStart + yDirection * depth;
		if (y < 0 || y >= wordSearch.length || x < 0 || x >= wordSearch[y].length) {
			// Out of bounds
			return false;
		}
		if (wordSearch[y][x] !== wordToFind[depth]) {
			// Word not found
			return false;
		}
	}
	return true;
}

export function solveWordSearch(wordSearch: WordSearch, wordToFind: string): number {
	let appearances = 0;

	for (let y = 0, n = wordSearch.length; y < n; y++) {
		for (let x = 0, m = wordSearch[y].length; x < m; x++) {
			if (wordSearch[y][x] === wordToFind[0]) {
				for (let d = 0, l = DIRECTIONS.length; d < l; d++) {
					const direction = DIRECTIONS[d];
					if (walkDirection(wordSearch, wordToFind, [x, y], direction)) {
						appearances++;
					}
				}
			}
		}
	}

	return appearances;
}

function checkXmas(wordSearch: WordSearch, [x, y]: Coordinate) {
	if (wordSearch[y][x] !== 'A') return false;

	const downDiagonal =
		(wordSearch[y - 1][x - 1] === 'M' && wordSearch[y + 1][x + 1] === 'S') ||
		(wordSearch[y - 1][x - 1] === 'S' && wordSearch[y + 1][x + 1] === 'M');

	const upDiagonal =
		(wordSearch[y + 1][x - 1] === 'M' && wordSearch[y - 1][x + 1] === 'S') ||
		(wordSearch[y + 1][x - 1] === 'S' && wordSearch[y - 1][x + 1] === 'M');

	return downDiagonal && upDiagonal;
}

export function solveXmasPuzzle(wordSearch: WordSearch): number {
	let appearances = 0;

	for (let y = 1, n = wordSearch.length - 1; y < n; y++) {
		for (let x = 1, m = wordSearch[y].length - 1; x < m; x++) {
			if (checkXmas(wordSearch, [x, y])) appearances++;
		}
	}

	return appearances;
}
