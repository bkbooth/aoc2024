import { describe, expect, it } from 'vitest';
import { calculateCalibrationResult, parseEquations } from './solveEquations';

const INPUT = `
	190: 10 19
	3267: 81 40 27
	83: 17 5
	156: 15 6
	7290: 6 8 6 15
	161011: 16 10 13
	192: 17 8 14
	21037: 9 7 18 13
	292: 11 6 16 20`;

describe('day07 : solveEquations', () => {
	it('finds the number of solvable equations', () => {
		const allEquations = parseEquations(INPUT);
		expect(calculateCalibrationResult(allEquations, false)).toEqual(3749);
	});

	it('finds the number of solvable equations with extra operator', () => {
		const allEquations = parseEquations(INPUT);
		expect(calculateCalibrationResult(allEquations, true)).toEqual(11387);
	});
});
