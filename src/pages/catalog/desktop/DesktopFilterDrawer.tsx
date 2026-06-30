import { FiltersList } from '../filters/FiltersList';
import type { Item } from '../../../services/providers/cms/types';
import { useTranslation } from 'react-i18next';

export interface DesktopFilterDrawerProps {
  items: Item[];
}

export function DesktopFilterDrawer({ items }: Readonly<DesktopFilterDrawerProps>) {
  const { t } = useTranslation();
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-4 max-h-[calc(100vh-1.8rem)] overflow-y-auto rounded-xl border border-bg-200 bg-bg-50 p-4 shadow-sm">
        <span className="text-sm font-semibold text-primary-900 block mb-4">{t('pages.catalog.filters.title')}</span>
        <FiltersList items={items} />
      </div>
    </aside>
  );
}
