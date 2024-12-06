import fs from 'node:fs/promises';
import path from 'node:path';
import {
	arrangePages,
	calculateMiddlePageSums,
	isArranged,
	parseSortingRules,
	parseUpdates,
} from './arrangePages';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const sortingRules = parseSortingRules(fileData);
	const updates = parseUpdates(fileData);

	const arrangedUpdates = updates.filter((update) => isArranged(update, sortingRules));
	const arrangedMiddlePageSums = calculateMiddlePageSums(arrangedUpdates);

	const incorrectUpdates = updates.filter((update) => !isArranged(update, sortingRules));
	const reArrangedUpdates = arrangePages(incorrectUpdates, sortingRules);
	const reArrangedMiddlePageSums = calculateMiddlePageSums(reArrangedUpdates);

	console.log('Arranged middle page sums:', arrangedMiddlePageSums);
	console.log('Re-arranged middle page sums:', reArrangedMiddlePageSums);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
