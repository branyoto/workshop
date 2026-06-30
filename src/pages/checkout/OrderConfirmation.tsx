import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { catalogUrl } from '../../routes/routePaths';

interface OrderConfirmationProps {
  orderNumber: string;
}

export function OrderConfirmation({ orderNumber }: Readonly<OrderConfirmationProps>) {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="confirmation-heading" data-testid="order-confirmation" className="mx-auto max-w-lg py-12 text-center">
      <div className="mb-4 text-5xl" aria-hidden="true">
        🎉
      </div>
      <h1 id="confirmation-heading" className="text-2xl font-semibold text-primary-900">
        {t('pages.checkout.confirmation.title')}
      </h1>
      <p className="mt-2 text-primary-600">{t('pages.checkout.confirmation.description')}</p>
      <p
        data-testid="order-number"
        className="mt-4 rounded-xl border border-bg-200 bg-bg-50 px-6 py-3 font-mono text-lg font-semibold text-primary-900"
      >
        {orderNumber}
      </p>
      <p className="mt-2 text-sm text-primary-500">{t('pages.checkout.confirmation.followUp')}</p>
      <Link
        to={catalogUrl()}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-secondary-300 px-6 py-2 text-sm font-medium text-primary-900 hover:bg-secondary-400"
      >
        {t('pages.checkout.confirmation.continueShopping')}
      </Link>
    </section>
  );
}
