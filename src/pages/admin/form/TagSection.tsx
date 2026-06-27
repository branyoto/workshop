import { OptionGroup } from '../../../common/input/OptionGroup';
import { CheckboxPill } from '../../../common/input/CheckboxPill';
import { PlusCircle } from 'lucide-react';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useMemo } from 'react';
import { sortOptions, updateTags } from '../utils';
import type { Item } from '../../../services/providers/cms/types';

export interface TagSectionProps {
  selectedItem: Item;
}

export function TagSection({ selectedItem }: Readonly<TagSectionProps>) {
  const { cms, editSelectedItem } = useAdminModification();
  const l = useLocalize();

  const tagOptions = useMemo(() => sortOptions(Object.entries(cms.tags), l), [cms.tags, l]);

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
      <button className="size-9 p-1.5 text-sm cursor-pointer rounded-full text-gray-700 hover:bg-neutral/20">
        <PlusCircle />
      </button>
    </OptionGroup>
  );
}
