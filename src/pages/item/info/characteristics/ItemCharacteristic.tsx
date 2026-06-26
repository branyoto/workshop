import type { ItemCharacteristics } from '../../../../services/providers/cms/types';
import { useTranslation } from 'react-i18next';
import { CatalogFilterChip } from '../../../../common/CatalogFilterChip';

export interface ItemCharacteristicProps {
  value: number | string | string[] | undefined;
  itemKey: keyof ItemCharacteristics;
  filter?: string;
}

export function ItemCharacteristic({ value, itemKey, filter }: Readonly<ItemCharacteristicProps>) {
  const { t } = useTranslation();
  if (!value) return null;
  return (
    <>
      <dt key={`dt-${itemKey}`} className="text-gray-500">
        {t(`pages.item.char.${itemKey}`)}
      </dt>
      <dd key={`dd-${itemKey}`} className="font-medium text-gray-900">
        {typeof value === 'object' ? value.map(v => <CatalogFilterChip key={v} label={v} value={v} filter={filter} />) : value}
      </dd>
    </>
  );
}
