import fs from 'node:fs/promises';
import path from 'node:path';
import { calculateMoves, parseInitialStones } from './splittingStones';

const INPUT_FILE = path.join(__dirname, 'input.txt');
const BLINKS = 25;

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const stones = parseInitialStones(fileData);

	const newStones = calculateMoves(stones, BLINKS);
	console.log(`Stones after blinking ${BLINKS} times:`, newStones.length);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
