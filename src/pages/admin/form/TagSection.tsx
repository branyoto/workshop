import { OptionGroup } from '../../../common/input/OptionGroup';
import { CheckboxPill } from '../../../common/input/CheckboxPill';
import { PlusCircle } from 'lucide-react';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useMemo } from 'react';
import { sortOptions } from '../utils';
import { useDisclosure } from '../../../utils/useDisclosure';
import { EditLocalizedValueForm } from './EditLocalizedValueForm';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';
import { AnchoredPopover } from '../../../common/AnchoredPopover';

export interface TagSectionProps {
  selectedTags: string[];
  onToggle: (tag: string) => void;
  onAdd: (tag: EditLocalizedText) => void;
}

export function TagSection({ selectedTags, onToggle, onAdd }: Readonly<TagSectionProps>) {
  const { cms } = useAdminModification();
  const l = useLocalize();
  const { opened, close, setOpened } = useDisclosure();

  const tagOptions = useMemo(() => sortOptions(Object.entries(cms.tags), l), [cms.tags, l]);

  const handleAddTag = (localizedText: EditLocalizedText) => {
    onAdd(localizedText);
    close();
  };

  return (
    <OptionGroup title="Libellé">
      {tagOptions.map(([tag, label]) => (
        <CheckboxPill key={tag} label={l(label)} value={tag} checked={selectedTags.includes(tag)} onChange={() => onToggle(tag)} />
      ))}
      <AnchoredPopover open={opened} onOpenChange={setOpened} anchor={<PlusCircle className="size-9 p-1.5 text-gray-700" />}>
        <EditLocalizedValueForm close={close} onSubmit={handleAddTag} />
      </AnchoredPopover>
    </OptionGroup>
  );
}
