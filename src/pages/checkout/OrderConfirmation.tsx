import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { catalogUrl } from '../../routes/routePaths';

interface OrderConfirmationProps {
  orderNumber: string;
}

export function OrderConfirmation({ orderNumber }: Readonly<OrderConfirmationProps>) {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="confirmation-heading" className="mx-auto max-w-lg py-12 text-center">
      <div className="mb-4 text-5xl" aria-hidden="true">🎉</div>
      <h1 id="confirmation-heading" className="text-2xl font-semibold text-gray-900">
        {t('pages.checkout.confirmation.title')}
      </h1>
      <p className="mt-2 text-gray-600">{t('pages.checkout.confirmation.description')}</p>
      <p className="mt-4 rounded-xl border border-neutral/40 bg-primary/10 px-6 py-3 font-mono text-lg font-semibold text-gray-900">
        {orderNumber}
      </p>
      <p className="mt-2 text-sm text-gray-500">{t('pages.checkout.confirmation.followUp')}</p>
      <Link
        to={catalogUrl()}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-2 text-sm font-medium text-gray-900 hover:bg-secondary/80"
      >
        {t('pages.checkout.confirmation.continueShopping')}
      </Link>
    </section>
  );
}

