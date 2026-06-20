import { FiltersList } from '../filters/FiltersList';
import { Drawer } from '../../../common/Drawer';
import { useTranslation } from 'react-i18next';
import type { Item } from '../../cms/types';
import type { Noop } from '../../../utils/useDisclosure';

export interface MobileFilterDrawerProps {
  items: Item[];
  open: boolean;
  onClose: Noop;
}

export function MobileFilterDrawer({ items, open, onClose }: Readonly<MobileFilterDrawerProps>) {
  const { t } = useTranslation();
  return (
    <Drawer open={open} onClose={onClose} side="left" title={t('pages.catalog.filters.title')}>
      <FiltersList items={items} />
    </Drawer>
  );
}
