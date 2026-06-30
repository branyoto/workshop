import { Button } from '../../../common/Button';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../services/providers/cart/useCart';
import type { Item } from '../../../services/providers/cms/types';
import { useLocalize } from '../../../services/providers/cms/useLocalize';

export interface AddToCartButtonProps {
  item: Item;
}

export function AddToCartButton({ item }: Readonly<AddToCartButtonProps>) {
  const { addItem, items } = useCart();
  const { t } = useTranslation();
  const l = useLocalize();

  const inCart = items.some(ci => ci.id === item.id);

  const handleAddToCart = () => {
    addItem({ id: item.id, titleSnapshot: l(item.title), priceSnapshot: item.price });
  };

  return (
    <div className="mt-auto">
      {item.available ?
        <Button
          variant="primary"
          className="w-full"
          onClick={handleAddToCart}
          disabled={inCart}
          data-testid="add-to-cart"
          aria-label={inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
        >
          {inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
        </Button>
      : <div className="rounded-xl border border-bg-200 p-3 text-center text-sm text-primary-500">{t('pages.item.soldOut')}</div>}
    </div>
  );
}
