import fs from 'node:fs/promises';
import path from 'node:path';
import { calculateCalibrationResult, parseEquations } from './solveEquations';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const allEquations = parseEquations(fileData);
	const calibrationResult = calculateCalibrationResult(allEquations);

	console.log('Calibration result:', calibrationResult);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
