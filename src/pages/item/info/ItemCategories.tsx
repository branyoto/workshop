import type { Item } from '../../../services/providers/cms/types';
import { CatalogFilterChip } from '../../../common/CatalogFilterChip';
import { useCms } from '../../../services/providers/cms/useCms';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { notNull } from '../../../utils/commonFilter';

export interface ItemCategoriesProps {
  item: Item;
}

export function ItemCategories({ item }: Readonly<ItemCategoriesProps>) {
  const l = useLocalize();
  const { tags } = useCms();

  const itemTags = item.tags.map(tag => tags[tag]).filter(notNull);

  return (
    <div className="flex flex-wrap gap-2">
      <div className="hidden">{item.tags.join(',')}</div>
      {itemTags.map(tag => (
        <CatalogFilterChip key={tag.fr} filter="tag" label={l(tag)} value={l(tag)} />
      ))}
    </div>
  );
}
