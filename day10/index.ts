import fs from 'node:fs/promises';
import path from 'node:path';
import { buildTopographicMap, findAllHikingTrails, sumTrailheadScores } from './hikingTrails';

const INPUT_FILE = path.join(__dirname, 'input.txt');

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const topographicMap = buildTopographicMap(fileData);
	const hikingTrails = findAllHikingTrails(topographicMap);
	const trailheadsScores = sumTrailheadScores(hikingTrails);

	console.log('Sum of trailhead scores:', trailheadsScores);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
