import { describe, expect, it } from 'vitest';
import { findReports, testReports } from './testReports';

const INPUT = `
	7 6 4 2 1
	1 2 7 8 9
	9 7 6 2 1
	1 3 2 4 5
	8 6 4 4 1
	1 3 6 7 9`;

describe('day02 : testReports', () => {
	it('returns the number of safe reports', () => {
		const reports = findReports(INPUT);
		expect(testReports(reports, false)).toBe(2);
	});

	it('returns the number of safe reports with dampening', () => {
		const reports = findReports(INPUT);
		expect(testReports(reports, true)).toBe(4);
	});
});
