import { Check, Copy, Download } from 'lucide-react';
import { type ChangeEvent, type ReactNode, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../common/Button';
import type { CmsContent, Item, ItemCharacteristics, LocalizedText } from '../../services/providers/cms/types';
import { useCms } from '../../services/providers/cms/useCms';
import { useLocalize } from '../../services/providers/cms/useLocalize';
import { getProductImageUrl } from '../../utils/image';
import { AdminItemList } from './list/AdminItemList';

type DraftItemField = 'title' | 'description';
type CharacteristicsField = Exclude<keyof ItemCharacteristics, 'colors'>;
type SaveState = 'idle' | 'copied' | 'downloaded';

function cloneCms(cms: CmsContent): CmsContent {
  return structuredClone(cms);
}

function normalizeLocalizedText(value: LocalizedText | undefined, locale: keyof LocalizedText, nextValue: string): LocalizedText | undefined {
  const next = { ...(value ?? { fr: '' }), [locale]: nextValue };
  if (!next.fr.trim() && !next.en?.trim()) return undefined;
  return next;
}

function normalizeCharacteristics(value: ItemCharacteristics): ItemCharacteristics | undefined {
  const next: ItemCharacteristics = {};
  if (value.dimension?.trim()) next.dimension = value.dimension;
  if (value.material?.trim()) next.material = value.material;
  if (value.weight?.trim()) next.weight = value.weight;
  if (value.colors?.length) next.colors = value.colors;
  return Object.keys(next).length ? next : undefined;
}

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter(item => item !== value) : [...values, value];
}

function sortOptions(entries: [string, LocalizedText][], l: (text: LocalizedText) => string): [string, LocalizedText][] {
  return [...entries].sort((a, b) => l(a[1]).localeCompare(l(b[1])));
}

