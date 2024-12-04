import fs from 'node:fs/promises';
import path from 'node:path';
import { buildWordSearch, solveWordSearch, solveXmasPuzzle } from './wordSearch';

const INPUT_FILE = path.join(__dirname, 'input.txt');

const WORD_TO_FIND = 'XMAS';

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const wordSearch = buildWordSearch(fileData);
	const part1Appearances = solveWordSearch(wordSearch, WORD_TO_FIND);
	const part2Appearances = solveXmasPuzzle(wordSearch);

	console.log(WORD_TO_FIND + ' appearances:', part1Appearances);
	console.log('X-MAS appearances:', part2Appearances);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
