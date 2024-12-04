import { isEmpty } from 'lodash-es';

export type List = Array<number>;
export type Lists = [listA: List, listB: List];

export function parseLists(input: string): Lists {
	let listA: List = [];
	let listB: List = [];

	const lines = input.split('\n');
	for (let i = 0, n = lines.length; i < n; i++) {
		const line = lines[i];
		if (isEmpty(line.trim())) continue;

		const [listAItem, listBItem] = line.trim().split(/\s+/);
		listA.push(Number.parseInt(listAItem));
		listB.push(Number.parseInt(listBItem));
	}
	listA.sort((a, b) => a - b);
	listB.sort((a, b) => a - b);

	return [listA, listB];
}

export interface ComparisonResult {
	distance: number;
	similarity: number;
}

export function compareLists([listA, listB]: Lists): ComparisonResult {
	let totalDistance = 0;
	let similarityScore = 0;

	for (let i = 0, n = listA.length; i < n; i++) {
		const aItem = listA[i];
		const bItem = listB[i];

		const distance = Math.abs(aItem - bItem);
		totalDistance += distance;

		let bOccurrences = 0;
		for (let j = 0, m = n; j < m; j++) {
			const bItem = listB[j];
			if (bItem > aItem) continue;
			if (bItem === aItem) {
				bOccurrences++;
			}
		}
		similarityScore += aItem * bOccurrences;
	}

	return {
		distance: totalDistance,
		similarity: similarityScore,
	};
}
