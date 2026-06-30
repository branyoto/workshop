import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCms } from '../services/providers/cms/useCms';
import { contactUrl } from '../routes/routePaths';

export function SiteFooter() {
  const { t } = useTranslation();
  const {
    settings: { artistEmail, socialLinks },
    legalLinks,
  } = useCms();

  return (
    <footer className="mt-auto border-t border-bg-200 bg-bg-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-primary-900">{t('footer.brand')}</p>
          <p className="mt-2 text-sm text-primary-600">{t('footer.tagline')}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-primary-900">{t('footer.contact')}</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                to={contactUrl()}
                className="text-sm text-primary-700 hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
              >
                {t('footer.contactUs')}
              </Link>
            </li>
            {artistEmail && (
              <li>
                <a
                  href={`mailto:${artistEmail}`}
                  className="text-sm text-primary-700 hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
                >
                  {artistEmail}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-primary-900">{t('footer.social')}</p>
          <ul className="mt-2 space-y-1">
            {socialLinks.map(link => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.type}
                  className="text-sm capitalize text-primary-700 hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
                >
                  {link.type}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-bg-200 px-4 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-primary-600 md:flex-row">
          <p>
            © {new Date().getFullYear()} {t('footer.brand')}
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            {legalLinks.map(link => (
              <li key={link.key}>
                <a
                  href={link.url}
                  className="hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
                >
                  {t(`footer.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
