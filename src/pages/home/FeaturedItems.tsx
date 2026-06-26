import { useLocalize } from '../../services/providers/cms/useLocalize';
import { useCms } from '../../services/providers/cms/useCms';
import { useMemo } from 'react';
import { notNull } from '../../utils/commonFilter';
import { categoryUrl, itemUrl } from '../../routes/routePaths';
import { getProductImageUrl } from '../../utils/image';
import { FeaturedElements } from './FeaturedElements';
import { Link } from 'react-router';
import { Button } from '../../common/Button';
import type { Item } from '../../services/providers/cms/types';
import { useCart } from '../../services/providers/cart/useCart';
import { useFormatPrice } from '../../services/i18n/formatPrice';
import { useTranslation } from 'react-i18next';
import { FEATURED_ITEMS_CATEGORY_ID } from '../catalog/utils';

export function FeaturedItems() {
  const { items, featuredItemIds } = useCms();

  const featuredCategories = useMemo(
    () =>
      featuredItemIds
        .map(id => items.find(c => c.id === id))
        .filter(notNull)
        .map(item => ({ id: item.id, label: <FeaturedItemLabel item={item} />, href: itemUrl(item.id), imageUrl: getProductImageUrl(item.id) })),
    [items, featuredItemIds],
  );

  return <FeaturedElements titleKey="pages.home.featured" titleHref={categoryUrl(FEATURED_ITEMS_CATEGORY_ID)} elements={featuredCategories} />;
}

function FeaturedItemLabel({ item }: Readonly<{ item: Item }>) {
  const { t } = useTranslation();
  const l = useLocalize();
  const { addItem, items } = useCart();
  const formatPrice = useFormatPrice();

  const inCart = items.some(ci => ci.id === item.id);

  return (
    <div className="flex flex-1 flex-col gap-2 p-3">
      <Link
        to={itemUrl(item.id)}
        className="text-sm font-medium text-gray-900 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
      >
        {l(item.title)}
      </Link>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
        {item.available && (
          <Button
            variant={inCart ? 'ghost' : 'secondary'}
            className="px-2 py-1 text-xs"
            disabled={inCart}
            onClick={() => addItem({ id: item.id, titleSnapshot: l(item.title), priceSnapshot: item.price })}
          >
            {inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
          </Button>
        )}
      </div>
    </div>
  );
}
