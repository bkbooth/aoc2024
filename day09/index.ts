import fs from 'node:fs/promises';
import path from 'node:path';
import {
	buildFileSystem,
	calculateChecksum,
	compactFileSystem,
	parseDiskMap,
} from './compactFiles';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const diskMap = parseDiskMap(fileData);
	const fileSystem = buildFileSystem(diskMap);
	const compactedFileSystem = compactFileSystem(fileSystem);
	const checksum = calculateChecksum(compactedFileSystem);

	console.log('Compacted filesystem checksum:', checksum);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
