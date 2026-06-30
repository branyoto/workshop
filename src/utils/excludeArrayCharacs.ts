import type { Item, ItemCharacteristics } from '../services/providers/cms/types';

export function excludeArrayCharacs(item: Item) {
  return Object.entries(item.characteristics ?? {}).filter(([, value]) => typeof value !== 'object') as [
    Exclude<keyof ItemCharacteristics, 'colors'>,
    string | undefined,
  ][];
}
