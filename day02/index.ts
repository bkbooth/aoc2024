import fs from 'node:fs/promises';
import path from 'node:path';
import { findReports, testReports } from './testReports';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const reports = findReports(fileData);
	const safeReports = testReports(reports, true);

	console.log('Safe reports:', safeReports);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
