import { isEmpty } from 'lodash-es';
import fs from 'node:fs/promises';
import path from 'node:path';

const INPUT_FILE = path.join(__dirname, 'input.txt');

function testReport(report: Array<number>): boolean {
	const isIncreasing = report[0] < report[report.length - 1];

	for (let i = 0, n = report.length; i < n - 1; i++) {
		const level1 = report[i];
		const level2 = report[i + 1];
		const difference = level1 - level2;
		if (difference === 0 || Math.abs(difference) > 3) return false;

		const isIncrease = difference < 0;
		if (isIncreasing !== isIncrease) {
			return false;
		}
	}

	return true;
}

function testDampenedReport(report: Array<number>): boolean {
	const dampenedVariants: Array<Array<number>> = Array.from({ length: report.length }, (_, i) => [
		...report.slice(0, i),
		...report.slice(i + 1),
	]);
	return dampenedVariants.some(testReport);
}

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	let safeReports = 0;

	const lines = fileData.split('\n');
	for (let i = 0, n = lines.length; i < n; i++) {
		const line = lines[i];
		if (isEmpty(line)) continue;

		const report = line.split(/\s+/).map((level) => Number.parseInt(level));
		if (testReport(report) || testDampenedReport(report)) safeReports++;
	}

	console.log('Safe reports:', safeReports);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
