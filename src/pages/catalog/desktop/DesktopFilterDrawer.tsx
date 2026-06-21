import { FiltersList } from '../filters/FiltersList';
import type { Item } from '../../../services/providers/cms/types';

export interface DesktopFilterDrawerProps {
  items: Item[];
}

export function DesktopFilterDrawer({ items }: Readonly<DesktopFilterDrawerProps>) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-neutral/50 bg-white p-4 shadow-sm">
        <FiltersList items={items} />
      </div>
    </aside>
  );
}
