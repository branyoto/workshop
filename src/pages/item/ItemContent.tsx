import { useLocalize } from '../../services/providers/cms/useLocalize';
import type { Item } from '../../services/providers/cms/types';
import { ItemInfo } from './info/ItemInfo';
import { ItemGallery } from './gallery/ItemGallery';

export interface ItemContentProps {
  item: Item;
}

export function ItemContent({ item }: Readonly<ItemContentProps>) {
  const l = useLocalize();
  const title = l(item.title);
  return (
    <section aria-labelledby="item-heading">
      <h1 id="item-heading" className="sr-only">
        {title}
      </h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <ItemGallery item={item} />
        <ItemInfo item={item} />
      </div>
    </section>
  );
}
