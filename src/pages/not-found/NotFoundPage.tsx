import { Link } from 'react-router';
import { Button } from '../../common/Button';
import { homeUrl } from '../../routes/routePaths';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="not-found-heading" className="text-center">
      <h1 id="not-found-heading" className="text-3xl font-semibold text-gray-900">
        {t('pages.notFound.title')}
      </h1>
      <p className="mt-2 text-gray-600">{t('pages.notFound.description')}</p>
      <div className="mt-6">
        <Link to={homeUrl()}>
          <Button>{t('pages.notFound.back')}</Button>
        </Link>
      </div>
    </section>
  );
}
