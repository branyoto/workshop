import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCart } from '../services/providers/cart/useCart';
import { Button } from '../common/Button';
import { homeUrl } from '../routes/routePaths';
import cartIcon from '../assets/icons/cart.svg';
import menuIcon from '../assets/icons/menu.svg';

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
        <Button
          variant="ghost"
          className="min-h-[44px] min-w-[44px] px-2 py-2"
          onClick={onOpenCategoryDrawer}
          aria-label={t('header.openCategoryMenu')}
        >
          <img className="size-5" src={menuIcon} alt="" />
        </Button>

        <Link
          to={homeUrl()}
          className="text-lg font-semibold text-gray-900 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {t('header.brand')}
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="relative min-h-[44px] min-w-[44px] px-2 py-2"
            onClick={onOpenCartDrawer}
            aria-label={t('header.openCart')}
            data-testid="header-cart-button"
          >
            <img className="size-5" src={cartIcon} alt="" />
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
