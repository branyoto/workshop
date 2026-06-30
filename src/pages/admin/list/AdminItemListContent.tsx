import type { Item } from '../../../services/providers/cms/types';
import clsx from 'clsx';
import { getProductImageUrl } from '../../../utils/image';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { DecorativeImage } from '../../../common/DecorativeImage';

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
            item.id === selectedItemId ? 'bg-secondary-100' : 'hover:bg-bg-100',
          )}
          onClick={() => selectItem(item.id)}
        >
          <DecorativeImage src={getProductImageUrl(item.id)} className="size-16" fullWidth={false} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-primary-950">{item.title.fr}</span>
            <span className="block truncate text-xs text-primary-500">{item.id}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
