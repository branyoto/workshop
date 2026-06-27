import { Checkbox } from '../../../../common/input/Checkbox';
import { FilterSection } from '../FilterSection';
import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';

export function AvailabilityFilter() {
  const { filters, setAvailable } = useFilters();
  const { t } = useTranslation();

  return (
    <FilterSection title={t('pages.catalog.filters.availability')}>
      <Checkbox label={t('pages.catalog.filters.inStockOnly')} checked={filters.available} onChange={setAvailable} data-testid="filter-available" />
    </FilterSection>
  );
}
