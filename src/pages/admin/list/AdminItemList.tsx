import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useCms } from '../../../services/providers/cms/useCms';
import { AdminItemListContent } from './AdminItemListContent';

export interface AdminItemListProps {
  selectedItemId: string;
  setSelectedItemId: (itemId: string) => void;
}

export function AdminItemList({ selectedItemId, setSelectedItemId }: Readonly<AdminItemListProps>) {
  const { items } = useCms();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;
    return items.filter(item =>
      [item.id, item.title.fr, item.title.en].filter(Boolean).some(value => value?.toLowerCase().includes(normalizedQuery)),
    );
  }, [items, query]);

  return (
    <aside className="relative flex-1 rounded-lg border border-neutral/50 bg-white">
      <div className="flex items-center gap-2 border-b border-neutral/50 p-3">
        <Search className="size-4 text-sm text-gray-600" aria-hidden="true" />
        <input
          className="flex-1 bg-transparent outline-none"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search item"
        />
      </div>
      <AdminItemListContent selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} items={filteredItems} />
    </aside>
  );
}
