import { Button } from '../../../common/Button';
import { useFilters } from './useFilters';
import { useTranslation } from 'react-i18next';

export function ClearButton() {
  const { activeCount, clearAll } = useFilters();
  const { t } = useTranslation();

  if (!activeCount) return null;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-900">{t('pages.catalog.filters.title')}</span>
      <Button variant="ghost" className="px-2 py-0.5 text-xs text-accent" onClick={clearAll}>
        {t('pages.catalog.filters.clearAll')}
      </Button>
    </div>
  );
}
