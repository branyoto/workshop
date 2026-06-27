import type { Item, LocalizedText } from '../../services/providers/cms/types';

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter(item => item !== value) : [...values, value];
}

export function updateColors(color: string) {
  return (item: Item) => ({ ...item, characteristics: { colors: toggleValue(item.characteristics?.colors ?? [], color) } });
}

export function updateTags(tag: string) {
  return (item: Item) => ({ ...item, tags: toggleValue(item.tags, tag) });
}

export function sortOptions(entries: [string, LocalizedText][], l: (text: LocalizedText) => string): [string, LocalizedText][] {
  return [...entries].sort((a, b) => l(a[1]).localeCompare(l(b[1])));
}
