import type { CategoryView } from '../../../services/providers/cms/types';

export function flattenCategories(categories: CategoryView[]): CategoryView[] {
  return categories.flatMap(c => [c, ...flattenCategories(c.children ?? [])]);
}

export function getAllDescendantIds(category: CategoryView): string[] {
  return [category.id, ...(category.children ?? []).flatMap(getAllDescendantIds)];
}

export function findParentId(categories: CategoryView[], id: string): string | undefined {
  for (const cat of categories) {
    if (cat.children?.some(c => c.id === id)) return cat.id;
    const found = findParentId(cat.children ?? [], id);
    if (found) return found;
  }
  return undefined;
}
