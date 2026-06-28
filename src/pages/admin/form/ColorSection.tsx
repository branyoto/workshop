import { OptionGroup } from '../../../common/input/OptionGroup';
import { CheckboxPill } from '../../../common/input/CheckboxPill';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useMemo } from 'react';
import { sortOptions, updateColors } from '../utils';
import type { Item } from '../../../services/providers/cms/types';
import { AnchoredPopover } from '../../../common/AnchoredPopover';
import { PlusCircle } from 'lucide-react';
import { EditLocalizedValueForm } from './EditLocalizedValueForm';
import { useDisclosure } from '../../../utils/useDisclosure';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';

export interface ColorSectionProps {
  selectedItem: Item;
}

export function ColorSection({ selectedItem }: Readonly<ColorSectionProps>) {
  const { cms, editSelectedItem, editColor } = useAdminModification();
  const l = useLocalize();
  const { opened, close, setOpened } = useDisclosure();

  const colorOptions = useMemo(() => sortOptions(Object.entries(cms.colors), l), [cms.colors, l]);

  const handleAddColor = (localizedText: EditLocalizedText) => {
    editColor(localizedText.id, localizedText);
    editSelectedItem(updateColors(localizedText.id));
    close();
  };

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
      <AnchoredPopover open={opened} onOpenChange={setOpened} anchor={<PlusCircle className="size-9 p-1.5 text-gray-700" />}>
        <EditLocalizedValueForm close={close} onSubmit={handleAddColor} />
      </AnchoredPopover>
    </OptionGroup>
  );
}
