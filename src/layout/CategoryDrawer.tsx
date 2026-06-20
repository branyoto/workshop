import { useTranslation } from 'react-i18next';
import { Drawer } from '../common/Drawer';
import { EmptyState } from '../common/EmptyState';
import { LanguageSwitcher } from './LanguageSwitcher';

export interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CategoryDrawer({ open, onClose }: Readonly<CategoryDrawerProps>) {
  const { t } = useTranslation();
  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="left"
      title={t('pages.categories.title')}
      footer={<LanguageSwitcher />}
    >
      <EmptyState title={t('pages.categories.empty.title')} description={t('pages.categories.empty.description')} />
    </Drawer>
  );
}
