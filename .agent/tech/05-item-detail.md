# Technical Spec — US03 Item Detail

## New components

- `src/pages/ItemDetailPage.tsx`
- `src/components/item/ItemGallery.tsx`
- `src/components/item/ItemInfo.tsx`
- `src/components/item/CharacteristicList.tsx`
- `src/components/item/TagChips.tsx`

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

- `itemDetail.meta.title`
- `itemDetail.notFound.title`
- `itemDetail.notFound.description`
- `itemDetail.backToCatalog`
- `itemDetail.gallery.previous`
- `itemDetail.gallery.next`
- `itemDetail.gallery.goToImage`
- `itemDetail.description`
- `itemDetail.characteristics`
- `itemDetail.tags`
- `itemDetail.categories`
- `itemDetail.addToCart`
- `itemDetail.addedToCart`
- `itemDetail.alreadyInCart`
- `itemDetail.soldOutAction`
- `availability.inStock`
- `availability.soldOut`
- `characteristics.dimension`
- `characteristics.color`
- `characteristics.weight`
- `characteristics.material`

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
- Build gallery images from `imageId_thumbnail` for thumbnails and `imageId_0-xxx` for carousel images.
- Characteristic labels are translated in front-end from the stable keys `dimension`, `color`, `weight`, and `material`.
- Disable add-to-cart when the item is sold out or already in the cart.
- Do not implement reviews, ratings, or quantities.
