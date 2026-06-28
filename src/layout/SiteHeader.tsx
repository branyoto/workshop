import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Menu, ShoppingBag } from 'lucide-react';
import { useCart } from '../services/providers/cart/useCart';
import { Button } from '../common/Button';
import { homeUrl } from '../routes/routePaths';

export interface SiteHeaderProps {
  onOpenCategoryDrawer: () => void;
  onOpenCartDrawer: () => void;
}

export function SiteHeader({ onOpenCategoryDrawer, onOpenCartDrawer }: Readonly<SiteHeaderProps>) {
  const { t } = useTranslation();
  const { count } = useCart();
  return (
    <header className="border-b border-bg-100 bg-secondary-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Button variant="text" className="min-h-11 min-w-11 px-2 py-2" onClick={onOpenCategoryDrawer} aria-label={t('header.openCategoryMenu')}>
          <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </Button>

        <Link
          to={homeUrl()}
          className="text-2xl font-semibold text-primary-700 hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-100/50 focus-visible:ring-offset-2 rounded-lg"
        >
          {t('header.brand')}
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="text"
            className="relative min-h-11 min-w-11 px-2 py-2"
            onClick={onOpenCartDrawer}
            aria-label={t('header.openCart')}
            data-testid="header-cart-button"
          >
            <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.75} />
            {count > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-300 text-[10px] font-bold text-white"
                aria-hidden="true"
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
