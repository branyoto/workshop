import { CategoryBanner } from './CategoryBanner';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '../../services/providers/cms/useLocalize';
import type { CategoryView } from '../../services/providers/cms/types';
import { useMemo } from 'react';

export interface CategoryHeaderProps {
  category?: CategoryView | null;
}

export function CategoryHeader({ category }: Readonly<CategoryHeaderProps>) {
  const { t } = useTranslation();
  const l = useLocalize();

  const heading = useMemo(() => (category ? l(category.name) : t('pages.catalog.heading')), [category, l, t]);

  return (
    <>
      {category && <CategoryBanner categoryId={category.id} alt={heading} />}
      <h1 id="catalog-heading" className="text-3xl font-semibold text-primary-900">
        {category ? l(category.name) : t('pages.catalog.heading')}
      </h1>
      {category?.description && <p className="mt-1 text-sm text-primary-600">{l(category.description)}</p>}
    </>
  );
}
