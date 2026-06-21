import type { Item } from '../../../services/providers/cms/types';
import { ItemCard } from './ItemCard';
import { EmptyState } from '../../../common/EmptyState';
import { useTranslation } from 'react-i18next';

export interface ItemGridProps {
  items: Item[];
}

export function ItemGrid({ items }: Readonly<ItemGridProps>) {
  const { t } = useTranslation();

  if (!items.length) {
    return <EmptyState title={t('pages.catalog.emptyTitle')} description={t('pages.catalog.emptyDescription')} />;
  }
  return (
    <ul data-testid="item-grid" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {items.map(item => (
        <li key={item.id}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  );
}
