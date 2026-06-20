import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { useLocalize } from '../cms/useLocalize';
import type { CategoryView, LocalizedText } from '../cms/types';
import { catalogUrl, categoryUrl, homeUrl } from '../../routes/routePaths';
import { useMemo } from 'react';

export interface BreadcrumbProps {
  categories: CategoryView[];
}

function buildCrumbs(ids: (string | undefined)[], categories?: CategoryView[], index: number = 0): { label: LocalizedText; href?: string }[] {
  if (!ids[index]) return [];
  const category = categories?.find(c => c.id === ids[index]);
  if (!category) return [];
  const crumbs = buildCrumbs(ids, category.children, index + 1);
  return [{ label: category.name, href: categoryUrl(...ids.slice(0, index + 1)) }, ...crumbs];
}

function useCrumb(categories: CategoryView[]) {
  const { t } = useTranslation();
  const l = useLocalize();
  const { categoryId, subcategoryId, subId } = useParams();

  return useMemo(() => {
    return [
      { label: t('breadcrumb.home'), href: homeUrl() },
      { label: t('header.nav.catalog'), href: catalogUrl() },
      ...buildCrumbs([categoryId, subcategoryId, subId], categories).map(c => ({ label: l(c.label), href: c.href })),
    ];
  }, [l, categories, categoryId, subcategoryId, subId, t]);
}

export function Breadcrumb({ categories }: Readonly<BreadcrumbProps>) {
  const { t } = useTranslation();
  const crumbs = useCrumb(categories);

  return (
    <nav aria-label={t('breadcrumb.label')}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {crumbs.map((crumb, i, { length }) => (
          <li key={crumb.label} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="text-gray-400">
                /
              </span>
            )}
            {crumb.href === undefined || i === length - 1 ?
              <span aria-current="page" className="font-medium text-gray-900">
                {crumb.label}
              </span>
            : <Link
                to={crumb.href}
                className="rounded text-gray-600 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
              >
                {crumb.label}
              </Link>
            }
          </li>
        ))}
      </ol>
    </nav>
  );
}
