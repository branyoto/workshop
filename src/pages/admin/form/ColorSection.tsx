import { OptionGroup } from '../../../common/input/OptionGroup';
import { CheckboxPill } from '../../../common/input/CheckboxPill';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useMemo } from 'react';
import { sortOptions, updateColors } from '../utils';
import type { Item } from '../../../services/providers/cms/types';

export interface ColorSectionProps {
  selectedItem: Item;
}

export function ColorSection({ selectedItem }: Readonly<ColorSectionProps>) {
  const { cms, editSelectedItem } = useAdminModification();
  const l = useLocalize();

  const colorOptions = useMemo(() => sortOptions(Object.entries(cms.colors), l), [cms.colors, l]);

  return (
    <OptionGroup title="Couleurs">
      {colorOptions.map(([color, label]) => (
        <CheckboxPill
          key={color}
          label={l(label)}
          value={color}
          checked={selectedItem.characteristics?.colors?.includes(color) ?? false}
          onChange={() => editSelectedItem(updateColors(color))}
        />
      ))}
    </OptionGroup>
  );
}
