import { useTranslation } from 'react-i18next';

export function ContactPage() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="contact-heading">
      <h1 id="contact-heading" className="text-3xl font-semibold text-gray-900">
        {t('pages.contact.heading')}
      </h1>
      <p className="mt-2 text-gray-600">{t('pages.contact.description')}</p>
    </section>
  );
}
