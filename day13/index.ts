import fs from 'node:fs/promises';
import path from 'node:path';
import { calculateFewestTokens, parseClawMachines } from './clawMachine';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });
	const clawMachines = parseClawMachines(fileData, true);

	const totalFewestTokens = calculateFewestTokens(clawMachines);
	console.log(`Fewest tokens for all prizes:`, totalFewestTokens);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
