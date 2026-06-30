import { useState } from 'react';
import { ChevronRight, PlusCircle, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import type { CategoryView } from '../../../services/providers/cms/types';
import { useAdminModification } from '../ModificationProvider/useAdminModification';
import { Button } from '../../../common/Button';

interface AdminCategoryNodeProps {
  category: CategoryView;
  selectedId: string | undefined;
  depth: number;
  /** @stable */
  onSelect: (id: string) => void;
  /** @stable */
  onAddChild: (parentId: string | undefined) => void;
  onDelete: (id: string) => void;
}

function AdminCategoryNode({ category, selectedId, depth, onSelect, onAddChild, onDelete }: Readonly<AdminCategoryNodeProps>) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = (category.children?.length ?? 0) > 0;

  return (
    <div>
      <div
        className={clsx(
          'group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm',
          selectedId === category.id ? 'bg-secondary/50' : 'hover:bg-neutral/20',
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <button
          type="button"
          className="flex size-5 shrink-0 items-center justify-center"
          onClick={() => setExpanded(e => !e)}
          aria-label={expanded ? 'Replier' : 'Déplier'}
        >
          {hasChildren && <ChevronRight className={clsx('size-4 text-gray-500 transition-transform', expanded && 'rotate-90')} />}
        </button>
        <button type="button" className="flex-1 truncate text-left font-medium text-gray-900" onClick={() => onSelect(category.id)}>
          {category.name.fr}
        </button>
        <span className="hidden items-center gap-1 group-hover:flex">
          <button
            type="button"
            className="rounded p-1 text-gray-500 hover:bg-neutral/30 hover:text-gray-900"
            title="Ajouter un enfant"
            onClick={() => onAddChild(category.id)}
          >
            <PlusCircle className="size-3.5" />
          </button>
          <button
            type="button"
            className="rounded p-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
            title="Supprimer"
            onClick={() => onDelete(category.id)}
          >
            <Trash2 className="size-3.5" />
          </button>
        </span>
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
            onAddChild={onAddChild}
            onDelete={onDelete}
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
  onAddChild: (parentId: string | undefined) => void;
}

export function AdminCategoryTree({ selectedId, onSelect, onAddChild }: Readonly<AdminCategoryTreeProps>) {
  const { cms, deleteCategory } = useAdminModification();

  return (
    <aside className="flex-1 rounded-lg border border-neutral/50 bg-white">
      <div className="flex items-center justify-between border-b border-neutral/50 p-3">
        <span className="text-sm font-semibold text-gray-700">Catégories</span>
        <Button variant="text" className="px-2 py-1 text-xs" onClick={() => onAddChild(undefined)}>
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
            onAddChild={onAddChild}
            onDelete={deleteCategory}
          />
        ))}
      </div>
    </aside>
  );
}
