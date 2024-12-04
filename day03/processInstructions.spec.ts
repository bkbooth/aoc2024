import { describe, expect, it } from 'vitest';
import { findInstructions, processInstructions } from './processInstructions';

const INPUT = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

describe('day03 : processInstructions', () => {
	it('calculates a total by processing input instructions', () => {
		const instructions = findInstructions(INPUT);
		expect(processInstructions(instructions)).toBe(48);
	});
});
