import type { CategoryView } from '../../services/providers/cms/types';
import { useLocalize } from '../../services/providers/cms/useLocalize';
import { Link } from 'react-router';
import clsx from 'clsx';
import { getCategoryImageUrl } from '../../utils/image';
import { CategoryTree } from './CategoryTree';
import { DecorativeImage } from '../../common/DecorativeImage';

export interface CategoryItemProps {
  category: CategoryView;
  parentPath: string;
  depth: number;
  activeId: string | undefined;
  onClose: () => void;
}

export function CategoryItem({ category, parentPath, depth, activeId, onClose }: Readonly<CategoryItemProps>) {
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
          isActive ? 'bg-primary-200 font-medium text-primary-900' : 'text-primary-700 hover:bg-bg-100',
        )}
      >
        <DecorativeImage src={getCategoryImageUrl(category.id)} className="size-6 shrink-0" fullWidth={false} />
        {l(category.name)}
      </Link>
      {!!category.children?.length && (
        <CategoryTree categories={category.children} activeId={activeId} parentPath={href} depth={depth + 1} onClose={onClose} />
      )}
    </li>
  );
}
