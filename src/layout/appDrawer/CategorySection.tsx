import { Link, useParams } from 'react-router';
import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
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
  const categoryTreeId = useId();
  const { opened: folded, toggle } = useDisclosure(false);
  const activeId = subId ?? subcategoryId ?? categoryId;
  const isActive = activeId === undefined;

  return (
    <nav aria-label={t('pages.categories.title')}>
      <div>
        <ul className="space-y-0.5">
          <li className="flex justify-between">
            <button
              type="button"
              aria-expanded={!folded}
              aria-controls={categoryTreeId}
              onClick={toggle}
              className="rounded-md px-2 py-1 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary/20"
            >
              <ChevronDown
                aria-hidden="true"
                className={clsx('size-4 text-gray-500 transition-transform duration-200 ease-out', folded && '-rotate-90')}
                strokeWidth={1.75}
              />
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
        <div
          id={categoryTreeId}
          aria-hidden={folded}
          inert={folded}
          className={clsx(
            'grid transition-[grid-template-rows,opacity] duration-200 ease-in',
            folded ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100',
          )}
        >
          <div className="overflow-hidden">
            <CategoryTree categories={categories} activeId={activeId} parentPath="/catalog" depth={0} onClose={onClose} />
          </div>
        </div>
      </div>
    </nav>
  );
}
