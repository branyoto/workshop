import type { ItemCharacteristics } from '../../../../services/providers/cms/types';
import { useTranslation } from 'react-i18next';
import { CatalogFilterChip } from '../../../../common/CatalogFilterChip';

export interface ItemCharacteristicProps {
  value: number | string | { id: string; label: string }[] | undefined;
  itemKey: keyof ItemCharacteristics;
  filter?: string;
}

export function ItemCharacteristic({ value, itemKey, filter }: Readonly<ItemCharacteristicProps>) {
  const { t } = useTranslation();
  if (!value) return null;
  return (
    <>
      <dt key={`dt-${itemKey}`} className="text-primary-500">
        {t(`pages.item.char.${itemKey}`)}
      </dt>
      <dd key={`dd-${itemKey}`} className="font-medium text-primary-900">
        {typeof value === 'object' ? value.map(({ id, label }) => <CatalogFilterChip key={id} label={label} value={id} filter={filter} />) : value}
      </dd>
    </>
  );
}
