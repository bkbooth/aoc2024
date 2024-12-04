import fs from 'node:fs/promises';
import path from 'node:path';

const INPUT_FILE = path.join(__dirname, 'input.txt');

const MUL_COMMAND = /mul\((\d{1,3}),(\d{1,3})\)/;
const MUL_COMMAND_GLOBAL = new RegExp(MUL_COMMAND, 'gm');

function processMulCommand(mulCommand: string): number {
	const result = MUL_COMMAND.exec(mulCommand);
	const num1 = Number.parseInt(result[1]);
	const num2 = Number.parseInt(result[2]);
	return num1 * num2;
}

async function main() {
	const fileData = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });

	const mulCommands = fileData.match(MUL_COMMAND_GLOBAL);

	const total = mulCommands.reduce((total, mulCommand) => total + processMulCommand(mulCommand), 0);

	console.log('Multiplications total:', total);
}

main().catch((error) => {
	console.error(process.env.NODE_ENV === 'production' ? error.stack || error.message : error);
	process.exit(1);
});
