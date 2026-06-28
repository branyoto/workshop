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
    <header className="border-b border-neutral/50 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Button variant="text" className="min-h-11 min-w-11 px-2 py-2" onClick={onOpenCategoryDrawer} aria-label={t('header.openCategoryMenu')}>
          <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </Button>

        <Link
          to={homeUrl()}
          className="text-lg font-semibold text-gray-900 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {t('header.brand')}
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="text"
            className="relative min-h-[44px] min-w-[44px] px-2 py-2"
            onClick={onOpenCartDrawer}
            aria-label={t('header.openCart')}
            data-testid="header-cart-button"
          >
            <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.75} />
            {count > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white"
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
