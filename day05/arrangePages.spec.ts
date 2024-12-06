import { describe, expect, it } from 'vitest';
import {
	calculateMiddlePageSums,
	isArranged,
	parseSortingRules,
	parseUpdates,
} from './arrangePages';

const INPUT = `
	47|53
	97|13
	97|61
	97|47
	75|29
	61|13
	75|53
	29|13
	97|29
	53|29
	61|53
	97|53
	61|29
	47|13
	75|47
	97|75
	47|61
	75|61
	47|29
	75|13
	53|13

	75,47,61,53,29
	97,61,53,29,13
	75,29,13
	75,97,47,61,53
	61,13,29
	97,13,75,29,47`;

describe('day05 : arrangePages', () => {
	it('calculates the sum of the middle pages of correctly arranged updates', () => {
		const sortingRules = parseSortingRules(INPUT);
		const updates = parseUpdates(INPUT);
		const arrangedUpdates = updates.filter((update) => isArranged(update, sortingRules));
		expect(calculateMiddlePageSums(arrangedUpdates)).toEqual(143);
	});
});
