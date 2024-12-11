export type StonesList = Array<number>;

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
		for (let j = 0; j < updatedStones.length; j++) {
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
				updatedStones.splice(j, 1, Number.parseInt(left), Number.parseInt(right));
				j++;
			}

			// Rule 3
			else {
				updatedStones[j] = updatedStones[j] * 2024;
			}
		}
	}
	return updatedStones;
}
