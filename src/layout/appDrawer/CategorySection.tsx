import { Link, useParams } from 'react-router';
import { catalogUrl } from '../../routes/routePaths';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useCms } from '../../services/providers/cms/useCms';
import { CategoryTree } from './CategoryTree';

export interface CategorySectionProps {
  onClose: () => void;
}

export function CategorySection({ onClose }: Readonly<CategorySectionProps>) {
  const { t } = useTranslation();
  const { categories } = useCms();
  const { categoryId, subcategoryId, subId } = useParams();
  const activeId = subId ?? subcategoryId ?? categoryId;
  const isRoot = activeId === undefined;

  return (
    <nav aria-label={t('pages.categories.title')}>
      <ul className="space-y-0.5">
        <li>
          <Link
            to={catalogUrl()}
            onClick={onClose}
            aria-current={isRoot ? 'page' : undefined}
            className={clsx(
              'block rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
              isRoot ? 'bg-primary/60 text-gray-900' : 'text-gray-700 hover:bg-primary/20',
            )}
          >
            {t('pages.catalog.allItems')}
          </Link>
        </li>
      </ul>
      <CategoryTree categories={categories} activeId={activeId} parentPath="/catalog" depth={0} onClose={onClose} />
    </nav>
  );
}
