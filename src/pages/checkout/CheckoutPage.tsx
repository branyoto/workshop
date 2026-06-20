import { useTranslation } from 'react-i18next';

export function CheckoutPage() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="checkout-heading">
      <h1 id="checkout-heading" className="text-3xl font-semibold text-gray-900">
        {t('pages.checkout.heading')}
      </h1>
      <p className="mt-2 text-gray-600">{t('pages.checkout.description')}</p>
    </section>
  );
}
