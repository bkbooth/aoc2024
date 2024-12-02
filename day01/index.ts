import { isEmpty } from 'lodash-es';
import fs from 'node:fs/promises';
import path from 'node:path';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	let listA: Array<number> = [];
	let listB: Array<number> = [];

	const lines = fileData.split('\n');
	for (let i = 0, n = lines.length; i < n; i++) {
		const line = lines[i];
		if (isEmpty(line)) continue;

		const [listAItem, listBItem] = line.split(/\s+/);
		listA.push(Number.parseInt(listAItem));
		listB.push(Number.parseInt(listBItem));
	}
	listA.sort((a, b) => a - b);
	listB.sort((a, b) => a - b);

	let totalDistance = 0;
	for (let i = 0, n = listA.length; i < n; i++) {
		const aItem = listA[i];
		const bItem = listB[i];
		const distance = Math.abs(aItem - bItem);
		totalDistance += distance;
	}

	console.log('Total distance:', totalDistance);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
