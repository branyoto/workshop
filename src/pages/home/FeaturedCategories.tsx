import { useLocalize } from '../../services/providers/cms/useLocalize';
import { useCms } from '../../services/providers/cms/useCms';
import { useMemo } from 'react';
import { FeaturedElements } from './FeaturedElements';
import { notNull } from '../../utils/commonFilter';
import { catalogUrl, categoryUrl } from '../../routes/routePaths';
import { getCategoryImageUrl } from '../../utils/image';
import { setOrDeleteMultiple } from '../catalog/filters/useFilters';

export function FeaturedCategories() {
  const l = useLocalize();
  const { categories, featuredCategoryIds } = useCms();

  const featuredCategories = useMemo(
    () =>
      featuredCategoryIds
        .map(id => categories.find(c => c.id === id))
        .filter(notNull)
        .map(({ name, id }) => ({ id, label: <FeaturedCategoryLabel label={l(name)} />, href: categoryUrl(id), imageUrl: getCategoryImageUrl(id) })),
    [categories, featuredCategoryIds, l],
  );

  const titleSearchParams = useMemo(() => {
    const featuredTags = featuredCategories.flatMap(({ id }) => categories.find(c => c.id === id)?.tags ?? []).distinct();
    return '?' + setOrDeleteMultiple('tags', featuredTags)(new URLSearchParams()).toString();
  }, [categories, featuredCategories]);

  return <FeaturedElements titleKey="pages.home.categories" titleHref={catalogUrl() + titleSearchParams} elements={featuredCategories} />;
}

function FeaturedCategoryLabel({ label }: Readonly<{ label: string }>) {
  return <span className="text-sm font-medium text-gray-900">{label}</span>;
}
