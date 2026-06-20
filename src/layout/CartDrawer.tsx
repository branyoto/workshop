import { Drawer } from '../common/Drawer';
import { EmptyState } from '../common/EmptyState';

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Readonly<CartDrawerProps>) {
  return (
    <Drawer open={open} onClose={onClose} side="right" title="Cart">
      <EmptyState title="Your cart is empty" description="Items you add will appear here." />
    </Drawer>
  );
}
