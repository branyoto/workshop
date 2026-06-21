import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';
import { FilterSection } from '../FilterSection';
import { Checkbox } from '../../../../common/input/Checkbox';
import type { LocalizedText } from '../../../../services/providers/cms/types';
import { useLocalize } from '../../../../services/providers/cms/useLocalize';

export interface ColorFilterProps {
  colors: LocalizedText[];
}

function hasColor(colors: string[], color: LocalizedText) {
  return Object.values(color)
    .filter(Boolean)
    .some(c => colors.includes(c));
}

export function ColorFilter({ colors }: Readonly<ColorFilterProps>) {
  const { filters, toggleColor } = useFilters();
  const { t } = useTranslation();
  const l = useLocalize();

  if (!colors.length) return null;

  return (
    <FilterSection title={t('pages.catalog.filters.colors')}>
      <div className="space-y-1.5">
        {colors.map(color => (
          <Checkbox key={color.fr} label={l(color)} checked={hasColor(filters.colors, color)} onChange={() => toggleColor(color, l)} />
        ))}
      </div>
    </FilterSection>
  );
}
