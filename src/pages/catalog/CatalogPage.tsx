import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { Drawer } from '../../common/Drawer';
import { EmptyState } from '../../common/EmptyState';
import { getThumbnailUrl } from '../cms/imageUrl';
import { useLocalize } from '../cms/useLocalize';
import type { CategoryView, Item } from '../cms/types';
import { useCms } from '../cms/useCms';
import { Breadcrumb } from './Breadcrumb';
import { FiltersPanel } from './FiltersPanel';
import { ItemCard } from './ItemCard';
import { applyFilters, useFilters } from './useFilters';

const PAGE_SIZE = 12;

function collectTags(category: CategoryView): string[] {
  const tags = new Set(category.tags);
  for (const child of category.children ?? []) {
    for (const tag of collectTags(child)) {
      tags.add(tag);
    }
  }
  return [...tags];
}

type ResolveResult = { category: CategoryView | null; notFound: boolean };

function resolveCategory(
  categories: CategoryView[],
  categoryId: string | undefined,
  subcategoryId: string | undefined,
  subId: string | undefined,
): ResolveResult {
  if (!categoryId) return { category: null, notFound: false };
  const root = categories.find(c => c.id === categoryId);
  if (root === undefined) return { category: null, notFound: true };
  if (subcategoryId === undefined) return { category: root, notFound: false };
  const child = root.children?.find(c => c.id === subcategoryId);
  if (child === undefined) return { category: null, notFound: true };
  if (subId === undefined) return { category: child, notFound: false };
  const grand = child.children?.find(c => c.id === subId);
  if (grand === undefined) return { category: null, notFound: true };
  return { category: grand, notFound: false };
}

function uniqueColors(items: Item[]): string[] {
  const seen = new Set<string>();
  for (const item of items) {
    const color = item.characteristics?.color;
    if (color) seen.add(color);
  }
  return [...seen].sort();
}

function uniqueTags(items: Item[]): string[] {
  const seen = new Set<string>();
  for (const item of items) {
    for (const tag of item.tags) seen.add(tag);
  }
  return [...seen].sort();
}

interface CategoryBannerProps {
  categoryId: string;
  alt: string;
}

function CategoryBanner({ categoryId, alt }: Readonly<CategoryBannerProps>) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="mb-4 overflow-hidden rounded-xl bg-primary/10">
      <img src={getThumbnailUrl(categoryId)} alt={alt} onError={() => setHidden(true)} className="h-40 w-full object-cover" />
    </div>
  );
}

export function CatalogPage() {
  const { t } = useTranslation();
  const l = useLocalize();
  const { categoryId, subcategoryId, subId } = useParams();
  const { data: cms } = useCms();
  const filterState = useFilters();
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset pagination on filter/category change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filterState.filters, categoryId, subcategoryId, subId]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  }, []);

  if (!cms) return null;

  const { category: resolvedCategory, notFound } = resolveCategory(cms.categories, categoryId, subcategoryId, subId);

  if (notFound) {
    return (
      <section aria-labelledby="catalog-heading">
        <h1 id="catalog-heading" className="sr-only">
          {t('pages.catalog.heading')}
        </h1>
        <EmptyState title={t('pages.catalog.notFound.title')} description={t('pages.catalog.notFound.description')} />
      </section>
    );
  }

  // Base items: scoped to category (before user filters)
  const activeCategoryTags = resolvedCategory ? collectTags(resolvedCategory) : null;
  const baseItems = activeCategoryTags ? cms.items.filter(item => item.tags.some(tag => activeCategoryTags.includes(tag))) : cms.items;

  // Filter options derived from base items (stable — don't shrink with active filters)
  const colorOptions = uniqueColors(baseItems);
  const tagOptions = uniqueTags(baseItems);

  // Apply user filters
  const items = applyFilters(baseItems, filterState.filters);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  // IntersectionObserver sentinel
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const heading = resolvedCategory ? l(resolvedCategory.name) : t('pages.catalog.heading');
  const description = resolvedCategory?.description != null ? l(resolvedCategory.description) : undefined;

  const filtersPanelProps = {
    filters: filterState.filters,
    activeCount: filterState.activeCount,
    colors: colorOptions,
    tags: tagOptions,
    onSetMinPrice: filterState.setMinPrice,
    onSetMaxPrice: filterState.setMaxPrice,
    onSetAvailable: filterState.setAvailable,
    onToggleColor: filterState.toggleColor,
    onToggleTag: filterState.toggleTag,
    onClearAll: filterState.clearAll,
  };

  return (
    <section aria-labelledby="catalog-heading">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb categories={cms.categories} categoryId={categoryId} subcategoryId={subcategoryId} subId={subId} />
      </div>

      {/* Category banner */}
      {resolvedCategory && <CategoryBanner categoryId={resolvedCategory.id} alt={heading} />}

      <h1 id="catalog-heading" className="text-3xl font-semibold text-gray-900">
        {heading}
      </h1>
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}

      <div className="mt-6 flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-neutral/50 bg-white p-4 shadow-sm">
            <FiltersPanel {...filtersPanelProps} />
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Mobile filter button */}
          <div className="mb-4 flex items-center gap-2 lg:hidden">
            <Button variant="ghost" className="gap-2 border border-neutral/50" onClick={() => setFiltersDrawerOpen(true)}>
              {t('pages.catalog.filters.openFilters')}
              {filterState.activeCount > 0 && (
                <Badge variant="default" className="px-1.5 py-0 text-[10px]">
                  {filterState.activeCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Item grid */}
          {items.length === 0 ?
            <EmptyState title={t('pages.catalog.emptyTitle')} description={t('pages.catalog.emptyDescription')} />
          : <>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {visibleItems.map(item => (
                  <li key={item.id}>
                    <ItemCard item={item} />
                  </li>
                ))}
              </ul>
              {hasMore && (
                <div ref={sentinelRef} className="mt-8 flex justify-center">
                  <Button variant="secondary" onClick={loadMore}>
                    {t('pages.catalog.loadMore')}
                  </Button>
                </div>
              )}
            </>
          }
        </div>
      </div>

      {/* Mobile filters drawer */}
      <Drawer open={filtersDrawerOpen} onClose={() => setFiltersDrawerOpen(false)} side="left" title={t('pages.catalog.filters.title')}>
        <FiltersPanel {...filtersPanelProps} />
      </Drawer>
    </section>
  );
}
