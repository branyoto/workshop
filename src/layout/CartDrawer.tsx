import { useTranslation } from 'react-i18next';
import { Drawer } from '../common/Drawer';
import { EmptyState } from '../common/EmptyState';

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Readonly<CartDrawerProps>) {
  const { t } = useTranslation();
  return (
    <Drawer open={open} onClose={onClose} side="right" title={t('pages.cart.title')}>
      <EmptyState title={t('pages.cart.empty.title')} description={t('pages.cart.empty.description')} />
    </Drawer>
  );
}
