import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '../../../common/Button';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { flattenCategories } from '../categories/categoryUtils';
import { useState } from 'react';

interface FeaturedListProps {
  title: string;
  featuredIds: string[];
  getLabel: (id: string) => string;
  nonFeaturedOptions: { id: string; label: string }[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

function FeaturedList({ title, featuredIds, getLabel, nonFeaturedOptions, onAdd, onRemove, onMove }: Readonly<FeaturedListProps>) {
  const [selectedId, setSelectedId] = useState('');

  const handleAdd = () => {
    if (!selectedId) return;
    onAdd(selectedId);
    setSelectedId('');
  };

  return (
    <div className="rounded-lg border border-neutral/50 bg-white p-4 space-y-3">
      <h3 className="font-semibold text-gray-950">{title}</h3>

      {featuredIds.length === 0 && (
        <p className="text-sm text-gray-400">Aucun élément mis en avant.</p>
      )}

      <ol className="space-y-1">
        {featuredIds.map((id, index) => (
          <li key={id} className="flex items-center gap-2 rounded-md bg-neutral/10 px-3 py-2 text-sm">
            <span className="w-5 shrink-0 text-center text-xs font-bold text-gray-500">{index + 1}</span>
            <span className="flex-1 truncate font-medium text-gray-900">{getLabel(id)}</span>
            <span className="text-xs text-gray-400">{id}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded p-1 text-gray-400 hover:bg-neutral/30 hover:text-gray-700 disabled:opacity-30"
                disabled={index === 0}
                onClick={() => onMove(id, 'up')}
                aria-label="Monter"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                type="button"
                className="rounded p-1 text-gray-400 hover:bg-neutral/30 hover:text-gray-700 disabled:opacity-30"
                disabled={index === featuredIds.length - 1}
                onClick={() => onMove(id, 'down')}
                aria-label="Descendre"
              >
                <ChevronDown className="size-4" />
              </button>
              <button
                type="button"
                className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                onClick={() => onRemove(id)}
                aria-label="Retirer"
              >
                <X className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ol>

      {nonFeaturedOptions.length > 0 && (
        <div className="flex gap-2 pt-1">
          <select
            className="flex-1 rounded-md border border-neutral/60 bg-white px-3 py-2 text-sm text-gray-950"
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
          >
            <option value="">— Ajouter… —</option>
            {nonFeaturedOptions.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <Button variant="secondary" onClick={handleAdd} disabled={!selectedId}>
            Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}

export function AdminFeaturedTab() {
  const { cms, addItemToFeatured, removeItemFromFeatured, moveItemInFeatured, addCategoryToFeatured, removeCategoryFromFeatured, moveCategoryInFeatured } =
    useAdminModification();

  const allCategories = flattenCategories(cms.categories);

  const nonFeaturedItems = cms.items.filter(item => !cms.featuredItemIds.includes(item.id));
  const nonFeaturedCategories = allCategories.filter(c => !cms.featuredCategoryIds.includes(c.id));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FeaturedList
        title="Produits à la une"
        featuredIds={cms.featuredItemIds}
        getLabel={id => cms.items.find(i => i.id === id)?.title.fr ?? id}
        nonFeaturedOptions={nonFeaturedItems.map(i => ({ id: i.id, label: i.title.fr }))}
        onAdd={addItemToFeatured}
        onRemove={removeItemFromFeatured}
        onMove={moveItemInFeatured}
      />
      <FeaturedList
        title="Catégories à la une"
        featuredIds={cms.featuredCategoryIds}
        getLabel={id => allCategories.find(c => c.id === id)?.name.fr ?? id}
        nonFeaturedOptions={nonFeaturedCategories.map(c => ({ id: c.id, label: c.name.fr }))}
        onAdd={addCategoryToFeatured}
        onRemove={removeCategoryFromFeatured}
        onMove={moveCategoryInFeatured}
      />
    </div>
  );
}
