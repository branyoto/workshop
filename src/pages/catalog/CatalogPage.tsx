import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useCms } from '../../services/providers/cms/useCms';
import { Breadcrumbs } from './breadcrumbs/Breadcrumbs';
import { useFilters } from './filters/useFilters';
import { CategoryHeader } from './CategoryHeader';
import { LoadMoreSentinel } from './LoadMoreSentinel';
import { ItemGrid } from './item/ItemGrid';
import { MobileFilterDrawer } from './mobile/MobileFilterDrawer';
import { useDisclosure } from '../../utils/useDisclosure';
import { MobileFilterButton } from './mobile/MobileFilterButton';
import { DesktopFilterDrawer } from './desktop/DesktopFilterDrawer';
import { CatalogNotFound } from './CatalogNotFound';
import { FEATURED_ITEMS_CATEGORY_ID, resolveCategory } from './utils';
import { applyFilters } from './filters/utils';

const PAGE_SIZE = 12;

export function CatalogPage() {
  const { categoryId, subcategoryId, subId } = useParams();
  const { categories, items, featuredItemIds } = useCms();
  const filterState = useFilters();
  const [filterDrawerOpened, openFilterDrawer, closeFilterDrawer] = useDisclosure();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { category, notFound } = resolveCategory(categories, categoryId, subcategoryId, subId);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resync url change with state
    setVisibleCount(PAGE_SIZE);
  }, [filterState.filters, categoryId, subcategoryId, subId]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  }, []);

  if (notFound) {
    return <CatalogNotFound />;
  }

  const activeCategoryTags = category?.tags;
  const baseItems =
    activeCategoryTags ? items.filter(item => item.tags.some(tag => activeCategoryTags.includes(tag)))
    : categoryId === FEATURED_ITEMS_CATEGORY_ID ? items.filter(item => featuredItemIds.includes(item.id))
    : items;
  const filteredItems = applyFilters(baseItems, filterState.filters);
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <section aria-labelledby="catalog-heading">
      <Breadcrumbs />
      <CategoryHeader category={category} />
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
