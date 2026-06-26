import type { CategoryView } from '../../services/providers/cms/types';
import { useState } from 'react';
import { useLocalize } from '../../services/providers/cms/useLocalize';
import { Link } from 'react-router';
import clsx from 'clsx';
import { getCategoryImageUrl } from '../../utils/image';
import { CategoryTree } from './CategoryTree';

export interface CategoryItemProps {
  category: CategoryView;
  parentPath: string;
  depth: number;
  activeId: string | undefined;
  onClose: () => void;
}

export function CategoryItem({ category, parentPath, depth, activeId, onClose }: Readonly<CategoryItemProps>) {
  const [imgHidden, setImgHidden] = useState(false);
  const l = useLocalize();

  const isActive = category.id === activeId;
  const href = parentPath + '/' + category.id;

  return (
    <li>
      <Link
        to={href}
        onClick={onClose}
        aria-current={isActive ? 'page' : undefined}
        className={clsx(
          'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
          isActive ? 'bg-primary/60 font-medium text-gray-900' : 'text-gray-700 hover:bg-primary/20',
        )}
      >
        {!imgHidden && (
          <img
            src={getCategoryImageUrl(category.id)}
            alt=""
            aria-hidden="true"
            onError={() => setImgHidden(true)}
            className="size-6 shrink-0 rounded object-cover"
          />
        )}
        {l(category.name)}
      </Link>
      {!!category.children?.length && (
        <CategoryTree categories={category.children} activeId={activeId} parentPath={href} depth={depth + 1} onClose={onClose} />
      )}
    </li>
  );
}
