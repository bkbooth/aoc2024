import { describe, expect, it } from 'vitest';
import {
	buildFileSystem,
	calculateChecksum,
	compactFileSystem,
	parseDiskMap,
} from './compactFiles';

const INPUT = `2333133121414131402`;

describe('day09 : compactFiles', () => {
	it('calculates the checksum of the compacted file system (fragmented)', () => {
		const diskMap = parseDiskMap(INPUT);
		const fileSystem = buildFileSystem(diskMap);
		const compactedFileSystem = compactFileSystem(fileSystem, false);
		expect(calculateChecksum(compactedFileSystem)).toEqual(1928);
	});

	it.each([
		{ input: INPUT, expected: 2858 },
		{ input: `2333133121414131499`, expected: 6204 },
		{ input: `714892711`, expected: 813 },
		{ input: `12101`, expected: 4 },
		{ input: `1313165`, expected: 169 },
		{ input: `12345`, expected: 132 },
		{ input: `12143`, expected: 31 },
		{ input: `14113`, expected: 16 },
		{ input: `121`, expected: 1 },
	])(
		`calculates checksum $expected for compacted file system $input (non-fragmented)`,
		({ input, expected }) => {
			const diskMap = parseDiskMap(input);
			const fileSystem = buildFileSystem(diskMap);
			const compactedFileSystem = compactFileSystem(fileSystem, true);
			expect(calculateChecksum(compactedFileSystem)).toEqual(expected);
		}
	);
});
