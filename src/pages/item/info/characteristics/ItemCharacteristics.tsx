import type { Item } from '../../../../services/providers/cms/types';
import { ItemCharacteristic } from './ItemCharacteristic';
import { useTranslation } from 'react-i18next';

export interface ItemCharacteristicsProps {
  item: Item;
}

export function ItemCharacteristics({ item }: Readonly<ItemCharacteristicsProps>) {
  const { t } = useTranslation();
  if (!item.characteristics || !Object.keys(item.characteristics).length) return null;
  return (
    <div className="rounded-xl border border-neutral/40 p-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-900">{t('pages.item.characteristics')}</h3>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <ItemCharacteristic item={item} itemKey="dimension" />
        <ItemCharacteristic item={item} itemKey="material" />
        <ItemCharacteristic item={item} itemKey="weight" />
        <ItemCharacteristic item={item} itemKey="colors" />
      </dl>
    </div>
  );
}
