import type { CategoryView, Item, LocalizedText } from '../../services/providers/cms/types';
import type { LocalizeText } from '../../services/providers/cms/useLocalize';

function uniqueLocalized(values: string[], localizedTexts: Record<string, LocalizedText>, l: LocalizeText): string[] {
  const seen = new Set<string>();
  for (const value of values) {
    if (localizedTexts[value]) {
      seen.add(value);
    }
  }
  return [...seen].sort((a, b) => l(localizedTexts[a]).localeCompare(l(localizedTexts[b])));
}

export function uniqueColors(items: Item[], colors: Record<string, LocalizedText>, l: LocalizeText): string[] {
  return uniqueLocalized(
    items.flatMap(item => item.characteristics?.colors ?? []),
    colors,
    l,
  );
}

export function uniqueTags(items: Item[], tags: Record<string, LocalizedText>, l: LocalizeText): string[] {
  return uniqueLocalized(
    items.flatMap(item => item.tags),
    tags,
    l,
  );
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

export function resolveCategoryTags(
  categories: CategoryView[],
  categoryId: string | undefined,
  subcategoryId: string | undefined,
  subId: string | undefined,
): string[] {
  if (!categoryId) return [];
  const root = categories.find(c => c.id === categoryId);
  if (root === undefined) return [];
  if (subcategoryId === undefined) return root.tags;
  const child = root.children?.find(c => c.id === subcategoryId);
  if (child === undefined) return root.tags;
  if (subId === undefined) return [...root.tags, ...child.tags];
  const grand = child.children?.find(c => c.id === subId);
  if (grand === undefined) return [...root.tags, ...child.tags];
  return [...root.tags, ...child.tags, ...grand.tags];
}
