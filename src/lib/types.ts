const feedingTypes = [
  'poo',
  'pdf'
  //'breastMilk', 'breastfeed', 'iron', 'vitamin', 'hair'
] as const;

export type FeedingType = (typeof feedingTypes)[number];

type FeedingBase<T extends FeedingType> = { type: T };

type Poo = FeedingBase<'poo'>;
type QuantifiedFeeding = FeedingBase<'pdf'> & { quantity: number };

type UglyFeeding = Poo | QuantifiedFeeding;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Feeding = Prettify<UglyFeeding>;
export type FeedingWithTimestamp = Feeding & { datetime: string };
