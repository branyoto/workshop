import { EmptyState } from '../../common/EmptyState';
import { useTranslation } from 'react-i18next';

export function ItemPageError() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="item-heading">
      <h1 id="item-heading" className="sr-only">
        {t('pages.item.notFound.title')}
      </h1>
      <EmptyState title={t('pages.item.notFound.title')} description={t('pages.item.notFound.description')} />
    </section>
  );
}
