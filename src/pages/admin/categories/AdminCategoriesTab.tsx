import { useCallback, useState } from 'react';
import { AdminCategoryTree } from './AdminCategoryTree';
import { AdminCategoryForm } from './AdminCategoryForm';

export function AdminCategoriesTab() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [addParentId, setAddParentId] = useState<string>();
  const [isAdding, setIsAdding] = useState(false);

  const handleSelect = useCallback((id: string) => {
    setSelectedCategoryId(id);
    setIsAdding(false);
  }, []);

  const handleAddChild = useCallback((parentId: string | undefined) => {
    setSelectedCategoryId(undefined);
    setAddParentId(parentId);
    setIsAdding(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCategoryId(undefined);
    setIsAdding(false);
  }, []);

  return (
    <div className="flex gap-4">
      <AdminCategoryTree selectedId={isAdding ? undefined : selectedCategoryId} onSelect={handleSelect} onAddChild={handleAddChild} />
      {isAdding ?
        <AdminCategoryForm key={`new-${addParentId}`} defaultParentId={addParentId} onClose={handleClose} />
      : selectedCategoryId ?
        <AdminCategoryForm key={selectedCategoryId} prevId={selectedCategoryId} onClose={handleClose} />
      : <div className="flex-3 flex items-center justify-center rounded-lg border border-neutral/50 p-4 h-120 text-2xl font-bold text-gray-400">
          Sélectionner une catégorie
        </div>
      }
    </div>
  );
}
