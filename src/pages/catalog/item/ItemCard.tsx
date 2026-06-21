import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCart } from '../../../services/providers/cart/useCart';
import { Badge } from '../../../common/Badge';
import { Button } from '../../../common/Button';
import { getThumbnailUrl } from '../../../utils/image';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import type { Item } from '../../../services/providers/cms/types';
import { itemUrl } from '../../../routes/routePaths';

export interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: Readonly<ItemCardProps>) {
  const { t, i18n } = useTranslation();
  const l = useLocalize();
  const { addItem, items: cartItems } = useCart();
  const title = l(item.title);
  const thumbnailUrl = getThumbnailUrl(item.id);
  const priceLabel = new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(item.price);

  const inCart = cartItems.some(ci => ci.id === item.id);

  const handleAddToCart = () => {
    addItem({ id: item.id, titleSnapshot: title, priceSnapshot: item.price, thumbnailUrl });
  };

  return (
    <article
      data-testid="item-card"
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral/50 bg-white shadow-sm transition-shadow hover:shadow-md h-full"
    >
      <Link
        to={itemUrl(item.id)}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        aria-label={title}
      >
        <div className="relative aspect-square overflow-hidden bg-primary/10">
          <img
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <Badge variant="muted" className="text-xs">
                {t('pages.catalog.outOfStock')}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={itemUrl(item.id)}
            className="text-sm font-medium text-gray-900 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
          >
            {title}
          </Link>
          <Badge variant={item.available ? 'success' : 'muted'} className="shrink-0">
            {item.available ? t('pages.catalog.inStock') : t('pages.catalog.outOfStock')}
          </Badge>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gray-900">{priceLabel}</span>
          {item.available && (
            <Button
              variant={inCart ? 'ghost' : 'secondary'}
              className="px-2 py-1 text-xs"
              aria-label={`${t('pages.catalog.addToCart')} — ${title}`}
              data-testid="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={inCart}
            >
              {inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
