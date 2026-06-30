import type { Item } from '../../../../services/providers/cms/types';
import { ItemCharacteristic } from './ItemCharacteristic';
import { useTranslation } from 'react-i18next';
import { useCms } from '../../../../services/providers/cms/useCms';
import { useLocalize } from '../../../../services/providers/cms/useLocalize';
import { excludeArrayCharacs } from '../../../../utils/excludeArrayCharacs';

export interface ItemCharacteristicsProps {
  item: Item;
}

export function ItemCharacteristics({ item }: Readonly<ItemCharacteristicsProps>) {
  const { t } = useTranslation();
  const l = useLocalize();
  const { colors } = useCms();

  if (!item.characteristics || !Object.keys(item.characteristics).length) return null;

  return (
    <div className="rounded-xl border border-bg-200 p-4">
      <h3 className="mb-2 text-sm font-semibold text-primary-900">{t('pages.item.characteristics')}</h3>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        {excludeArrayCharacs(item).map(([key, value]) => (
          <ItemCharacteristic key={key} value={value} itemKey={key} />
        ))}
        <ItemCharacteristic value={item.characteristics?.colors?.map(c => ({ id: c, label: l(colors[c]) }))} itemKey="colors" filter="colors" />
      </dl>
    </div>
  );
}
