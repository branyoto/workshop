import { useTranslation } from 'react-i18next';
import { useLocalize } from '../../services/providers/cms/useLocalize';
import { Link } from 'react-router';
import { useCms } from '../../services/providers/cms/useCms';

export function ContactSection() {
  const { t } = useTranslation();
  const l = useLocalize();
  const { contact } = useCms();

  return (
    <section aria-labelledby="artist-heading" className="rounded-xl bg-primary/10 px-6 py-8">
      <h2 id="artist-heading" className="mb-2 text-xl font-semibold text-gray-900">
        {t('pages.home.artistTeaser')}
      </h2>
      <p className="max-w-prose text-gray-700">
        {l(contact.bio).slice(0, 240)}
        {l(contact.bio).length > 240 ? '…' : ''}
      </p>
      <Link to="/contact" className="mt-4 inline-flex items-center text-sm font-medium text-accent hover:underline">
        {t('pages.home.learnMore')} →
      </Link>
    </section>
  );
}
