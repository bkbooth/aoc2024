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

function compactFileSystemWithFragmentation(fileSystem: FileSystem): FileSystem {
	let i = fileSystem.length;
	while (i > 0) {
		const firstFreeSpace = fileSystem.findIndex(Number.isNaN);
		if (firstFreeSpace >= i) return fileSystem;

		const block = fileSystem[--i];
		if (Number.isNaN(block)) continue;

		fileSystem[firstFreeSpace] = block;
		fileSystem[i] = NaN;
	}

	return fileSystem;
}

function moveFile(fileSystem: FileSystem, fileId, fileStart, fileLength): FileSystem {
	let freeSpaceStart = -1;
	let freeSpaceLength = -1;
	for (let i = 0, n = fileStart; i < n; i++) {
		const block = fileSystem[i];
		if (Number.isNaN(block)) {
			if (freeSpaceStart >= 0) {
				// More free space
				freeSpaceLength++;
			} else {
				// Starting a new free space block
				freeSpaceStart = i;
				freeSpaceLength = 1;
			}

			if (freeSpaceLength === fileLength) {
				// Move the file here and return
				for (let j = 0, m = fileLength; j < m; j++) {
					fileSystem[freeSpaceStart + j] = fileId;
					fileSystem[fileStart + j] = NaN;
				}
				return fileSystem;
			}
		} else {
			// Currently occupied space
			freeSpaceStart = -1;
			freeSpaceLength = -1;
		}
	}
	return fileSystem;
}

function compactFileSystemWithoutFragmentation(fileSystem: FileSystem): FileSystem {
	let i = fileSystem.length;
	let fileId = -1;
	let fileStart = -1;
	let fileLength = -1;
	while (i > 0) {
		const block = fileSystem[--i];
		if (block !== fileId) {
			if (fileId >= 0) {
				// We've found all of the file, attempt to move it
				fileSystem = moveFile(fileSystem, fileId, fileStart, fileLength);
			}
			if (!Number.isNaN(block)) {
				// It's a new file, but we can ignore if it's the first file
				if (fileId === 0) return fileSystem;

				fileId = block;
				fileStart = i;
				fileLength = 1;
			} else {
				// It's free space, reset file counters
				fileId = fileStart = fileLength = -1;
			}
		} else {
			// Increment current file
			fileStart = i;
			fileLength++;
		}
	}

	return fileSystem;
}

export function compactFileSystem(fileSystem: FileSystem, preventFragmenting = true): FileSystem {
	if (preventFragmenting) {
		return compactFileSystemWithoutFragmentation(fileSystem);
	} else {
		return compactFileSystemWithFragmentation(fileSystem);
	}
}

export function calculateChecksum(fileSystem: FileSystem): number {
	return fileSystem.reduce(
		(checksum, block, index) => (!Number.isNaN(block) ? checksum + block * index : checksum),
		0
	);
}
