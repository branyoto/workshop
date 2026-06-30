import { useCallback, useState } from 'react';
import { AdminCategoryTree } from './AdminCategoryTree';
import { AdminCategoryForm } from './AdminCategoryForm';

export function AdminCategoriesTab() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [isAdding, setIsAdding] = useState(false);

  const handleSelect = useCallback((id: string) => {
    setSelectedCategoryId(id);
    setIsAdding(false);
  }, []);

  const handleAddRoot = useCallback(() => {
    setSelectedCategoryId(undefined);
    setIsAdding(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCategoryId(undefined);
    setIsAdding(false);
  }, []);

  const handleIdChange = useCallback((newId: string) => {
    setSelectedCategoryId(newId);
  }, []);

  return (
    <div className="flex gap-4">
      <AdminCategoryTree selectedId={isAdding ? undefined : selectedCategoryId} onSelect={handleSelect} onAddRoot={handleAddRoot} />
      {isAdding ?
        <AdminCategoryForm key="new" defaultParentId={undefined} onClose={handleClose} />
      : selectedCategoryId ?
        <AdminCategoryForm key={selectedCategoryId} prevId={selectedCategoryId} onClose={handleClose} onIdChange={handleIdChange} />
      : <div className="flex-3 flex items-center justify-center rounded-lg border border-neutral/50 p-4 h-120 text-2xl font-bold text-gray-400">
          Sélectionner une catégorie
        </div>
      }
    </div>
  );
}
