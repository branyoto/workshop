import { FilterSection } from '../FilterSection';
import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { NumberInput } from '../../../../common/input/NumberInput';

function formatNumber(inputNumber: string | null | undefined) {
  const parsedNumber = inputNumber ? Number.parseInt(inputNumber, 10) : null;
  return Number.isNaN(parsedNumber) ? null : parsedNumber;
}

// TODO: check if modifying url refresh prices
export function PriceFilter() {
  const { filters, setMinPrice, setMaxPrice } = useFilters();
  const { t } = useTranslation();

  const [minInput, setMinInput] = useState(filters.minPrice == null ? null : String(filters.minPrice));
  const [maxInput, setMaxInput] = useState(filters.maxPrice == null ? null : String(filters.maxPrice));

  const commitMin = () => setMinPrice(formatNumber(minInput?.trim()));
  const commitMax = () => setMaxPrice(formatNumber(maxInput?.trim()));

  return (
    <FilterSection title={t('pages.catalog.filters.price')}>
      <div className="flex items-center gap-2">
        <NumberInput
          min="0"
          value={minInput}
          placeholder={t('pages.catalog.filters.minPlaceholder')}
          onChange={setMinInput}
          onBlur={commitMin}
          onKeyDown={e => e.key === 'Enter' && commitMin()}
        />
        <span className="shrink-0 text-xs text-primary-400">–</span>
        <NumberInput
          min={minInput ?? '0'}
          value={maxInput}
          placeholder={t('pages.catalog.filters.maxPlaceholder')}
          onChange={setMaxInput}
          onBlur={commitMax}
          onKeyDown={e => e.key === 'Enter' && commitMax()}
        />
      </div>
    </FilterSection>
  );
}
