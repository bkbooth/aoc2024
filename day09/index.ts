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

	// const compactedFileSystem1 = compactFileSystem([...fileSystem], false);
	// const checksum1 = calculateChecksum(compactedFileSystem1);
	// console.log('Compacted filesystem (fragmented) checksum:', checksum1);

	const compactedFileSystem2 = compactFileSystem(fileSystem, true);
	const checksum2 = calculateChecksum(compactedFileSystem2);
	console.log('Compacted filesystem (not-fragmented) checksum:', checksum2);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
