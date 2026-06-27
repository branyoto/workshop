import { useTranslation } from 'react-i18next';
import { Badge } from '../../../common/Badge';
import { getProductImageUrl } from '../../../utils/image';
import type { Item } from '../../../services/providers/cms/types';
import { itemUrl } from '../../../routes/routePaths';
import { ElementCard } from '../../../common/ElementCard';
import { ElementCardLabel } from '../../../common/ElementCardLabel';

export interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: Readonly<ItemCardProps>) {
  const { t } = useTranslation();

  return (
    <ElementCard
      href={itemUrl(item.id)}
      imageUrl={getProductImageUrl(item.id)}
      label={<ElementCardLabel item={item} />}
      imageBadge={
        !item.available && (
          <Badge variant="muted" className="text-xs">
            {t('pages.catalog.outOfStock')}
          </Badge>
        )
      }
    />
  );
}
