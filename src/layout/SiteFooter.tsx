import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { contactUrl } from '../routes/routePaths';

export function SiteFooter() {
  const { t } = useTranslation();

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ];

  const legalLinks = [
    { label: t('footer.cgv'), href: '/legal/cgv' },
    { label: t('footer.cgu'), href: '/legal/cgu' },
  ];

  return (
    <footer className="mt-auto border-t border-neutral/50 bg-primary/20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-gray-900">{t('footer.brand')}</p>
          <p className="mt-2 text-sm text-gray-600">{t('footer.tagline')}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">{t('footer.contact')}</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                to={contactUrl()}
                className="text-sm text-gray-700 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {t('footer.contactUs')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">{t('footer.social')}</p>
          <ul className="mt-2 space-y-1">
            {socialLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-700 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral/50 px-4 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-gray-600 md:flex-row">
          <p>© {new Date().getFullYear()} {t('footer.brand')}</p>
          <ul className="flex flex-wrap items-center gap-4">
            {legalLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
