import clsx from 'clsx';
import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';
import { FilterSection } from '../FilterSection';
import { useCms } from '../../../../services/providers/cms/useCms';
import { useLocalize } from '../../../../services/providers/cms/useLocalize';
import type { Item } from '../../../../services/providers/cms/types';
import { uniqueTags } from '../../utils';

export interface TagFilterProps {
  items: Item[];
}

export function TagFilter({ items }: Readonly<TagFilterProps>) {
  const { filters, toggleTag } = useFilters();
  const { tags: cmsTags } = useCms();
  const { t } = useTranslation();
  const l = useLocalize();

  const tags = uniqueTags(items, cmsTags, l);

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
              {l(cmsTags[tag])}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
}
