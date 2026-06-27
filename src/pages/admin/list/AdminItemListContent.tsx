import type { Item } from '../../../services/providers/cms/types';
import clsx from 'clsx';
import { getProductImageUrl } from '../../../utils/image';
import { useAdminModification } from '../ModificationProvider/useAdminModification';

export interface AdminItemListContentProps {
  items: Item[];
}

export function AdminItemListContent({ items }: Readonly<AdminItemListContentProps>) {
  const { selectedItemId, selectItem } = useAdminModification();
  return (
    <div className="absolute top-12 inset-0 overflow-y-auto p-1">
      {items.map(item => (
        <button
          key={item.id}
          className={clsx(
            'flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors',
            item.id === selectedItemId ? 'bg-secondary/50' : 'hover:bg-neutral/20',
          )}
          onClick={() => selectItem(item.id)}
        >
          <img src={getProductImageUrl(item.id)} alt="" className="aspect-square size-16 h-full rounded-md object-cover" loading="lazy" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-gray-950">{item.title.fr}</span>
            <span className="block truncate text-xs text-gray-500">{item.id}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
