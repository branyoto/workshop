import { useTranslation } from 'react-i18next';
import { useCart } from '../../services/providers/cart/useCart';
import { Drawer } from '../../common/Drawer';
import { EmptyCart } from './EmptyCart';
import { CartItems } from './CartItems';
import { CartFooter } from './CartFooter';

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Readonly<CartDrawerProps>) {
  const { t } = useTranslation();
  const { items } = useCart();

  const emptyCart = !items.length;

  const footer = emptyCart ? undefined : <CartFooter onClose={onClose} />;

  return (
    <Drawer open={open} onClose={onClose} side="right" title={t('pages.cart.title')} footer={footer} mobileFullScreen>
      {emptyCart ?
        <EmptyCart onClose={onClose} />
      : <CartItems />}
    </Drawer>
  );
}
