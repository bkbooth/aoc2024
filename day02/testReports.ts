import { isEmpty } from 'lodash-es';

export type Report = Array<number>;

export function findReports(input: string): Array<Report> {
	const lines = input.split('\n');
	return lines.reduce((reports, line) => {
		if (isEmpty(line.trim())) return reports;
		reports.push(
			line
				.trim()
				.split(/\s+/)
				.map((level) => Number.parseInt(level))
		);
		return reports;
	}, [] as Array<Report>);
}

type TestResult = { result: true; level?: number } | { result: false; level: number };

function testReport(report: Report): TestResult {
	const isIncreasing = report[0] < report[report.length - 1];

	for (let i = 0, n = report.length; i < n - 1; i++) {
		const level1 = report[i];
		const level2 = report[i + 1];
		const difference = level1 - level2;
		if (difference === 0 || Math.abs(difference) > 3) {
			return { result: false, level: i };
		}

		const isIncrease = difference < 0;
		if (isIncreasing !== isIncrease) {
			return { result: false, level: i };
		}
	}

	return { result: true };
}

function testDampenedReport(report: Report, failedLevel: number): boolean {
	const allDampenedVariants: Array<Report> = Array.from({ length: report.length }, (_, i) => [
		...report.slice(0, i),
		...report.slice(i + 1),
	]);
	// Only take the dampened variants from around the failed level
	const dampenedVariantsToTest = allDampenedVariants.slice(
		failedLevel,
		Math.min(failedLevel + 2, report.length)
	);
	return dampenedVariantsToTest.some((report) => testReport(report).result);
}

export function testReports(reports: Array<Report>, dampen = true): number {
	let safeReports = 0;

	for (let i = 0, n = reports.length; i < n; i++) {
		const report = reports[i];

		let { result, level } = testReport(report);
		if (!result && dampen) {
			result = testDampenedReport(report, level);
		}

		if (result) safeReports++;
	}

	return safeReports;
}
