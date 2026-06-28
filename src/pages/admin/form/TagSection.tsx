import { OptionGroup } from '../../../common/input/OptionGroup';
import { CheckboxPill } from '../../../common/input/CheckboxPill';
import { PlusCircle } from 'lucide-react';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useMemo } from 'react';
import { sortOptions, updateTags } from '../utils';
import type { Item } from '../../../services/providers/cms/types';
import { useDisclosure } from '../../../utils/useDisclosure';
import { EditLocalizedValueForm } from './EditLocalizedValueForm';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';
import { AnchoredPopover } from '../../../common/AnchoredPopover';

export interface TagSectionProps {
  selectedItem: Item;
}

export function TagSection({ selectedItem }: Readonly<TagSectionProps>) {
  const { cms, editSelectedItem, editTag } = useAdminModification();
  const l = useLocalize();
  const { opened, close, setOpened } = useDisclosure();

  const tagOptions = useMemo(() => sortOptions(Object.entries(cms.tags), l), [cms.tags, l]);

  const handleAddTag = (localizedText: EditLocalizedText) => {
    editTag(localizedText.id, localizedText);
    editSelectedItem(updateTags(localizedText.id));
    close();
  };

  return (
    <OptionGroup title="Libellé">
      {tagOptions.map(([tag, label]) => (
        <CheckboxPill
          key={tag}
          label={l(label)}
          value={tag}
          checked={selectedItem.tags.includes(tag)}
          onChange={() => editSelectedItem(updateTags(tag))}
        />
      ))}
      <AnchoredPopover open={opened} onOpenChange={setOpened} anchor={<PlusCircle className="size-9 p-1.5 text-gray-700" />}>
        <EditLocalizedValueForm close={close} onSubmit={handleAddTag} />
      </AnchoredPopover>
    </OptionGroup>
  );
}
