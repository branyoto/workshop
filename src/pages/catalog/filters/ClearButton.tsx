import { Button } from '../../../common/Button';
import { useFilters } from './useFilters';
import { useTranslation } from 'react-i18next';

export function ClearButton() {
  const { activeCount, clearAll } = useFilters();
  const { t } = useTranslation();

  return (
    <Button variant="ghost" className="px-2 py-0.5 text-xs text-accent" onClick={clearAll} disabled={!activeCount}>
      {t('pages.catalog.filters.clearAll')}
    </Button>
  );
}
