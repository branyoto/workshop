import { EmptyState } from '../../common/EmptyState';
import { useTranslation } from 'react-i18next';

export function CatalogNotFound() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="catalog-heading">
      <h1 id="catalog-heading" className="sr-only">
        {t('pages.catalog.heading')}
      </h1>
      <EmptyState title={t('pages.catalog.notFound.title')} description={t('pages.catalog.notFound.description')} />
    </section>
  );
}
