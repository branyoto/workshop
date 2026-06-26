import type { CategoryView } from '../../services/providers/cms/types';
import clsx from 'clsx';
import { CategoryItem } from './CategoryItem';

interface CategoryTreeProps {
  categories: CategoryView[];
  activeId: string | undefined;
  parentPath: string;
  depth: number;
  hidden: boolean;
  onClose: () => void;
}

export function CategoryTree({ categories, activeId, parentPath, depth, onClose, hidden }: Readonly<CategoryTreeProps>) {
  return (
    <ul className={clsx('space-y-0.5', depth > 0 && 'ml-3 mt-0.5 border-l border-neutral/40 pl-3', hidden && 'hidden')}>
      {categories.map(cat => (
        <CategoryItem key={cat.id} category={cat} parentPath={parentPath} depth={depth} activeId={activeId} onClose={onClose} />
      ))}
    </ul>
  );
}
