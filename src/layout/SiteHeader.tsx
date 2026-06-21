import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCart } from '../services/providers/cart/useCart';
import { Button } from '../common/Button';
import { catalogUrl, checkoutUrl, contactUrl, homeUrl } from '../routes/routePaths';

export interface SiteHeaderProps {
  onOpenCategoryDrawer: () => void;
  onOpenCartDrawer: () => void;
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

export function SiteHeader({ onOpenCategoryDrawer, onOpenCartDrawer }: Readonly<SiteHeaderProps>) {
  const { t } = useTranslation();
  const { count } = useCart();
  return (
    <header className="border-b border-neutral/50 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="min-h-[44px] min-w-[44px] px-2 py-2"
            onClick={onOpenCategoryDrawer}
            aria-label={t('header.openCategoryMenu')}
          >
            <MenuIcon />
          </Button>
          <Link
            to={homeUrl()}
            className="text-lg font-semibold text-gray-900 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {t('header.brand')}
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          <Link
            to={catalogUrl()}
            className="text-sm font-medium text-gray-700 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {t('header.nav.catalog')}
          </Link>
          <Link
            to={checkoutUrl()}
            className="text-sm font-medium text-gray-700 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {t('header.nav.checkout')}
          </Link>
          <Link
            to={contactUrl()}
            className="text-sm font-medium text-gray-700 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {t('header.nav.contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="relative min-h-[44px] min-w-[44px] px-2 py-2"
            onClick={onOpenCartDrawer}
            aria-label={t('header.openCart')}
            data-testid="header-cart-button"
          >
            <CartIcon />
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
