import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';
import { FilterSection } from '../FilterSection';
import { Checkbox } from '../../../../common/input/Checkbox';

export interface ColorFilterProps {
  colors: string[];
}

export function ColorFilter({ colors }: Readonly<ColorFilterProps>) {
  const { filters, toggleColor } = useFilters();
  const { t } = useTranslation();

  if (!colors.length) return null;

  return (
    <FilterSection title={t('pages.catalog.filters.colors')}>
      <div className="space-y-1.5">
        {colors.map(color => (
          <Checkbox key={color} label={color} checked={filters.colors.includes(color)} onChange={() => toggleColor(color)} />
        ))}
      </div>
    </FilterSection>
  );
}
