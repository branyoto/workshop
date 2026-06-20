import { useTranslation } from 'react-i18next';
import type { CategoryView, LocalizedText } from '../../cms/types';
import { catalogUrl, categoryUrl, homeUrl } from '../../../routes/routePaths';
import { useLocalize } from '../../cms/useLocalize';
import { useParams } from 'react-router';
import { useMemo } from 'react';

function buildCrumbs(ids: (string | undefined)[], categories?: CategoryView[], index: number = 0): { label: LocalizedText; href?: string }[] {
  if (!ids[index]) return [];
  const category = categories?.find(c => c.id === ids[index]);
  if (!category) return [];
  const crumbs = buildCrumbs(ids, category.children, index + 1);
  return [{ label: category.name, href: categoryUrl(...ids.slice(0, index + 1)) }, ...crumbs];
}

export function useBreadcrumbs(categories?: CategoryView[]) {
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
