import fs from 'node:fs/promises';
import path from 'node:path';
import { calculateNumberOfStones, parseInitialStones } from './splittingStones';

const INPUT_FILE = path.join(__dirname, 'input.txt');
const BLINKS = 75;

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const stones = parseInitialStones(fileData);

	const newStones = calculateNumberOfStones(stones, BLINKS);
	console.log(`Stones after blinking ${BLINKS} times:`, newStones);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
