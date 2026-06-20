import clsx from 'clsx';
import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../common/Button';
import type { Filters } from './useFilters';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

function FilterSection({ title, children }: Readonly<FilterSectionProps>) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</h3>
      {children}
    </div>
  );
}

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  'data-testid'?: string;
}

function CheckboxRow({ label, checked, onChange, 'data-testid': testId }: Readonly<CheckboxRowProps>) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={testId}
        className="size-4 rounded border-neutral/60 accent-accent"
      />
      {label}
    </label>
  );
}

export interface FiltersPanelProps {
  filters: Filters;
  activeCount: number;
  colors: string[];
  tags: string[];
  onSetMinPrice: (v: number | null) => void;
  onSetMaxPrice: (v: number | null) => void;
  onSetAvailable: (v: boolean) => void;
  onToggleColor: (c: string) => void;
  onToggleTag: (t: string) => void;
  onClearAll: () => void;
}

export function FiltersPanel({
  filters,
  activeCount,
  colors,
  tags,
  onSetMinPrice,
  onSetMaxPrice,
  onSetAvailable,
  onToggleColor,
  onToggleTag,
  onClearAll,
}: Readonly<FiltersPanelProps>) {
  const { t } = useTranslation();

  // Local state for price inputs — syncs from URL (back-button / clear-all)
  const [minInput, setMinInput] = useState(filters.minPrice !== null ? String(filters.minPrice) : '');
  const [maxInput, setMaxInput] = useState(filters.maxPrice !== null ? String(filters.maxPrice) : '');

  useEffect(() => {
    setMinInput(filters.minPrice !== null ? String(filters.minPrice) : '');
  }, [filters.minPrice]);

  useEffect(() => {
    setMaxInput(filters.maxPrice !== null ? String(filters.maxPrice) : '');
  }, [filters.maxPrice]);

  function commitMin() {
    const n = minInput.trim();
    onSetMinPrice(n === '' ? null : Number(n));
  }

  function commitMax() {
    const n = maxInput.trim();
    onSetMaxPrice(n === '' ? null : Number(n));
  }

  const inputClass =
    'w-full rounded-md border border-neutral/60 bg-white px-2 py-1 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">{t('pages.catalog.filters.title')}</span>
        {activeCount > 0 && (
          <Button variant="ghost" className="px-2 py-0.5 text-xs text-accent" onClick={onClearAll}>
            {t('pages.catalog.filters.clearAll')}
          </Button>
        )}
      </div>

      <div className="h-px bg-neutral/40" />

      {/* Price */}
      <FilterSection title={t('pages.catalog.filters.price')}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={minInput}
            placeholder={t('pages.catalog.filters.minPlaceholder')}
            onChange={e => setMinInput(e.target.value)}
            onBlur={commitMin}
            onKeyDown={e => e.key === 'Enter' && commitMin()}
            className={inputClass}
            aria-label={t('pages.catalog.filters.minPlaceholder')}
          />
          <span className="shrink-0 text-xs text-gray-400">–</span>
          <input
            type="number"
            min={0}
            value={maxInput}
            placeholder={t('pages.catalog.filters.maxPlaceholder')}
            onChange={e => setMaxInput(e.target.value)}
            onBlur={commitMax}
            onKeyDown={e => e.key === 'Enter' && commitMax()}
            className={inputClass}
            aria-label={t('pages.catalog.filters.maxPlaceholder')}
          />
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title={t('pages.catalog.filters.availability')}>
        <CheckboxRow
          label={t('pages.catalog.filters.inStockOnly')}
          checked={filters.available}
          onChange={() => onSetAvailable(!filters.available)}
          data-testid="filter-available"
        />
      </FilterSection>

      {/* Colors */}
      {colors.length > 0 && (
        <FilterSection title={t('pages.catalog.filters.colors')}>
          <div className="space-y-1.5">
            {colors.map(color => (
              <CheckboxRow
                key={color}
                label={color}
                checked={filters.colors.includes(color)}
                onChange={() => onToggleColor(color)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <FilterSection title={t('pages.catalog.filters.tags')}>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => {
              const active = filters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  aria-pressed={active}
                  className={clsx(
                    'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                    active
                      ? 'border-accent bg-accent text-white'
                      : 'border-neutral/60 bg-white text-gray-700 hover:border-accent hover:text-accent',
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}
    </div>
  );
}

