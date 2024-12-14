import { isEmpty, isNil } from 'lodash-es';

export type Coordinate = [x: number, y: number];
export interface ClawMachine {
	buttonA: Coordinate;
	buttonB: Coordinate;
	prize: Coordinate;
}

const BUTTON_A_PRICE = 3;
const BUTTON_B_PRICE = 1;
const PRIZE_OFFSET = 10_000_000_000_000;
const BUTTON_A = /^Button\sA:\sX\+(?<x>\d+)\,\sY\+(?<y>\d+)$/;
const BUTTON_B = /^Button\sB:\sX\+(?<x>\d+)\,\sY\+(?<y>\d+)$/;
const PRIZE = /^Prize:\sX\=(?<x>\d+)\,\sY\=(?<y>\d+)$/;

export function generateClawMachine(): ClawMachine {
	return {
		buttonA: [0, 0],
		buttonB: [0, 0],
		prize: [0, 0],
	};
}

export function parseClawMachines(input: string, offsetPrizePositions = true): Array<ClawMachine> {
	let clawMachines: Array<ClawMachine> = [];

	const rows = input.split('\n');
	let clawMachine = generateClawMachine();
	for (let i = 0, n = rows.length; i < n; i++) {
		const row = rows[i].trim();
		if (isEmpty(row)) continue;

		const buttonAMatch = row.match(BUTTON_A);
		if (!isNil(buttonAMatch)) {
			clawMachine.buttonA = [
				Number.parseInt(buttonAMatch.groups.x),
				Number.parseInt(buttonAMatch.groups.y),
			];
		}

		const buttonBMatch = row.match(BUTTON_B);
		if (!isNil(buttonBMatch)) {
			clawMachine.buttonB = [
				Number.parseInt(buttonBMatch.groups.x),
				Number.parseInt(buttonBMatch.groups.y),
			];
		}

		const prizeMatch = row.match(PRIZE);
		if (!isNil(prizeMatch)) {
			clawMachine.prize = [
				Number.parseInt(prizeMatch.groups.x) + (offsetPrizePositions ? PRIZE_OFFSET : 0),
				Number.parseInt(prizeMatch.groups.y) + (offsetPrizePositions ? PRIZE_OFFSET : 0),
			];
			clawMachines.push(clawMachine);
			clawMachine = generateClawMachine();
		}
	}

	return clawMachines;
}

export function calculateFewestTokens(clawMachines: Array<ClawMachine>): number {
	let solutions: Array<number> = [];
	for (let i = 0, n = clawMachines.length; i < n; i++) {
		const {
			buttonA: [ax, ay],
			buttonB: [bx, by],
			prize: [px, py],
		} = clawMachines[i];

		/**
		 * https://www.reddit.com/r/adventofcode/comments/1hd7irq/2024_day_13_an_explanation_of_the_mathematics/
		 * A = (p_x*b_y - p_y*b_x) / (a_x*b_y - a_y*b_x)
		 * B = (a_x*p_y - a_y*p_x) / (a_x*b_y - a_y*b_x)
		 */
		const aPresses = (px * by - py * bx) / (ax * by - ay * bx);
		const bPresses = (ax * py - ay * px) / (ax * by - ay * bx);
		if (aPresses % 1 === 0 && bPresses % 1 === 0) {
			solutions.push(aPresses * BUTTON_A_PRICE + bPresses * BUTTON_B_PRICE);
		}
	}

	return solutions.reduce((sum, solution) => sum + solution, 0);
}