export function AdminPage() {
  const cms = useCms();
  const l = useLocalize();
  const [draft, setDraft] = useState(() => cloneCms(cms));
  const [selectedItemId, setSelectedItemId] = useState(() => cms.items[0]?.id ?? '');
  const [saveState, setSaveState] = useState<SaveState>('idle');

  const selectedItem = draft.items.find(item => item.id === selectedItemId) ?? draft.items[0];
  const tagOptions = useMemo(() => sortOptions(Object.entries(draft.tags), l), [draft.tags, l]);
  const colorOptions = useMemo(() => sortOptions(Object.entries(draft.colors), l), [draft.colors, l]);

  const exportedJson = useMemo(() => JSON.stringify(draft, null, 2), [draft]);

  function updateSelectedItem(updater: (item: Item) => Item) {
    if (!selectedItem) return;
    setSaveState('idle');
    setDraft(current => ({ ...current, items: current.items.map(item => (item.id === selectedItem.id ? updater(item) : item)) }));
  }

  function updateLocalizedField(field: DraftItemField, locale: keyof LocalizedText, value: string) {
    updateSelectedItem(item => {
      const nextValue = normalizeLocalizedText(item[field], locale, value);
      if (field === 'title') return { ...item, title: nextValue ?? { fr: '' } };
      return nextValue ? { ...item, description: nextValue } : { ...item, description: undefined };
    });
  }

  function updateCharacteristic(field: CharacteristicsField, value: string) {
    updateSelectedItem(item => {
      const nextCharacteristics = normalizeCharacteristics({ ...(item.characteristics ?? {}), [field]: value });
      return { ...item, characteristics: nextCharacteristics };
    });
  }

  function toggleTag(tag: string) {
    updateSelectedItem(item => ({ ...item, tags: toggleValue(item.tags, tag) }));
  }

  function toggleColor(color: string) {
    updateSelectedItem(item => {
      const nextColors = toggleValue(item.characteristics?.colors ?? [], color);
      const nextCharacteristics = normalizeCharacteristics({ ...(item.characteristics ?? {}), colors: nextColors });
      return { ...item, characteristics: nextCharacteristics };
    });
  }

  function updatePrice(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    updateSelectedItem(item => ({ ...item, price: Number.isNaN(value) ? 0 : value }));
  }

  async function copyJson() {
    await navigator.clipboard.writeText(exportedJson);
    setSaveState('copied');
  }

  function downloadJson() {
    const blob = new Blob([exportedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cms.json';
    link.click();
    URL.revokeObjectURL(url);
    setSaveState('downloaded');
  }

  if (!selectedItem) {
    return <p className="text-sm text-gray-600">No catalog items found.</p>;
  }

  return (
    <section className="space-y-6" aria-labelledby="admin-heading">
      <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Admin</p>
          <h1 id="admin-heading" className="mt-1 text-3xl font-semibold text-gray-950">
            Catalog editor
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => void copyJson()}>
            {saveState === 'copied' ?
              <Check className="size-4" aria-hidden="true" />
            : <Copy className="size-4" aria-hidden="true" />}
            Copy JSON
          </Button>
          <Button onClick={downloadJson}>
            {saveState === 'downloaded' ?
              <Check className="size-4" aria-hidden="true" />
            : <Download className="size-4" aria-hidden="true" />}
            Download cms.json
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <AdminItemList selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} />

        <form className="flex-3 space-y-6 rounded-lg border border-neutral/50 p-4 h-min" onSubmit={event => event.preventDefault()}>
          <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
            <img src={getProductImageUrl(selectedItem.id)} alt="" className="aspect-square w-full rounded-lg object-cover" />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="ID" value={selectedItem.id} disabled />
              <TextField label="Price" type="number" min={0} step="0.01" value={selectedItem.price} onChange={updatePrice} />
              <TextField label="Title FR" value={selectedItem.title.fr} onChange={event => updateLocalizedField('title', 'fr', event.target.value)} />
              <TextField
                label="Title EN"
                value={selectedItem.title.en ?? ''}
                onChange={event => updateLocalizedField('title', 'en', event.target.value)}
              />
              <label className="flex items-center gap-2 self-end text-sm font-medium text-gray-800">
                <input
                  type="checkbox"
                  checked={selectedItem.available}
                  onChange={event => updateSelectedItem(item => ({ ...item, available: event.target.checked }))}
                  className="size-4 accent-accent"
                />
                Available
              </label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextArea
              label="Description FR"
              value={selectedItem.description?.fr ?? ''}
              onChange={event => updateLocalizedField('description', 'fr', event.target.value)}
            />
            <TextArea
              label="Description EN"
              value={selectedItem.description?.en ?? ''}
              onChange={event => updateLocalizedField('description', 'en', event.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <TextField
              label="Dimensions"
              value={selectedItem.characteristics?.dimension ?? ''}
              onChange={event => updateCharacteristic('dimension', event.target.value)}
            />
            <TextField
              label="Material"
              value={selectedItem.characteristics?.material ?? ''}
              onChange={event => updateCharacteristic('material', event.target.value)}
            />
            <TextField
              label="Weight"
              value={selectedItem.characteristics?.weight ?? ''}
              onChange={event => updateCharacteristic('weight', event.target.value)}
            />
          </div>

          <OptionGroup title="Tags">
            {tagOptions.map(([tag, label]) => (
              <CheckboxPill key={tag} label={l(label)} value={tag} checked={selectedItem.tags.includes(tag)} onChange={() => toggleTag(tag)} />
            ))}
          </OptionGroup>

          <OptionGroup title="Colors">
            {colorOptions.map(([color, label]) => (
              <CheckboxPill
                key={color}
                label={l(label)}
                value={color}
                checked={selectedItem.characteristics?.colors?.includes(color) ?? false}
                onChange={() => toggleColor(color)}
              />
            ))}
          </OptionGroup>
        </form>
      </div>
    </section>
  );
}

interface TextFieldProps {
  label: string;
  value: string | number;
  disabled?: boolean;
  type?: string;
  min?: number;
  step?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ label, value, disabled, type = 'text', min, step, onChange }: Readonly<TextFieldProps>) {
  return (
    <label className="grid gap-1 text-sm font-medium text-gray-800">
      {label}
      <input
        className="w-full rounded-md border border-neutral/60 bg-white px-3 py-2 text-sm font-normal text-gray-950 disabled:bg-gray-100 disabled:text-gray-500"
        value={value}
        disabled={disabled}
        type={type}
        min={min}
        step={step}
        onChange={onChange}
      />
    </label>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ label, value, onChange }: Readonly<TextAreaProps>) {
  return (
    <label className="grid gap-1 text-sm font-medium text-gray-800">
      {label}
      <textarea
        className="min-h-32 w-full resize-y rounded-md border border-neutral/60 bg-white px-3 py-2 text-sm font-normal text-gray-950"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

interface OptionGroupProps {
  title: string;
  children: ReactNode;
}

function OptionGroup({ title, children }: Readonly<OptionGroupProps>) {
  return (
    <fieldset className="rounded-lg border border-neutral/50 p-4">
      <legend className="px-1 text-sm font-semibold text-gray-950">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

interface CheckboxPillProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

function CheckboxPill({ label, value, checked, onChange }: Readonly<CheckboxPillProps>) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
        checked ? 'border-accent bg-accent/10 text-gray-950' : 'border-neutral/50 text-gray-700 hover:bg-neutral/20',
      )}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-accent" />
      <span>{label}</span>
      <span className="text-xs text-gray-500">{value}</span>
    </label>
  );
}
