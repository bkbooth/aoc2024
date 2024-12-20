const DO_INSTRUCTION = /do\(\)/;
const DONT_INSTRUCTION = /don\'t\(\)/;
const MUL_INSTRUCTION = /mul\((\d{1,3}),(\d{1,3})\)/;

export function findInstructions(input: string, useConditionals = true): Array<string> {
	const allInstructions = new RegExp(
		useConditionals
			? DO_INSTRUCTION.source + '|' + DONT_INSTRUCTION.source + '|' + MUL_INSTRUCTION.source
			: MUL_INSTRUCTION,
		'gm'
	);
	return input.match(allInstructions);
}

let instructionsEnabled = true;
function processInstruction(instruction: string): number {
	if (DO_INSTRUCTION.test(instruction)) {
		instructionsEnabled = true;
		return 0;
	} else if (DONT_INSTRUCTION.test(instruction)) {
		instructionsEnabled = false;
		return 0;
	} else if (!instructionsEnabled) {
		return 0;
	} else {
		const result = MUL_INSTRUCTION.exec(instruction);
		const num1 = Number.parseInt(result[1]);
		const num2 = Number.parseInt(result[2]);
		return num1 * num2;
	}
}

export function processInstructions(instructions: Array<string>): number {
	return instructions.reduce((total, instruction) => total + processInstruction(instruction), 0);
}
