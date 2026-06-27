import { TextField } from '../../../common/input/TextField';
import { getProductImageUrl } from '../../../utils/image';
import { Checkbox } from '../../../common/input/Checkbox';
import { TextArea } from '../../../common/input/TextArea';
import { OptionGroup } from '../../../common/input/OptionGroup';
import { CheckboxPill } from '../../../common/input/CheckboxPill';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useMemo } from 'react';
import type { Item, ItemCharacteristics, LocalizedText } from '../../../services/providers/cms/types';
import { useAdminModification } from '../utils/useAdminModification';

type DraftItemField = 'title' | 'description';
type CharacteristicsField = Exclude<keyof ItemCharacteristics, 'colors'>;

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

export function AdminItemForm() {
  const { setState, selectedItemId, value, hydrate } = useAdminModification();
  const l = useLocalize();

  const selectedItem = value.items.find(item => item.id === selectedItemId);
  const tagOptions = useMemo(() => sortOptions(Object.entries(value.tags), l), [value.tags, l]);
  const colorOptions = useMemo(() => sortOptions(Object.entries(value.colors), l), [value.colors, l]);

  function updateSelectedItem(updater: (item: Item) => Item) {
    if (!selectedItem) return;
    setState('idle');
    hydrate(current => ({ ...current, items: current.items.map(item => (item.id === selectedItem.id ? updater(item) : item)) }));
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

  function updatePrice(inputValue: string) {
    const value = Number(inputValue);
    updateSelectedItem(item => ({ ...item, price: Number.isNaN(value) ? 0 : value }));
  }

  if (!selectedItem)
    return (
      <form className="flex-3 space-y-6 rounded-lg border border-neutral/50 p-4 h-min" onSubmit={event => event.preventDefault()}>
        Not found
      </form>
    );

  return (
    <form className="flex-3 space-y-6 rounded-lg border border-neutral/50 p-4 h-min" onSubmit={event => event.preventDefault()}>
      <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
        <img src={getProductImageUrl(selectedItem.id)} alt="" className="aspect-square w-full rounded-lg object-cover" />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="ID" value={selectedItem.id} disabled />
          <TextField label="Price" type="number" min={0} step="0.01" value={selectedItem.price} onChange={updatePrice} />
          <TextField label="Title FR" value={selectedItem.title.fr} onChange={value => updateLocalizedField('title', 'fr', value)} />
          <TextField label="Title EN" value={selectedItem.title.en ?? ''} onChange={value => updateLocalizedField('title', 'en', value)} />
          <Checkbox label="Available" checked={selectedItem.available} onChange={available => updateSelectedItem(item => ({ ...item, available }))} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextArea
          label="Description FR"
          value={selectedItem.description?.fr ?? ''}
          onChange={value => updateLocalizedField('description', 'fr', value)}
        />
        <TextArea
          label="Description EN"
          value={selectedItem.description?.en ?? ''}
          onChange={value => updateLocalizedField('description', 'en', value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <TextField
          label="Dimensions"
          value={selectedItem.characteristics?.dimension ?? ''}
          onChange={value => updateCharacteristic('dimension', value)}
        />
        <TextField
          label="Material"
          value={selectedItem.characteristics?.material ?? ''}
          onChange={value => updateCharacteristic('material', value)}
        />
        <TextField label="Weight" value={selectedItem.characteristics?.weight ?? ''} onChange={value => updateCharacteristic('weight', value)} />
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
  );
}
