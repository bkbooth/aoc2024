import { partial } from 'lodash-es';

export type SortingRule = [number, number];
export type Update = Array<number>;

const PAGE_RULE = /\d+\|\d+/gm;
export function parseSortingRules(input: string): Array<SortingRule> {
	const sortingRuleStrings = input.match(PAGE_RULE);
	return sortingRuleStrings.map(
		(sortingRule) => sortingRule.split('|').map((rule) => Number.parseInt(rule)) as SortingRule
	);
}

const UPDATE = /(\d+,)+\d+/gm;
export function parseUpdates(input: string): Array<Update> {
	const updateStrings = input.match(UPDATE);
	return updateStrings.map((update) => update.split(',').map((page) => Number.parseInt(page)));
}

export function isArranged(update: Update, sortingRules: Array<SortingRule>): boolean {
	for (let i = 0, n = update.length; i < n; i++) {
		const page1 = update[i];
		for (let j = i + 1, m = update.length; j < m; j++) {
			const page2 = update[j];
			const rule = sortingRules.find(
				(rule) =>
					(page1 === rule[0] && page2 === rule[1]) || (page1 === rule[1] && page2 === rule[0])
			);
			if (rule && page1 === rule[1] && page2 === rule[0]) {
				return false;
			}
		}
	}
	return true;
}

function sortBySortingRules(
	sortingRules: Array<SortingRule>,
	page1: number,
	page2: number
): number {
	const rule = sortingRules.find(
		(rule) => (page1 === rule[0] && page2 === rule[1]) || (page1 === rule[1] && page2 === rule[0])
	);
	if (rule && page1 === rule[1] && page2 === rule[0]) {
		return -1;
	} else {
		return 0;
	}
}

export function arrangePages(
	updates: Array<Update>,
	sortingRules: Array<SortingRule>
): Array<Update> {
	return updates.map((update) => update.sort(partial(sortBySortingRules, sortingRules)));
}

export function calculateMiddlePageSums(updates: Array<Update>): number {
	return updates.reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
}
