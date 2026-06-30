import { TextField } from '../../../common/input/TextField';
import { getProductImageUrl } from '../../../utils/image';
import { Checkbox } from '../../../common/input/Checkbox';
import { TextArea } from '../../../common/input/TextArea';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { TagSection } from './TagSection';
import { ColorSection } from './ColorSection';
import { DecorativeImage } from '../../../common/DecorativeImage';
import { updateTags } from '../utils';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';

export function AdminItemForm() {
  const { selectedItemId, cms, editSelectedItem, editTag } = useAdminModification();

  const selectedItem = cms.items.find(item => item.id === selectedItemId);

  if (!selectedItem)
    return (
      <form
        className="flex-3 flex justify-center items-center rounded-lg text-2xl font-bold border border-neutral/50 p-4 h-120"
        onSubmit={event => event.preventDefault()}
      >
        Pas de produit sélectionné
      </form>
    );

  const onAdd = (localizedText: EditLocalizedText) => {
    editTag(localizedText.id, localizedText);
    editSelectedItem(updateTags(localizedText.id));
  };
  const onToggle = (tag: string) => editSelectedItem(updateTags(tag));

  return (
    <form className="flex-3 space-y-6 rounded-lg border border-neutral/50 p-4 h-min" onSubmit={event => event.preventDefault()}>
      <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
        <DecorativeImage src={getProductImageUrl(selectedItem.id)} />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Identifiant" value={selectedItem.id} onChange={id => editSelectedItem({ id })} />
          <TextField
            label="Prix"
            type="number"
            min={0}
            step="0.01"
            value={Number.isNaN(selectedItem.price) ? '' : selectedItem.price}
            onChange={price => editSelectedItem({ price: Number(price) })}
          />
          <TextField label="Titre FR" value={selectedItem.title.fr} onChange={fr => editSelectedItem({ title: { fr } })} />
          <TextField label="Titre EN" value={selectedItem.title.en} onChange={en => editSelectedItem({ title: { en } })} />
          <Checkbox className="w-min" label="Disponible" checked={selectedItem.available} onChange={available => editSelectedItem({ available })} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextArea label="Description FR" value={selectedItem.description?.fr} onChange={fr => editSelectedItem({ description: { fr } })} />
        <TextArea label="Description EN" value={selectedItem.description?.en} onChange={en => editSelectedItem({ description: { en } })} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <TextField
          label="Dimensions"
          value={selectedItem.characteristics?.dimension}
          onChange={dimension => editSelectedItem({ characteristics: { dimension } })}
        />
        <TextField
          label="Matériel"
          value={selectedItem.characteristics?.material}
          onChange={material => editSelectedItem({ characteristics: { material } })}
        />
        <TextField
          label="Poids"
          value={selectedItem.characteristics?.weight}
          onChange={weight => editSelectedItem({ characteristics: { weight } })}
        />
      </div>
      <TagSection selectedTags={selectedItem.tags} onAdd={onAdd} onToggle={onToggle} />
      <ColorSection selectedItem={selectedItem} />
    </form>
  );
}
