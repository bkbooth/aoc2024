import fs from 'node:fs/promises';
import path from 'node:path';
import { findInstructions, processInstructions } from './processInstructions';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const instructions = findInstructions(fileData);
	const total = processInstructions(instructions);

	console.log('Multiplications total:', total);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
