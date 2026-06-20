import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatch } from 'react-router';
import { Drawer } from '../common/Drawer';
import { getThumbnailUrl } from '../pages/cms/imageUrl';
import { useLocalize } from '../pages/cms/useLocalize';
import type { CategoryView } from '../pages/cms/types';
import { useCms } from '../pages/cms/useCms';
import { catalogUrl } from '../routes/routePaths';
import { LanguageSwitcher } from './LanguageSwitcher';

interface CategoryItemProps {
  category: CategoryView;
  href: string;
  isActive: boolean;
  locale: 'fr' | 'en';
  depth: number;
  activeId: string | undefined;
  onClose: () => void;
}

function CategoryItem({ category, href, isActive, locale, depth, activeId, onClose }: Readonly<CategoryItemProps>) {
  const [imgHidden, setImgHidden] = useState(false);
  const l = useLocalize();

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
            src={getThumbnailUrl(category.id)}
            alt=""
            aria-hidden="true"
            onError={() => setImgHidden(true)}
            className="size-6 shrink-0 rounded object-cover"
          />
        )}
        {l(category.name)}
      </Link>
      {(category.children?.length ?? 0) > 0 && (
        <CategoryTree
          categories={category.children!}
          locale={locale}
          activeId={activeId}
          parentPath={href}
          depth={depth + 1}
          onClose={onClose}
        />
      )}
    </li>
  );
}

interface CategoryTreeProps {
  categories: CategoryView[];
  locale: 'fr' | 'en';
  activeId: string | undefined;
  parentPath: string;
  depth: number;
  onClose: () => void;
}

function CategoryTree({ categories, locale, activeId, parentPath, depth, onClose }: Readonly<CategoryTreeProps>) {
  return (
    <ul className={clsx('space-y-0.5', depth > 0 && 'ml-3 mt-0.5 border-l border-neutral/40 pl-3')}>
      {categories.map(cat => (
        <CategoryItem
          key={cat.id}
          category={cat}
          href={`${parentPath}/${cat.id}`}
          isActive={cat.id === activeId}
          locale={locale}
          depth={depth}
          activeId={activeId}
          onClose={onClose}
        />
      ))}
    </ul>
  );
}

export interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CategoryDrawer({ open, onClose }: Readonly<CategoryDrawerProps>) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'fr' | 'en';
  const { data: cms } = useCms();

  const matchCat = useMatch('/catalog/:categoryId');
  const matchSub = useMatch('/catalog/:categoryId/:subcategoryId');
  const matchSub2 = useMatch('/catalog/:categoryId/:subcategoryId/:subId');
  const activeId =
    matchSub2?.params.subId ??
    matchSub?.params.subcategoryId ??
    matchCat?.params.categoryId;

  const isRoot = activeId === undefined;

  return (
    <Drawer open={open} onClose={onClose} side="left" title={t('pages.categories.title')} footer={<LanguageSwitcher />}>
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
        {cms && (
          <CategoryTree
            categories={cms.categories}
            locale={locale}
            activeId={activeId}
            parentPath="/catalog"
            depth={0}
            onClose={onClose}
          />
        )}
      </nav>
    </Drawer>
  );
}
