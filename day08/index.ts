import fs from 'node:fs/promises';
import path from 'node:path';
import { buildMap, findUniqueAntinodes } from './findAntinodes';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });
	const map = buildMap(fileData);

	const uniqueAntinodes = findUniqueAntinodes(map);
	console.log('Unique antinode positions:', uniqueAntinodes.length);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
