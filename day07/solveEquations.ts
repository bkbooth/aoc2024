import { isEmpty } from 'lodash-es';

export type Operator = '+' | '*';

export interface Equation {
	result: number;
	values: Array<number>;
}

export function parseEquations(input: string): Array<Equation> {
	const lines = input.split('\n');
	return lines.reduce((equations, line) => {
		if (isEmpty(line.trim())) return equations;
		const [result, ...values] = line.split(' ');
		equations.push({
			result: Number.parseInt(result),
			values: values.map((value) => Number.parseInt(value)),
		});
		return equations;
	}, [] as Array<Equation>);
}

const knownOperatorsPermutations = new Map<number, Array<Array<Operator>>>();

function getOperatorsPermutations(numberOfOperators: number): Array<Array<Operator>> {
	const knownPermutation = knownOperatorsPermutations.get(numberOfOperators);
	if (knownPermutation) return knownPermutation;

	const allOperators: Array<Operator> = ['+', '*'];
	let operatorsPermutations: Array<Array<Operator>> = Array.from(
		{ length: allOperators.length },
		(_, i) => [allOperators[i]]
	);
	for (let i = 1, n = numberOfOperators; i < n; i++) {
		const partialOperators = [...operatorsPermutations];
		allOperators.forEach((operator, index) => {
			const newOperators = partialOperators.map((operators) => [...operators, operator]);
			if (index === 0) {
				operatorsPermutations = newOperators;
			} else {
				operatorsPermutations.push(...newOperators);
			}
		});
	}

	knownOperatorsPermutations.set(numberOfOperators, operatorsPermutations);
	return operatorsPermutations;
}

function solveOperation(operator: Operator, value1: number, value2: number): number {
	switch (operator) {
		case '+':
			return value1 + value2;

		case '*':
			return value1 * value2;
	}
}

function solveEquation({ result, values }: Equation): boolean {
	const operatorsPermutations = getOperatorsPermutations(values.length - 1);
	for (let i = 0, n = operatorsPermutations.length; i < n; i++) {
		const operators = operatorsPermutations[i];
		let permutationResult = values[0];
		for (let j = 0, m = operators.length; j < m; j++) {
			permutationResult = solveOperation(operators[j], permutationResult, values[j + 1]);
		}
		if (permutationResult === result) {
			return true;
		}
	}
	return false;
}

export function calculateCalibrationResult(equations: Array<Equation>): number {
	let calibrationResult = 0;

	for (let i = 0, n = equations.length; i < n; i++) {
		const equation = equations[i];
		if (solveEquation(equation)) {
			calibrationResult += equation.result;
		}
	}

	return calibrationResult;
}
