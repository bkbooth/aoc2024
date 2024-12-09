export function parseDiskMap(input: string): string {
	return input.replace(/\r?\n|\r/g, '').trim();
}

export type FileSystem = Array<number>;

export function buildFileSystem(diskMap: string): FileSystem {
	let fileSystem: FileSystem = [];

	let fileIndex = -1;
	for (let i = 0, n = diskMap.length; i < n; i++) {
		const blockLength = Number.parseInt(diskMap[i]);
		let blocks: Array<number>;
		if (i % 2 === 0) {
			// add n file blocks
			fileIndex++;
			blocks = Array.from({ length: blockLength }, () => fileIndex);
		} else {
			// add n free space blocks
			blocks = Array.from({ length: blockLength }, () => NaN);
		}
		fileSystem.push(...blocks);
	}

	return fileSystem;
}

export function compactFileSystem(fileSystem: FileSystem): FileSystem {
	let i = fileSystem.length;
	while (i > 0) {
		const firstFreeSpace = fileSystem.findIndex(Number.isNaN);
		if (firstFreeSpace >= i) return fileSystem;

		const block = fileSystem[--i];
		if (isNaN(block)) continue;

		fileSystem[firstFreeSpace] = block;
		fileSystem[i] = NaN;
	}

	return fileSystem;
}

export function calculateChecksum(fileSystem: FileSystem): number {
	return fileSystem.reduce(
		(checksum, block, index) => (!Number.isNaN(block) ? checksum + block * index : checksum),
		0
	);
}
