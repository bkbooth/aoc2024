import { isEmpty, isNil } from 'lodash-es';

export type Coordinate = [x: number, y: number];
export interface ClawMachine {
	buttonA: Coordinate;
	buttonB: Coordinate;
	prize: Coordinate;
}

const BUTTON_A_PRICE = 3;
const BUTTON_B_PRICE = 1;
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

export function parseClawMachines(input: string): Array<ClawMachine> {
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
				Number.parseInt(prizeMatch.groups.x),
				Number.parseInt(prizeMatch.groups.y),
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

		// try B-first (less tokens per-press)
		let bPresses = Math.max(Math.ceil(px / bx), Math.ceil(py / by));
		let aPresses = 0;
		let location = [ax * aPresses + bx * bPresses, ay * aPresses + by * bPresses];

		while (!(location[0] === px && location[1] === py) && bPresses > 0) {
			if (location[0] > px || location[1] > py) {
				bPresses--;
			} else {
				aPresses++;
			}
			location = [ax * aPresses + bx * bPresses, ay * aPresses + by * bPresses];
		}
		if (location[0] === px && location[1] === py) {
			solutions.push(aPresses * BUTTON_A_PRICE + bPresses * BUTTON_B_PRICE);
		}
	}

	return solutions.reduce((sum, solution) => sum + solution, 0);
}
