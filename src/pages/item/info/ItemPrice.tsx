import type { Item } from '../../../services/providers/cms/types';
import { useFormatPrice } from '../../../services/i18n/formatPrice';

export interface ItemPriceProps {
  item: Item;
}

export function ItemPrice({ item }: Readonly<ItemPriceProps>) {
  const formatPrice = useFormatPrice();

  return <span className="text-xl font-bold block text-primary-900">{formatPrice(item.price)}</span>;
}
