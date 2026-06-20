import clsx from 'clsx';
import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';
import { FilterSection } from '../FilterSection';

export interface TagFilterProps {
  tags: string[];
}

export function TagFilter({ tags }: Readonly<TagFilterProps>) {
  const { filters, toggleTag } = useFilters();
  const { t } = useTranslation();

  if (!tags.length) return null;

  return (
    <FilterSection title={t('pages.catalog.filters.tags')}>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => {
          const active = filters.tags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              aria-pressed={active}
              className={clsx(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                active ? 'border-accent bg-accent text-white' : 'border-neutral/60 bg-white text-gray-700 hover:border-accent hover:text-accent',
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
}
