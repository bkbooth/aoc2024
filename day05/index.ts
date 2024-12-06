import fs from 'node:fs/promises';
import path from 'node:path';
import {
	arrangePages,
	calculateMiddlePageSums,
	isArranged,
	parseSortingRules,
	parseUpdates,
	type Update,
} from './arrangePages';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const sortingRules = parseSortingRules(fileData);
	const updates = parseUpdates(fileData);

	interface FilteredUpdates {
		valid: Array<Update>;
		invalid: Array<Update>;
	}
	const { valid: validUpdates, invalid: invalidUpdates } = updates.reduce(
		(filtered, update) => {
			if (isArranged(update, sortingRules)) {
				filtered.valid.push(update);
			} else {
				filtered.invalid.push(update);
			}
			return filtered;
		},
		{ valid: [], invalid: [] } as FilteredUpdates
	);

	const arrangedMiddlePageSums = calculateMiddlePageSums(validUpdates);

	const reArrangedUpdates = arrangePages(invalidUpdates, sortingRules);
	const reArrangedMiddlePageSums = calculateMiddlePageSums(reArrangedUpdates);

	console.log('Arranged middle page sums:', arrangedMiddlePageSums);
	console.log('Re-arranged middle page sums:', reArrangedMiddlePageSums);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
