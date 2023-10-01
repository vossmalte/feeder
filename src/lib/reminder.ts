import type { FeedingType } from './types';

export const feedingReminders: Partial<Record<FeedingType, number>> = {
	pamper: 6,
	poo: 9,
	// pdf: '🥣',
	// breastfeed: '🤱',
	// breastMilk: '🥛',
	hair: 28,
	iron: 8,
	vitamin: 25
	// comment: '💬',
	// temperature: '🌡'
};
