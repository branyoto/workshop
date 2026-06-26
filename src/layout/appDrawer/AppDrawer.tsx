import { useTranslation } from 'react-i18next';
import { Drawer } from '../../common/Drawer';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CategorySection } from './CategorySection';

export interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function AppDrawer({ open, onClose }: Readonly<CategoryDrawerProps>) {
  const { t } = useTranslation();

  return (
    <Drawer open={open} onClose={onClose} side="left" title={t('pages.categories.title')} footer={<LanguageSwitcher />}>
      <CategorySection onClose={onClose} />
    </Drawer>
  );
}
