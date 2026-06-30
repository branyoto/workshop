import type { Item } from '../../../services/providers/cms/types';
import { Badge } from '../../../common/Badge';
import { ItemPrice } from './ItemPrice';
import { ItemCharacteristics } from './characteristics/ItemCharacteristics';
import { AddToCartButton } from './AddToCartButton';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { ItemCategories } from './ItemCategories';

export interface ItemInfoProps {
  item: Item;
}

export function ItemInfo({ item }: Readonly<ItemInfoProps>) {
  const { t } = useTranslation();
  const l = useLocalize();

  const title = l(item.title);
  const description = item.description ? l(item.description) : undefined;

  return (
    <div className="flex flex-col gap-4 lg:w-1/2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-primary-900">{title}</h2>
          <Badge variant={item.available ? 'success' : 'muted'}>{item.available ? t('pages.catalog.inStock') : t('pages.catalog.outOfStock')}</Badge>
        </div>
        <ItemCategories item={item} />
        <ItemPrice item={item} />
        {description && <p className="text-sm text-primary-700">{description}</p>}
      </div>
      <ItemCharacteristics item={item} />
      <AddToCartButton item={item} />
    </div>
  );
}
