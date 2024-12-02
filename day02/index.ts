import { isEmpty, isNil } from 'lodash-es';
import fs from 'node:fs/promises';
import path from 'node:path';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	let safeReports = 0;

	const lines = fileData.split('\n');
	for (let i = 0, n = lines.length; i < n; i++) {
		const line = lines[i];
		if (isEmpty(line)) continue;

		const report = line.split(/\s+/).map((level) => Number.parseInt(level));
		let isIncreasing: boolean | null = null;
		for (let j = 0, m = report.length; j < m - 1; j++) {
			const level1 = report[j];
			const level2 = report[j + 1];
			const difference = level1 - level2;
			if (difference === 0 || Math.abs(difference) > 3) break;

			const isIncrease = difference < 0;
			if (isNil(isIncreasing)) {
				isIncreasing = isIncrease;
			} else if (isIncreasing !== isIncrease) {
				break;
			}

			if (j === m - 2) safeReports++;
		}
	}

	console.log('Safe reports:', safeReports);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
