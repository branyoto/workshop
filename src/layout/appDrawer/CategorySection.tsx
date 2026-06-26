import { Link, useParams } from 'react-router';
import { useId, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
  const categoryListId = useId();
  const [expanded, setExpanded] = useState(true);
  const activeId = subId ?? subcategoryId ?? categoryId;
  const isRoot = activeId === undefined;

  return (
    <nav aria-label={t('pages.categories.title')}>
      <div id={categoryListId} className="mt-1">
        <ul className="space-y-0.5">
          <li className="flex justify-between">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={categoryListId}
              onClick={() => setExpanded(current => !current)}
              className="rounded-md px-2 py-1.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary/20"
            >
              {expanded ?
                <ChevronDown aria-hidden="true" className="size-4 text-gray-500" strokeWidth={1.75} />
              : <ChevronRight aria-hidden="true" className="size-4 text-gray-500" strokeWidth={1.75} />}
            </button>
            <Link
              to={catalogUrl()}
              onClick={onClose}
              aria-current={isRoot ? 'page' : undefined}
              className={clsx(
                'flex-1 block rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
                isRoot ? 'bg-primary/60 text-gray-900' : 'text-gray-700 hover:bg-primary/20',
              )}
            >
              {t('pages.catalog.allItems')}
            </Link>
          </li>
        </ul>
        <CategoryTree hidden={!expanded} categories={categories} activeId={activeId} parentPath="/catalog" depth={0} onClose={onClose} />
      </div>
    </nav>
  );
}
