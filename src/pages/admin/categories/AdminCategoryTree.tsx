import { useState } from 'react';
import { ChevronRight, PlusCircle } from 'lucide-react';
import clsx from 'clsx';
import type { CategoryView } from '../../../services/providers/cms/types';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { Button } from '../../../common/Button';
import { getCategoryImageUrl } from '../../../utils/image';

interface AdminCategoryNodeProps {
  category: CategoryView;
  selectedId: string | undefined;
  depth: number;
  /** @stable */
  onSelect: (id: string) => void;
}

function AdminCategoryNode({ category, selectedId, depth, onSelect }: Readonly<AdminCategoryNodeProps>) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = (category.children?.length ?? 0) > 0;

  return (
    <div>
      <div
        className={clsx(
          'flex items-center gap-1 rounded-md px-2 py-1.5 text-sm',
          selectedId === category.id ? 'bg-secondary-100' : 'hover:bg-bg-100',
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <button
          type="button"
          className="flex size-5 shrink-0 items-center justify-center"
          onClick={() => setExpanded(e => !e)}
          aria-label={expanded ? 'Replier' : 'Déplier'}
        >
          {hasChildren && <ChevronRight className={clsx('size-4 text-primary-500 transition-transform', expanded && 'rotate-90')} />}
        </button>
        <img
          src={getCategoryImageUrl(category.id)}
          alt=""
          aria-hidden="true"
          className="size-5 shrink-0 rounded object-cover"
        />
        <button type="button" className="flex-1 truncate text-left font-medium text-primary-900" onClick={() => onSelect(category.id)}>
          {category.name.fr}
        </button>
      </div>
      {expanded &&
        hasChildren &&
        category.children!.map(child => (
          <AdminCategoryNode
            key={child.id}
            category={child}
            selectedId={selectedId}
            depth={depth + 1}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}

export interface AdminCategoryTreeProps {
  selectedId: string | undefined;
  /** @stable */
  onSelect: (id: string) => void;
  /** @stable */
  onAddRoot: () => void;
}

export function AdminCategoryTree({ selectedId, onSelect, onAddRoot }: Readonly<AdminCategoryTreeProps>) {
  const { cms } = useAdminModification();

  return (
    <aside className="flex-1 rounded-lg border border-bg-200 bg-bg-50">
      <div className="flex items-center justify-between border-b border-bg-200 p-3">
        <span className="text-sm font-semibold text-primary-700">Catégories</span>
        <Button variant="text" className="px-2 py-1 text-xs" onClick={onAddRoot}>
          <PlusCircle className="size-3.5" />
          Racine
        </Button>
      </div>
      <div className="p-1">
        {cms.categories.map(cat => (
          <AdminCategoryNode
            key={cat.id}
            category={cat}
            selectedId={selectedId}
            depth={0}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  );
}

