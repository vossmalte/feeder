export const feedingTypes = [
  'poo',
  'pdf',
  'breastMilk',
  'breastfeed',
  'iron',
  'vitamin',
  'hair'
] as const;

export type FeedingType = (typeof feedingTypes)[number];

type FeedingBase<T extends FeedingType> = { type: T };

type BasicFeeding = FeedingBase<'poo' | 'iron' | 'vitamin' | 'hair'>;
type QuantifiedFeeding = FeedingBase<'pdf' | 'breastfeed' | 'breastMilk'> & { quantity: number };

type UglyFeeding = BasicFeeding | QuantifiedFeeding;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Feeding = Prettify<UglyFeeding>;
export type FeedingWithTimestamp = Feeding & { datetime: string };

export function assertUnreachable(x: never) {
  throw Error(x);
}
