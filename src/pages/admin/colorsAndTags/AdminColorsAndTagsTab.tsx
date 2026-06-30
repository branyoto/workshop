import { useState } from 'react';
import { Check, Pencil, Trash2, X, PlusCircle } from 'lucide-react';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { TextField } from '../../../common/input/TextField';
import { Button } from '../../../common/Button';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';
import { AnchoredPopover } from '../../../common/AnchoredPopover';
import { EditLocalizedValueForm } from '../form/EditLocalizedValueForm';
import { useDisclosure } from '../../../utils/useDisclosure';

interface EditableEntryProps {
  entryKey: string;
  fr: string;
  en: string | undefined;
  onSave: (prevKey: string, data: EditLocalizedText) => void;
  onDelete: (key: string) => void;
}

function EditableEntry({ entryKey, fr, en, onSave, onDelete }: Readonly<EditableEntryProps>) {
  const [editing, setEditing] = useState(false);
  const [editKey, setEditKey] = useState(entryKey);
  const [editFr, setEditFr] = useState(fr);
  const [editEn, setEditEn] = useState(en ?? '');

  const handleSave = () => {
    if (!editKey.trim() || !editFr.trim()) return;
    onSave(entryKey, { id: editKey.trim(), value: { fr: editFr.trim(), ...(editEn.trim() ? { en: editEn.trim() } : {}) } });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditKey(entryKey);
    setEditFr(fr);
    setEditEn(en ?? '');
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end rounded-md bg-neutral/10 p-2">
        <TextField label="Clé" value={editKey} onChange={setEditKey} autoFocus />
        <TextField label="FR" value={editFr} onChange={setEditFr} />
        <TextField label="EN" value={editEn} onChange={setEditEn} />
        <div className="flex gap-1 pb-1">
          <button
            type="button"
            className="rounded p-1.5 text-green-600 hover:bg-green-50 disabled:opacity-40"
            disabled={!editKey.trim() || !editFr.trim()}
            onClick={handleSave}
            aria-label="Confirmer"
          >
            <Check className="size-4" />
          </button>
          <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-neutral/30" onClick={handleCancel} aria-label="Annuler">
            <X className="size-4" />
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-neutral/10">
      <span className="w-32 shrink-0 truncate font-mono text-xs text-gray-500">{entryKey}</span>
      <span className="flex-1 truncate font-medium text-gray-900">{fr}</span>
      {en && <span className="truncate text-gray-500">{en}</span>}
      <span className="hidden items-center gap-1 group-hover:flex">
        <button
          type="button"
          className="rounded p-1 text-gray-400 hover:bg-neutral/30 hover:text-gray-700"
          onClick={() => setEditing(true)}
          aria-label="Modifier"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(entryKey)}
          aria-label="Supprimer"
        >
          <Trash2 className="size-3.5" />
        </button>
      </span>
    </li>
  );
}

interface GlossarySectionProps {
  title: string;
  entries: [string, { fr: string; en?: string }][];
  onSave: (prevKey: string, data: EditLocalizedText) => void;
  onDelete: (key: string) => void;
  onAdd: (data: EditLocalizedText) => void;
}

function GlossarySection({ title, entries, onSave, onDelete, onAdd }: Readonly<GlossarySectionProps>) {
  const { opened, close, setOpened } = useDisclosure();
  const sortedEntries = [...entries].sort((a, b) => a[1].fr.localeCompare(b[1].fr));

  return (
    <div className="rounded-lg border border-neutral/50 bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-950">{title}</h3>
        <AnchoredPopover
          open={opened}
          onOpenChange={setOpened}
          anchor={
            <Button variant="text" className="px-2 py-1 text-xs">
              <PlusCircle className="size-3.5" />
              Ajouter
            </Button>
          }
        >
          <EditLocalizedValueForm
            close={close}
            onSubmit={data => {
              onAdd(data);
              close();
            }}
          />
        </AnchoredPopover>
      </div>
      {sortedEntries.length === 0 && <p className="text-sm text-gray-400">Aucune entrée.</p>}
      <ul className="space-y-1">
        {sortedEntries.map(([key, value]) => (
          <EditableEntry key={key} entryKey={key} fr={value.fr} en={value.en} onSave={onSave} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export function AdminColorsAndTagsTab() {
  const { cms, editColor, deleteColor, editTag, deleteTag } = useAdminModification();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <GlossarySection
        title="Couleurs"
        entries={Object.entries(cms.colors)}
        onSave={(prevKey, data) => editColor(prevKey, data)}
        onDelete={deleteColor}
        onAdd={data => editColor(data.id, data)}
      />
      <GlossarySection
        title="Libellés"
        entries={Object.entries(cms.tags)}
        onSave={(prevKey, data) => editTag(prevKey, data)}
        onDelete={deleteTag}
        onAdd={data => editTag(data.id, data)}
      />
    </div>
  );
}
