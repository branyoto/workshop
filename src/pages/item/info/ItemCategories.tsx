import type { Item } from '../../../services/providers/cms/types';
import { CatalogFilterChip } from '../../../common/CatalogFilterChip';
import { useCms } from '../../../services/providers/cms/useCms';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useMemo } from 'react';

export interface ItemCategoriesProps {
  item: Item;
}

export function ItemCategories({ item }: Readonly<ItemCategoriesProps>) {
  const l = useLocalize();
  const { categories } = useCms();

  const categoryChips = useMemo(
    () =>
      categories.flatMap(cat => {
        const matches: Array<{ id: string; name: string; tag: string }> = [];
        const tag = item.tags.find(tag => cat.tags.includes(tag));
        if (tag) {
          matches.push({ id: cat.id, name: l(cat.name), tag });
        }
        return matches;
      }),
    [categories, l, item],
  );

  if (!categoryChips.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <div className="hidden">{item.tags.join(',')}</div>
      {categoryChips.map(c => (
        <CatalogFilterChip key={c.id} filter="tag" label={c.name} category={c.id} value={c.tag} />
      ))}
    </div>
  );
}
