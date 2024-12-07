import fs from 'node:fs/promises';
import path from 'node:path';
import { buildMap, findGuardObstructionPositions, findGuardUniquePositions } from './guardRoute';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });
	const map = buildMap(fileData);

	const uniquePositions = findGuardUniquePositions(map);
	console.log('Unique guard positions:', uniquePositions.size);

	const obstructionPositions = findGuardObstructionPositions(map);
	console.log('Guard path obstruction positions:', obstructionPositions.length);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
