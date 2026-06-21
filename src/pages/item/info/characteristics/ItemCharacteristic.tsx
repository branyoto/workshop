import type { Item, ItemCharacteristics } from '../../../../services/providers/cms/types';
import { useTranslation } from 'react-i18next';
import { CatalogFilterChip } from '../../../../common/CatalogFilterChip';
import { useLocalize } from '../../../../services/providers/cms/useLocalize';

export interface ItemCharacteristicProps {
  item: Item;
  itemKey: keyof ItemCharacteristics;
}

export function ItemCharacteristic({ item, itemKey }: Readonly<ItemCharacteristicProps>) {
  const { t } = useTranslation();
  const l = useLocalize();
  const characteristic = item.characteristics?.[itemKey];
  if (!characteristic) return null;
  return (
    <>
      <dt key={`dt-${itemKey}`} className="text-gray-500">
        {t(`pages.item.char.${itemKey}`)}
      </dt>
      <dd key={`dd-${itemKey}`} className="font-medium text-gray-900">
        {typeof characteristic === 'object' ?
          characteristic.map(c => {
            const localizedColor = l(c);
            return <CatalogFilterChip key={localizedColor} label={localizedColor} value={localizedColor} filter="color" />;
          })
        : characteristic}
      </dd>
    </>
  );
}
