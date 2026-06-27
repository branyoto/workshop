import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { AdminItemListContent } from './AdminItemListContent';
import { useAdminModification } from '../utils/useAdminModification';

export function AdminItemList() {
  const { value } = useAdminModification();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return value.items;
    return value.items.filter(item =>
      [item.id, item.title.fr, item.title.en].filter(Boolean).some(value => value?.toLowerCase().includes(normalizedQuery)),
    );
  }, [value, query]);

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
      <AdminItemListContent items={filteredItems} />
    </aside>
  );
}
