import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="home-heading">
      <h1 id="home-heading" className="text-3xl font-semibold text-gray-900">
        {t('pages.home.heading')}
      </h1>
      <p className="mt-2 text-gray-600">{t('pages.home.welcome')}</p>
    </section>
  );
}
