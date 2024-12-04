import fs from 'node:fs/promises';
import path from 'node:path';
import { buildWordSearch, solveWordSearch } from './wordSearch';

const INPUT_FILE = path.join(__dirname, 'input.txt');

const WORD_TO_FIND = 'XMAS';

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const wordSearch = buildWordSearch(fileData);
	const appearances = solveWordSearch(wordSearch, WORD_TO_FIND);

	console.log(WORD_TO_FIND + ' appearances:', appearances);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
