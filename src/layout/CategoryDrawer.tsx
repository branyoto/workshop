import { Drawer } from '../common/Drawer';
import { EmptyState } from '../common/EmptyState';

export interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CategoryDrawer({ open, onClose }: Readonly<CategoryDrawerProps>) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title="Categories">
      <EmptyState title="Categories coming soon" description="The category tree will appear here once the CMS data layer is connected." />
    </Drawer>
  );
}
