import fs from 'node:fs/promises';
import path from 'node:path';
import { buildGardenMap, calculateTotalPrice, findGardenRegions } from './gardenPlots';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });
	const garden = buildGardenMap(fileData);

	const regions = findGardenRegions(garden);
	const totalPrice = calculateTotalPrice(regions);

	console.log(`Total fencing price:`, totalPrice);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
