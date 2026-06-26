import { Link } from 'react-router';
import { checkoutUrl } from '../../routes/routePaths';
import { Button } from '../../common/Button';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../services/providers/cart/useCart';
import { useFormatPrice } from '../../services/i18n/formatPrice';

export interface CartFooterProps {
  onClose: () => void;
}

export function CartFooter({ onClose }: Readonly<CartFooterProps>) {
  const { t } = useTranslation();
  const { total, clearCart } = useCart();
  const formatPrice = useFormatPrice();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{t('pages.cart.total')}</span>
        <span>{formatPrice(total)}</span>
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
  );
}
