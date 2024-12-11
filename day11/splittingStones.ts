export type StonesList = Array<number>;
export type StonesDict = Map<number, number>;

export function parseInitialStones(input: string): StonesList {
	return input
		.replace(/\r?\n|\r/g, '')
		.trim()
		.split(' ')
		.map((stone) => Number.parseInt(stone));
}

export function calculateMoves(stones: StonesList, moves: number): StonesList {
	let updatedStones: StonesList = [...stones];
	for (let i = 0, n = moves; i < n; i++) {
		for (let j = 0, m = updatedStones.length; j < m; j++) {
			const stone = updatedStones[j];
			const stoneString = String(stone);

			// Rule 1
			if (stone === 0) {
				updatedStones[j] = 1;
			}

			// Rule 2
			else if (stoneString.length % 2 === 0) {
				const middle = stoneString.length / 2;
				const left = stoneString.slice(0, middle);
				const right = stoneString.slice(middle);
				updatedStones[j] = Number.parseInt(left);
				updatedStones.push(Number.parseInt(right));
			}

			// Rule 3
			else {
				updatedStones[j] = updatedStones[j] * 2024;
			}
		}
	}
	return updatedStones;
}

export function calculateNumberOfStones(stones: StonesList, moves: number): number {
	let stonesCounts = stones.reduce((stonesCounts, stone) => {
		const count = stonesCounts.get(stone);
		stonesCounts.set(stone, count ? count + 1 : 1);
		return stonesCounts;
	}, new Map<number, number>());

	// Cache known stones results values, mostly valuable for rule 2's
	let knownResults = new Map<number, Array<number>>();

	for (let i = 0, n = moves; i < n; i++) {
		let nextStonesCounts = new Map<number, number>();
		for (let [stone, count] of stonesCounts) {
			let results = knownResults.get(stone) ?? [];
			if (!results.length) {
				const stoneString = String(stone);

				// Rule 1
				if (stone === 0) {
					results.push(1);
				}

				// Rule 2
				else if (stoneString.length % 2 === 0) {
					const middle = stoneString.length / 2;
					const left = stoneString.slice(0, middle);
					const right = stoneString.slice(middle);
					results.push(Number.parseInt(left), Number.parseInt(right));
				}

				// Rule 3
				else {
					results.push(stone * 2024);
				}

				knownResults.set(stone, results);
			}

			results.forEach((result) => {
				const existingCount = nextStonesCounts.get(result);
				nextStonesCounts.set(result, existingCount ? existingCount + count : count);
			});
		}

		stonesCounts = nextStonesCounts;
	}

	return [...stonesCounts.values()].reduce((sum, values) => sum + values, 0);
}
