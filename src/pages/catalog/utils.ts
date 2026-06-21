import type { CategoryView, Item, LocalizedText } from '../../services/providers/cms/types';
import type { LocalizeText } from '../../services/providers/cms/useLocalize';

export function uniqueColors(items: Item[], localize: LocalizeText): LocalizedText[] {
  const seen = [];
  for (const item of items) {
    for (const color of item.characteristics?.colors ?? []) seen.push(color);
  }
  return seen.filter((item, i, items) => items.findIndex(x => x.fr === item.fr) === i).sort((a, b) => localize(a).localeCompare(localize(b)));
}

export function uniqueTags(items: Item[]): string[] {
  const seen = new Set<string>();
  for (const item of items) {
    for (const tag of item.tags) seen.add(tag);
  }
  return [...seen].sort((a, b) => a.localeCompare(b));
}

export function collectTags(category: CategoryView): string[] {
  const tags = new Set(category.tags);
  for (const child of category.children ?? []) {
    for (const tag of collectTags(child)) {
      tags.add(tag);
    }
  }
  return [...tags];
}

type ResolveResult = { category: CategoryView | null; notFound: boolean };

export function resolveCategory(
  categories: CategoryView[],
  categoryId: string | undefined,
  subcategoryId: string | undefined,
  subId: string | undefined,
): ResolveResult {
  if (!categoryId) return { category: null, notFound: false };
  const root = categories.find(c => c.id === categoryId);
  if (root === undefined) return { category: null, notFound: true };
  if (subcategoryId === undefined) return { category: root, notFound: false };
  const child = root.children?.find(c => c.id === subcategoryId);
  if (child === undefined) return { category: null, notFound: true };
  if (subId === undefined) return { category: child, notFound: false };
  const grand = child.children?.find(c => c.id === subId);
  if (grand === undefined) return { category: null, notFound: true };
  return { category: grand, notFound: false };
}
