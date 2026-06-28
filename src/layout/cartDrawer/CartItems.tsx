import { X } from 'lucide-react';
import { getProductImageUrl } from '../../utils/image';
import { Button } from '../../common/Button';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../services/providers/cart/useCart';
import { useFormatPrice } from '../../services/i18n/formatPrice';
import { DecorativeImage } from '../../common/DecorativeImage';

export function CartItems() {
  const { t } = useTranslation();
  const { items, removeItem } = useCart();
  const formatPrice = useFormatPrice();

  return (
    <ul className="flex flex-col gap-3">
      {items.map(item => (
        <li key={item.id} data-testid="cart-item" className="flex items-center gap-3 rounded-lg border border-neutral/40 p-2">
          <DecorativeImage src={getProductImageUrl(item.id)} className="size-14" fullWidth={false} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.titleSnapshot}</p>
            <p className="text-sm text-gray-600">{formatPrice(item.priceSnapshot)}</p>
          </div>
          <Button
            variant="text"
            className="shrink-0 px-2 py-1 text-xs text-red-600"
            onClick={() => removeItem(item.id)}
            aria-label={t('pages.cart.remove', { title: item.titleSnapshot })}
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Button>
        </li>
      ))}
    </ul>
  );
}
