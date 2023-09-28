import type { FeedingType } from './types';

export const feedingCaptions: Record<FeedingType, string> = {
	poo: 'Stuhl',
	pdf: 'PDF',
	breastfeed: 'Stillen',
	breastMilk: 'Muttermilch',
	hair: 'Haare',
	iron: 'Eisen',
	vitamin: 'Vitamin D',
	comment: 'Kommentar'
};
export const feedingUnits: Record<FeedingType, string> = {
	poo: '',
	pdf: 'ml',
	breastfeed: 'min',
	breastMilk: 'ml',
	hair: '',
	iron: '',
	vitamin: '',
	comment: ''
};
