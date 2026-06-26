import { getProductImageUrl } from '../../utils/image';
import { Button } from '../../common/Button';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../services/providers/cart/useCart';
import { useFormatPrice } from '../../services/i18n/formatPrice';

export function CartItems() {
  const { t } = useTranslation();
  const { items, removeItem } = useCart();
  const formatPrice = useFormatPrice();

  return (
    <ul className="flex flex-col gap-3">
      {items.map(item => (
        <li key={item.id} data-testid="cart-item" className="flex items-center gap-3 rounded-lg border border-neutral/40 p-2">
          <img src={getProductImageUrl(item.id)} alt="" aria-hidden="true" className="h-14 w-14 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.titleSnapshot}</p>
            <p className="text-sm text-gray-600">{formatPrice(item.priceSnapshot)}</p>
          </div>
          <Button
            variant="ghost"
            className="shrink-0 px-2 py-1 text-xs text-red-600"
            onClick={() => removeItem(item.id)}
            aria-label={t('pages.cart.remove', { title: item.titleSnapshot })}
          >
            ✕
          </Button>
        </li>
      ))}
    </ul>
  );
}
