# Technical Spec — US03 Item Detail

## New components

- `src/pages/item/ItemDetailPage.tsx`
- `src/pages/item/ItemGallery.tsx`
- `src/pages/item/ItemInfo.tsx`
- `src/pages/item/CharacteristicList.tsx`
- `src/pages/item/TagChips.tsx`

## Reused components

- `AppShell`
- `Breadcrumbs`
- `Button`
- `Badge`
- `Price`
- `EmptyState`
- `Snackbar`

## Explicit URLs

- Item detail URL: `/item/:id`
- Example item detail URL: `/item/item-001`
- Catalog target for category/tag chip: `/catalog?tags=:tag`
- Category target when a matching category view exists: `/catalog/:categoryId`
- Nested category target when a matching category view exists:
  - `/catalog/:categoryId/:subcategoryId`
  - `/catalog/:categoryId/:subcategoryId/:subId`

## Translation keys

- `pages.item.meta.title`
- `pages.item.notFound.title`
- `pages.item.notFound.description`
- `pages.item.backToCatalog`
- `pages.item.gallery.previous`
- `pages.item.gallery.next`
- `pages.item.gallery.goToImage`
- `pages.item.description`
- `pages.item.characteristics`
- `pages.item.tags`
- `pages.item.categories`
- `pages.item.addToCart`
- `pages.item.addedToCart`
- `pages.item.alreadyInCart`
- `pages.item.soldOutAction`
- `pages.item.characteristics.dimension`
- `pages.item.characteristics.color`
- `pages.item.characteristics.weight`
- `pages.item.characteristics.material`
- `common.availability.inStock`
- `common.availability.soldOut`

## CSS classes

- `item-detail-page`
- `item-detail-page__breadcrumbs`
- `item-detail-page__layout`
- `item-gallery`
- `item-gallery__main`
- `item-gallery__image`
- `item-gallery__controls`
- `item-gallery__thumbs`
- `item-gallery__thumb`
- `item-info`
- `item-info__title`
- `item-info__price`
- `item-info__availability`
- `item-info__description`
- `item-info__actions`
- `characteristics`
- `characteristics__item`
- `characteristics__label`
- `characteristics__value`
- `tag-chips`
- `tag-chip`

## Implementation details

- Resolve item by `id` from CMS `items`.
- Render optional description and characteristics only when present.
- Build gallery images from the item `id`: `${item.id}_thumbnail.png` for thumbnails and `${item.id}_xxx.png` for carousel images.
- Characteristic labels are translated in front-end from the stable keys `dimension`, `color`, `weight`, and `material`.
- Disable add-to-cart when the item is sold out or already in the cart.
- Do not implement reviews, ratings, or quantities.
