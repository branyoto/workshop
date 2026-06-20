import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export function CatalogPage() {
  const { t } = useTranslation();
  const { categoryId, subcategoryId, subId } = useParams();

  const segments = [categoryId, subcategoryId, subId].filter(Boolean);
  const pathLabel = segments.length > 0 ? segments.join(' / ') : t('pages.catalog.allItems');

  return (
    <section aria-labelledby="catalog-heading">
      <h1 id="catalog-heading" className="text-3xl font-semibold text-gray-900">
        {t('pages.catalog.heading')}
      </h1>
      <p className="mt-2 text-gray-600">{pathLabel}</p>
    </section>
  );
}
