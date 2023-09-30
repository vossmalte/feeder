import type { FeedingType } from './types';

export const feedingCaptions: Record<FeedingType, string> = {
	pamper: 'Gewickelt',
	poo: 'Stuhl',
	pdf: 'PDF',
	breastfeed: 'Stillen',
	breastMilk: 'Muttermilch',
	hair: 'Haare',
	iron: 'Eisen',
	vitamin: 'Vitamin D',
	comment: 'Kommentar',
	temperature: 'Temperatur'
};
export const feedingUnits: Record<FeedingType, string> = {
	pamper: '',
	poo: '',
	pdf: 'ml',
	breastfeed: 'min',
	breastMilk: 'ml',
	hair: '',
	iron: '',
	vitamin: '',
	comment: '',
	temperature: '°C'
};
