import type { Item } from '../services/providers/cms/types';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '../services/providers/cms/useLocalize';
import { useCart } from '../services/providers/cart/useCart';
import { useFormatPrice } from '../services/i18n/formatPrice';
import { Button } from './Button';
import { Badge } from './Badge';
import { useCallback } from 'react';
import type { MouseEvent } from 'react';

export interface ElementCardLabelProps {
  item: Item;
}

export function ElementCardLabel({ item }: Readonly<ElementCardLabelProps>) {
  const { t } = useTranslation();
  const l = useLocalize();
  const { addItem, items } = useCart();
  const formatPrice = useFormatPrice();

  const inCart = items.some(ci => ci.id === item.id);

  const onClick = useCallback(
    (ev: MouseEvent<HTMLButtonElement>) => {
      addItem({ id: item.id, titleSnapshot: l(item.title), priceSnapshot: item.price });
      ev.preventDefault();
    },
    [item, l],
  );

  return (
    <div className="flex flex-1 flex-col gap-2 p-3">
      <div className="flex items-start justify-between gap-2 text-start">
        <span className="text-sm font-medium text-gray-900">{l(item.title)}</span>
        <Badge variant={item.available ? 'success' : 'muted'} className="shrink-0">
          {item.available ? t('pages.catalog.inStock') : t('pages.catalog.outOfStock')}
        </Badge>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-gray-900">{formatPrice(item.price)}</span>
        {item.available && (
          <Button variant={inCart ? 'text' : 'secondary'} className="px-2 py-1 text-xs" disabled={inCart} onClick={onClick}>
            {inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
          </Button>
        )}
      </div>
    </div>
  );
}
