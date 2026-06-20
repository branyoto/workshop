import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useCms } from '../cms/useCms';
import { Breadcrumbs } from './breadcrumbs/Breadcrumbs';
import { applyFilters, useFilters } from './filters/useFilters';
import { CategoryHeader } from './CategoryHeader';
import { LoadMoreSentinel } from './LoadMoreSentinel';
import { ItemGrid } from './item/ItemGrid';
import { MobileFilterDrawer } from './mobile/MobileFilterDrawer';
import { useDisclosure } from '../../utils/useDisclosure';
import { MobileFilterButton } from './mobile/MobileFilterButton';
import { DesktopFilterDrawer } from './desktop/DesktopFilterDrawer';
import { CatalogNotFound } from './CatalogNotFound';
import { collectTags, resolveCategory } from './utils';

const PAGE_SIZE = 12;

export function CatalogPage() {
  const { categoryId, subcategoryId, subId } = useParams();
  const { data: cms } = useCms();
  const filterState = useFilters();
  const [filterDrawerOpened, openFilterDrawer, closeFilterDrawer] = useDisclosure();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination on filter/category change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resync url change with state
    setVisibleCount(PAGE_SIZE);
  }, [filterState.filters, categoryId, subcategoryId, subId]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  }, []);

  if (!cms) return null;

  const { category: resolvedCategory, notFound } = resolveCategory(cms.categories, categoryId, subcategoryId, subId);

  if (notFound) {
    return <CatalogNotFound />;
  }

  // Base items: scoped to category (before user filters)
  const activeCategoryTags = resolvedCategory ? collectTags(resolvedCategory) : null;
  const baseItems = activeCategoryTags ? cms.items.filter(item => item.tags.some(tag => activeCategoryTags.includes(tag))) : cms.items;

  // Apply user filters
  const items = applyFilters(baseItems, filterState.filters);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <section aria-labelledby="catalog-heading">
      <Breadcrumbs />
      <CategoryHeader category={resolvedCategory} />
      <div className="mt-6 flex gap-6">
        <DesktopFilterDrawer items={baseItems} />
        <div className="min-w-0 flex-1">
          <MobileFilterButton onOpen={openFilterDrawer} />
          <ItemGrid items={visibleItems} />
          <LoadMoreSentinel hasMore={hasMore} loadMore={loadMore} />
        </div>
      </div>
      <MobileFilterDrawer items={baseItems} open={filterDrawerOpened} onClose={closeFilterDrawer} />
    </section>
  );
}
