import { useEffect, useState } from 'react';
import { TextField } from '../../../common/input/TextField';
import { TextArea } from '../../../common/input/TextArea';
import { Button } from '../../../common/Button';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { TagSection } from '../form/TagSection';
import type { CategoryView } from '../../../services/providers/cms/types';
import { updateTags } from '../utils';
import { flattenCategories, getAllDescendantIds, findParentId } from './categoryUtils';
import { findCategory } from '../../catalog/utils';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';

export interface AdminCategoryFormProps {
  prevId?: string;
  defaultParentId?: string;
  onClose: () => void;
}

export function AdminCategoryForm({ prevId, defaultParentId, onClose }: Readonly<AdminCategoryFormProps>) {
  const { cms, saveCategory, editTag } = useAdminModification();

  const existing = prevId ? findCategory(cms.categories, prevId) : undefined;

  const [id, setId] = useState(existing?.id ?? '');
  const [nameFr, setNameFr] = useState(existing?.name.fr ?? '');
  const [nameEn, setNameEn] = useState(existing?.name.en ?? '');
  const [descFr, setDescFr] = useState(existing?.description?.fr ?? '');
  const [descEn, setDescEn] = useState(existing?.description?.en ?? '');
  const [tags, setTags] = useState<string[]>(existing?.tags ?? []);
  const [parentId, setParentId] = useState(prevId ? findParentId(cms.categories, prevId) : defaultParentId);

  useEffect(() => {
    const cat = prevId ? findCategory(cms.categories, prevId) : undefined;
    setId(cat?.id ?? '');
    setNameFr(cat?.name.fr ?? '');
    setNameEn(cat?.name.en ?? '');
    setDescFr(cat?.description?.fr ?? '');
    setDescEn(cat?.description?.en ?? '');
    setTags(cat?.tags ?? []);
    setParentId(prevId ? findParentId(cms.categories, prevId) : defaultParentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevId]);

  const canSave = !!id.trim() && !!nameFr.trim();

  const excludedIds: string[] = existing ? getAllDescendantIds(existing) : [];
  const parentOptions = flattenCategories(cms.categories).filter(c => !excludedIds.includes(c.id));

  const handleSave = () => {
    const data: Omit<CategoryView, 'children'> = {
      id: id.trim(),
      name: { fr: nameFr.trim(), ...(nameEn.trim() ? { en: nameEn.trim() } : {}) },
      tags,
      ...(descFr.trim() ? { description: { fr: descFr.trim(), ...(descEn.trim() ? { en: descEn.trim() } : {}) } } : {}),
    };
    saveCategory(prevId ?? '', data, parentId);
    onClose();
  };

  const handleToggleTag = (tag: string) => setTags(prev => updateTags(tag)({ tags: prev } as never).tags);

  const handleAddTag = (localizedText: EditLocalizedText) => {
    editTag(localizedText.id, localizedText);
    setTags(prev => [...prev, localizedText.id]);
  };

  return (
    <form
      className="flex-3 space-y-4 rounded-lg border border-neutral/50 p-4 h-min"
      onSubmit={e => {
        e.preventDefault();
        handleSave();
      }}
    >
      <h2 className="text-base font-semibold text-gray-950">{prevId ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Identifiant" value={id} onChange={setId} autoFocus={!prevId} />
        {/* TODO: generic component for select */}
        <div>
          <label className="grid gap-1 text-sm font-medium text-gray-800">
            Parent
            <select
              className="w-full rounded-md border border-neutral/60 bg-white px-3 py-2 text-sm font-normal text-gray-950"
              value={parentId ?? ''}
              onChange={e => setParentId(e.target.value || undefined)}
            >
              <option value="">— Racine (aucun parent) —</option>
              {parentOptions.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name.fr}
                </option>
              ))}
            </select>
          </label>
        </div>
        <TextField label="Nom FR" value={nameFr} onChange={setNameFr} />
        <TextField label="Nom EN" value={nameEn} onChange={setNameEn} />
        <TextArea label="Description FR" value={descFr} onChange={setDescFr} />
        <TextArea label="Description EN" value={descEn} onChange={setDescEn} />
      </div>

      <TagSection selectedTags={tags} onToggle={handleToggleTag} onAdd={handleAddTag} />

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} type="button">
          Annuler
        </Button>
        <Button type="submit" disabled={!canSave}>
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
