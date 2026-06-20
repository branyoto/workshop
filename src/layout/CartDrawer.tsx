import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCart } from '../cart/CartContext';
import { Button } from '../common/Button';
import { Drawer } from '../common/Drawer';
import { EmptyState } from '../common/EmptyState';
import { catalogUrl, checkoutUrl } from '../routes/routePaths';

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Readonly<CartDrawerProps>) {
  const { t, i18n } = useTranslation();
  const { items, total, removeItem, clearCart } = useCart();

  const priceLabel = (amount: number) =>
    new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(amount);

  const footer = items.length > 0 ? (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{t('pages.cart.total')}</span>
        <span>{priceLabel(total)}</span>
      </div>
      <Link
        to={checkoutUrl()}
        onClick={onClose}
        data-testid="cart-checkout-link"
        className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        {t('pages.cart.checkout')}
      </Link>
      <Button variant="ghost" className="w-full text-xs" onClick={clearCart}>
        {t('pages.cart.clear')}
      </Button>
    </div>
  ) : undefined;

  return (
    <Drawer open={open} onClose={onClose} side="right" title={t('pages.cart.title')} footer={footer} mobileFullScreen data-testid="cart-drawer">
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <EmptyState title={t('pages.cart.empty.title')} description={t('pages.cart.empty.description')} />
          <Link
            to={catalogUrl()}
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-secondary/80"
          >
            {t('pages.cart.empty.browseCatalog')}
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map(item => (
            <li key={item.id} data-testid="cart-item" className="flex items-center gap-3 rounded-lg border border-neutral/40 p-2">
              <img src={item.thumbnailUrl} alt="" aria-hidden="true" className="h-14 w-14 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.titleSnapshot}</p>
                <p className="text-sm text-gray-600">{priceLabel(item.priceSnapshot)}</p>
              </div>
              <Button variant="ghost" className="shrink-0 px-2 py-1 text-xs text-red-600" onClick={() => removeItem(item.id)} aria-label={t('pages.cart.remove', { title: item.titleSnapshot })}>
                ✕
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
