import fs from 'node:fs/promises';
import path from 'node:path';
import { compareLists, parseLists } from './compareLists';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const lists = parseLists(fileData);
	const { distance, similarity } = compareLists(lists);

	console.log('Total distance:', distance);
	console.log('Similarity score:', similarity);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
