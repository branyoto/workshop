import { useLocalize } from '../../services/providers/cms/useLocalize';
import { useCms } from '../../services/providers/cms/useCms';
import { useMemo } from 'react';
import { FeaturedElements } from './FeaturedElements';
import { notNull } from '../../utils/commonFilter';
import { categoryUrl } from '../../routes/routePaths';
import { getCategoryImageUrl } from '../../utils/image';

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

  return <FeaturedElements titleKey="pages.home.categories" elements={featuredCategories} />;
}

function FeaturedCategoryLabel({ label }: Readonly<{ label: string }>) {
  return <span className="text-sm font-medium text-gray-900">{label}</span>;
}
