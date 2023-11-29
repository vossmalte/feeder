// TODO: add temperature
export const quantifiedFeedingTypes = ['pdf', 'breastMilk', 'breastfeed', 'temperature'] as const;
export type QuantifiedFeedingType = (typeof quantifiedFeedingTypes)[number];

export const booleanFeedingTypes = ['pamper', 'poo', 'iron', 'vitamin', 'hair', 'bath'] as const;
export type BooleanFeedingType = (typeof booleanFeedingTypes)[number];

export const feedingTypes = [...quantifiedFeedingTypes, ...booleanFeedingTypes, 'comment'] as const;
export type FeedingType = (typeof feedingTypes)[number];
type FeedingBase<T extends FeedingType> = { type: T };

type BasicFeeding = FeedingBase<BooleanFeedingType>;
type QuantifiedFeeding = FeedingBase<QuantifiedFeedingType> & { quantity: number };
type Comment = FeedingBase<'comment'> & { comment: string };

type UglyFeeding = BasicFeeding | QuantifiedFeeding | Comment;

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type Feeding = Prettify<UglyFeeding>;
export type FeedingWithTimestamp = Feeding & { datetime: string };

export function assertUnreachable(x: never) {
	throw Error(x);
}
