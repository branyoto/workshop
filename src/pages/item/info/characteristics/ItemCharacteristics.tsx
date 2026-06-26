import type { Item } from '../../../../services/providers/cms/types';
import { ItemCharacteristic } from './ItemCharacteristic';
import { useTranslation } from 'react-i18next';
import { useCms } from '../../../../services/providers/cms/useCms';
import { useLocalize } from '../../../../services/providers/cms/useLocalize';

export interface ItemCharacteristicsProps {
  item: Item;
}

export function ItemCharacteristics({ item }: Readonly<ItemCharacteristicsProps>) {
  const { t } = useTranslation();
  const l = useLocalize();
  const { colors } = useCms();

  if (!item.characteristics || !Object.keys(item.characteristics).length) return null;

  return (
    <div className="rounded-xl border border-neutral/40 p-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-900">{t('pages.item.characteristics')}</h3>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <ItemCharacteristic value={item.characteristics?.dimension} itemKey="dimension" />
        <ItemCharacteristic value={item.characteristics?.material} itemKey="material" />
        <ItemCharacteristic value={item.characteristics?.weight} itemKey="weight" />
        <ItemCharacteristic value={item.characteristics?.colors?.map(c => l(colors[c]))} itemKey="colors" filter="color" />
      </dl>
    </div>
  );
}
