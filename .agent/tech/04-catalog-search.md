# Technical Spec — US02 Catalog, Category Tag Views, and Filters

## New components

- `src/pages/catalog/CatalogPage.tsx`
- `src/pages/catalog/CatalogFilters.tsx`
- `src/pages/catalog/CategoryNavigation.tsx`
- `src/pages/catalog/ItemGrid.tsx`
- `src/pages/catalog/ItemCard.tsx`
- `src/pages/catalog/ActiveFilterChips.tsx`
- `src/pages/catalog/InfiniteScrollSentinel.tsx`

## Reused components

- `AppShell`
- `Breadcrumbs`
- `Button`
- `IconButton`
- `Badge`
- `Card`
- `EmptyState`
- `Price`
- `Drawer`

## Explicit URLs

- Global catalog URL: `/catalog`
- Category tag-filter URL: `/catalog/:categoryId`
- Nested category tag-filter URL: `/catalog/:categoryId/:subcategoryId`
- Third-level category tag-filter URL: `/catalog/:categoryId/:subcategoryId/:subId`
- Query params:
  - `/catalog?minPrice=10`
  - `/catalog?maxPrice=50`
  - `/catalog?colors=rose,bleu`
  - `/catalog?available=true`
  - `/catalog?tags=crochet,baby`
  - `/catalog/:categoryId?minPrice=10&maxPrice=50&available=true&tags=birthday`
- Item detail target: `/item/:id`

## Category behavior

- Category pages are front-end views over tags.
- Navigating to `/catalog/:categoryId` is equivalent to opening `/catalog` with the configured category tag filter applied.
- Category route segments resolve from CMS category `id` values.
- Category IDs are stable IDs, not slugs.
- Category images are resolved from category IDs.
- Breadcrumb labels use localized category names, never raw IDs.
- Parent category pages apply their configured tags and configured descendant category tags.
- Available filter tags are parsed from the CMS JSON during normalization and exposed as `tagList`.

## Translation keys

- `pages.catalog.meta.title`
- `pages.catalog.title`
- `pages.catalog.categoryTitle`
- `pages.catalog.breadcrumb.home`
- `pages.catalog.breadcrumb.catalog`
- `pages.catalog.filters.title`
- `pages.catalog.filters.price`
- `pages.catalog.filters.minPrice`
- `pages.catalog.filters.maxPrice`
- `pages.catalog.filters.color`
- `pages.catalog.filters.availability`
- `pages.catalog.filters.availableOnly`
- `pages.catalog.filters.tags`
- `pages.catalog.filters.clearOne`
- `pages.catalog.filters.clearAll`
- `pages.catalog.filters.apply`
- `pages.catalog.filters.open`
- `pages.catalog.filters.close`
- `pages.catalog.empty.title`
- `pages.catalog.empty.description`
- `pages.catalog.empty.clearFilters`
- `pages.catalog.loadMore`
- `pages.catalog.loadingMore`
- `pages.item.addToCart`
- `pages.item.viewDetails`
- `common.availability.inStock`
- `common.availability.soldOut`

## CSS classes

- `catalog-page`
- `catalog-page__header`
- `catalog-page__content`
- `catalog-page__filters`
- `catalog-page__grid`
- `catalog-filters`
- `catalog-filters__group`
- `catalog-filters__actions`
- `active-filters`
- `active-filters__chip`
- `category-nav`
- `category-nav__list`
- `category-nav__item`
- `category-nav__link`
- `category-nav__link--active`
- `item-grid`
- `item-card`
- `item-card__media`
- `item-card__body`
- `item-card__title`
- `item-card__price`
- `item-card__badge`
- `item-card__actions`
- `infinite-scroll-sentinel`

## Implementation details

- Keep filters in URL query params.
- Combine category tag filters and query tag filters with predictable AND/OR behavior documented in code:
  - category tags define the base item set.
  - explicit tag filters narrow the base item set.
- Fetch CMS data once at `CatalogPage` level and pass normalized data to child components.
- Do not fetch CMS data inside `CatalogFilters`, `ItemGrid`, or `ItemCard`.
- Availability filter controls add-to-cart availability but does not mutate CMS data.
- Infinite scroll appends a deterministic slice of the filtered result set and must not duplicate items.
- Use React Router params for category IDs and `useSearchParams` for filters.
- Use BEM-style class names consistently and compose shared classes with component classes.
