import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { AdminItemListContent } from './AdminItemListContent';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { TextField } from '../../../common/input/TextField';

export function AdminItemList() {
  const { cms } = useAdminModification();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return cms.items;
    return cms.items.filter(item =>
      [item.id, item.title.fr, item.title.en].filter(Boolean).some(value => value?.toLowerCase().includes(normalizedQuery)),
    );
  }, [cms, query]);

  return (
    <aside className="relative flex-1 rounded-lg border border-neutral/50 bg-white">
      <div className="flex items-center gap-2 border-b border-neutral/50 p-3">
        <Search className="size-4 text-sm text-gray-600" aria-hidden="true" />
        <TextField value={query} onChange={setQuery} className="flex-1" inputClassname="border-0 outline-none" placeholder="Search item" />
      </div>
      <AdminItemListContent items={filteredItems} />
    </aside>
  );
}
