import { useTranslation } from 'react-i18next';
import heroImg from '../../assets/hero.png';
import { Link } from 'react-router';
import { catalogUrl } from '../../routes/routePaths';

export function Banner() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="hero-heading" className="-mx-4 -mt-8 overflow-hidden">
      <div className="relative flex min-h-90 items-center justify-center bg-primary/20">
        <img src={heroImg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 py-12 text-center">
          <h1 id="hero-heading" className="text-4xl font-bold text-gray-900">
            {t('pages.home.tagline')}
          </h1>
          <p className="max-w-md text-lg text-gray-700">{t('pages.home.taglineSubtitle')}</p>
          <Link
            to={catalogUrl()}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent/90"
          >
            {t('pages.home.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
