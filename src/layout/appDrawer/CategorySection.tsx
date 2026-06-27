import { Link, useParams } from 'react-router';
import { useId } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { catalogUrl } from '../../routes/routePaths';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useCms } from '../../services/providers/cms/useCms';
import { CategoryTree } from './CategoryTree';
import { useDisclosure } from '../../utils/useDisclosure';

export interface CategorySectionProps {
  onClose: () => void;
}

export function CategorySection({ onClose }: Readonly<CategorySectionProps>) {
  const { t } = useTranslation();
  const { categories } = useCms();
  const { categoryId, subcategoryId, subId } = useParams();
  const categoryListId = useId();
  const { opened: folded, toggle } = useDisclosure(false);
  const activeId = subId ?? subcategoryId ?? categoryId;
  const isActive = activeId === undefined;

  return (
    <nav aria-label={t('pages.categories.title')}>
      <div id={categoryListId}>
        <ul className="space-y-0.5">
          <li className="flex justify-between">
            <button
              type="button"
              aria-expanded={!folded}
              aria-controls={categoryListId}
              onClick={toggle}
              className="rounded-md px-2 py-1 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary/20"
            >
              {folded ?
                <ChevronRight aria-hidden="true" className="size-4 text-gray-500" strokeWidth={1.75} />
              : <ChevronDown aria-hidden="true" className="size-4 text-gray-500" strokeWidth={1.75} />}
            </button>
            <Link
              to={catalogUrl()}
              onClick={onClose}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'flex-1 block rounded-md px-2 py-1 text-sm font-medium transition-colors',
                isActive ? 'bg-primary/60 text-gray-900' : 'text-gray-700 hover:bg-primary/20',
              )}
            >
              {t('pages.catalog.allItems')}
            </Link>
          </li>
        </ul>
        <CategoryTree hidden={folded} categories={categories} activeId={activeId} parentPath="/catalog" depth={0} onClose={onClose} />
      </div>
    </nav>
  );
}
