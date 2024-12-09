import { describe, expect, it } from 'vitest';
import {
	buildFileSystem,
	calculateChecksum,
	compactFileSystem,
	parseDiskMap,
} from './compactFiles';

const INPUT = `2333133121414131402`;

describe('day09 : compactFiles', () => {
	it('calculates the checksum of the compacted disk map', () => {
		const diskMap = parseDiskMap(INPUT);
		const fileSystem = buildFileSystem(diskMap);
		const compactedFileSystem = compactFileSystem(fileSystem);
		expect(calculateChecksum(compactedFileSystem)).toEqual(1928);
	});
});
