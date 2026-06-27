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

export interface TagSectionProps {
  selectedItem: Item;
}

export function TagSection({ selectedItem }: Readonly<TagSectionProps>) {
  const { cms, editSelectedItem, editTag } = useAdminModification();
  const l = useLocalize();
  const { opened, close, toggle } = useDisclosure();

  const tagOptions = useMemo(() => sortOptions(Object.entries(cms.tags), l), [cms.tags, l]);

  const handleAddTag = (localizedText: EditLocalizedText) => {
    editTag(localizedText.id, localizedText);
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
      <div className="relative">
        <button
          type="button"
          className="size-9 p-1.5 text-sm cursor-pointer rounded-full text-gray-700 hover:bg-neutral/20"
          aria-expanded={opened}
          aria-label="Ajouter un libellé"
          onClick={toggle}
        >
          <PlusCircle />
        </button>
        {opened ?
          <EditLocalizedValueForm close={close} onSubmit={handleAddTag} />
        : null}
      </div>
    </OptionGroup>
  );
}
