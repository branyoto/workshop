import { EmptyState } from '../../common/EmptyState';
import { Link } from 'react-router';
import { catalogUrl } from '../../routes/routePaths';
import { useTranslation } from 'react-i18next';

export interface EmptyCartProps {
  onClose: () => void;
}

export function EmptyCart({ onClose }: Readonly<EmptyCartProps>) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <EmptyState title={t('pages.cart.empty.title')} description={t('pages.cart.empty.description')} />
      <Link
        to={catalogUrl()}
        onClick={onClose}
        className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-secondary/80"
      >
        {t('pages.cart.empty.browseCatalog')}
      </Link>
    </div>
  );
}
