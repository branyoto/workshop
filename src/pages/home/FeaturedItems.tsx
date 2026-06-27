import { useCms } from '../../services/providers/cms/useCms';
import { useMemo } from 'react';
import { notNull } from '../../utils/commonFilter';
import { catalogUrl, itemUrl } from '../../routes/routePaths';
import { getProductImageUrl } from '../../utils/image';
import { FeaturedElements } from './FeaturedElements';
import { ElementCardLabel } from '../../common/ElementCardLabel';

export function FeaturedItems() {
  const { items, featuredItemIds } = useCms();

  const featuredCategories = useMemo(
    () =>
      featuredItemIds
        .map(id => items.find(c => c.id === id))
        .filter(notNull)
        .map(item => ({ id: item.id, label: <ElementCardLabel item={item} />, href: itemUrl(item.id), imageUrl: getProductImageUrl(item.id) })),
    [items, featuredItemIds],
  );

  return <FeaturedElements titleKey="pages.home.featured" titleHref={catalogUrl() + '?featured=true'} elements={featuredCategories} />;
}
