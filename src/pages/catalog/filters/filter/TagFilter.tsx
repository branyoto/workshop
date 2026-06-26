import { useFilters } from '../useFilters';
import { useTranslation } from 'react-i18next';
import { FilterSection } from '../FilterSection';
import { useCms } from '../../../../services/providers/cms/useCms';
import { useLocalize } from '../../../../services/providers/cms/useLocalize';
import type { Item } from '../../../../services/providers/cms/types';
import { resolveCategoryTags, uniqueTags } from '../../utils';
import { useParams } from 'react-router';
import { ToggleButton } from '../../../../common/input/ToggleButton';

export interface TagFilterProps {
  items: Item[];
}

export function TagFilter({ items }: Readonly<TagFilterProps>) {
  const { filters, toggleTag } = useFilters();
  const { categories, tags: cmsTags } = useCms();
  const { categoryId, subcategoryId, subId } = useParams();
  const { t } = useTranslation();
  const l = useLocalize();

  const tags = uniqueTags(items, cmsTags, l);
  const categoryTags = resolveCategoryTags(categories, categoryId, subcategoryId, subId);
  const nonCategoryTags = tags.filter(tag => !categoryTags.includes(tag));

  if (!nonCategoryTags.length) return null;

  return (
    <FilterSection title={t('pages.catalog.filters.tags')}>
      <div className="flex flex-wrap gap-1.5">
        {nonCategoryTags.map(tag => (
          <ToggleButton key={tag} label={l(cmsTags[tag])} active={filters.tags.includes(tag)} onClick={() => toggleTag(tag)} />
        ))}
      </div>
    </FilterSection>
  );
}
