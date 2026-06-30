import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { TextField } from '../../../common/input/TextField';
import { TextArea } from '../../../common/input/TextArea';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { TagSection } from '../form/TagSection';
import type { CategoryView } from '../../../services/providers/cms/types';
import { updateTags } from '../utils';
import { flattenCategories, getAllDescendantIds, findParentId } from './categoryUtils';
import { findCategory } from '../../catalog/utils';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';
import { DecorativeImage } from '../../../common/DecorativeImage';
import { getCategoryImageUrl } from '../../../utils/image';

export interface AdminCategoryFormProps {
  prevId?: string;
  defaultParentId?: string;
  onClose: () => void;
  onIdChange?: (newId: string) => void;
}

export function AdminCategoryForm({ prevId, defaultParentId, onClose, onIdChange }: Readonly<AdminCategoryFormProps>) {
  const { cms, saveCategory, deleteCategory, editTag } = useAdminModification();

  // Local state: only the ID draft (always) and the parent for the pre-creation phase
  const [idDraft, setIdDraft] = useState(prevId ?? '');
  const [parentDraft, setParentDraft] = useState<string | undefined>(defaultParentId);

  // Derive category and its current parent from CMS
  const category = prevId ? findCategory(cms.categories, prevId) : undefined;
  const savedParentId = prevId ? findParentId(cms.categories, prevId) : undefined;

  // ── helpers (edit mode only) ──────────────────────────────────────────────
  const buildData = (overrides: Partial<Omit<CategoryView, 'children'>> = {}): Omit<CategoryView, 'children'> => ({
    id: prevId!,
    name: category!.name,
    tags: category!.tags,
    ...(category!.description ? { description: category!.description } : {}),
    ...overrides,
  });

  const syncField = (overrides: Partial<Omit<CategoryView, 'children'>>) => {
    saveCategory(prevId!, buildData(overrides), savedParentId);
  };

  // ── ID field ──────────────────────────────────────────────────────────────
  const handleIdBlur = () => {
    const trimmed = idDraft.trim();
    if (!trimmed) return;

    if (category) {
      // edit: rename
      if (trimmed !== prevId) {
        saveCategory(prevId!, buildData({ id: trimmed }), savedParentId);
        onIdChange?.(trimmed);
      }
    } else {
      // create: commit stub to CMS, then transition to edit mode
      saveCategory('', { id: trimmed, name: { fr: '' }, tags: [] }, parentDraft);
      onIdChange?.(trimmed);
    }
  };

  // ── parent field ──────────────────────────────────────────────────────────
  const handleParentChange = (newParentId: string | undefined) => {
    if (category) {
      saveCategory(prevId!, buildData(), newParentId);
    } else {
      setParentDraft(newParentId);
    }
  };

  // ── tags (edit mode) ──────────────────────────────────────────────────────
  const handleToggleTag = (tag: string) => {
    syncField({ tags: updateTags(tag)({ tags: category!.tags } as never).tags });
  };

  const handleAddTag = (localizedText: EditLocalizedText) => {
    editTag(localizedText.id, localizedText);
    syncField({ tags: [...category!.tags, localizedText.id] });
  };

  // ── delete (edit mode only) ───────────────────────────────────────────────
  const handleDelete = () => {
    deleteCategory(prevId!);
    onClose();
  };

  // ── parent options ────────────────────────────────────────────────────────
  const excludedIds = category ? getAllDescendantIds(category) : [];
  const parentOptions = flattenCategories(cms.categories).filter(c => !excludedIds.includes(c.id));

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex-3 space-y-4 rounded-lg border border-bg-200 p-4 h-min">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary-950">
          {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        </h2>
        {category && (
          <button
            type="button"
            className="rounded p-1.5 text-primary-600 hover:bg-primary-50"
            onClick={handleDelete}
            aria-label="Supprimer la catégorie"
            title="Supprimer"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>

      {/* Image + ID + Parent */}
      <div className={category ? 'grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]' : undefined}>
        {category && <DecorativeImage src={getCategoryImageUrl(prevId!)} />}
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <TextField
            label="Identifiant"
            value={idDraft}
            onChange={setIdDraft}
            onBlur={handleIdBlur}
            autoFocus={!category}
          />
          <label className="grid gap-1 text-sm font-medium text-primary-800">
            Parent
            <select
              className="w-full rounded-md border border-bg-300 bg-bg-50 px-3 py-2 text-sm font-normal text-primary-950"
              value={(category ? savedParentId : parentDraft) ?? ''}
              onChange={e => handleParentChange(e.target.value || undefined)}
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
      </div>

      {/* Name / Description / Tags — only once the category exists in CMS */}
      {category && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Nom FR"
              value={category.name.fr}
              onChange={fr => syncField({ name: { fr, en: category.name.en } })}
            />
            <TextField
              label="Nom EN"
              value={category.name.en ?? ''}
              onChange={en => syncField({ name: { fr: category.name.fr, ...(en.trim() ? { en } : {}) } })}
            />
            <TextArea
              label="Description FR"
              value={category.description?.fr ?? ''}
              onChange={fr => syncField({ description: fr.trim() ? { fr, en: category.description?.en } : undefined })}
            />
            <TextArea
              label="Description EN"
              value={category.description?.en ?? ''}
              onChange={en =>
                syncField({
                  description: category.description?.fr
                    ? { fr: category.description.fr, ...(en.trim() ? { en } : {}) }
                    : undefined,
                })
              }
            />
          </div>
          <TagSection selectedTags={category.tags} onToggle={handleToggleTag} onAdd={handleAddTag} />
        </>
      )}
    </div>
  );
}
