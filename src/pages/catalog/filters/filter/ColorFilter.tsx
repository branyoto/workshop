import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';
import { FilterSection } from '../FilterSection';
import { Checkbox } from '../../../../common/input/Checkbox';
import type { Item } from '../../../../services/providers/cms/types';
import { useLocalize } from '../../../../services/providers/cms/useLocalize';
import { uniqueColors } from '../../utils';
import { useCms } from '../../../../services/providers/cms/useCms';

export interface ColorFilterProps {
  items: Item[];
}

export function ColorFilter({ items }: Readonly<ColorFilterProps>) {
  const { filters, toggleColor } = useFilters();
  const { t } = useTranslation();
  const l = useLocalize();
  const { colors: cmsColors } = useCms();

  const colors = uniqueColors(items, cmsColors, l);

  if (!colors.length) return null;

  return (
    <FilterSection title={t('pages.catalog.filters.colors')}>
      <div className="space-y-1.5">
        {colors.map(color => (
          <Checkbox key={color} label={l(cmsColors[color])} checked={filters.colors.includes(color)} onChange={() => toggleColor(color)} />
        ))}
      </div>
    </FilterSection>
  );
}
