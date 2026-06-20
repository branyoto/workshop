# Technical Spec — US08 Responsive Behavior and US09 Visual Design

## New components and modules

- No feature-only components required.
- Add shared style tokens and reusable classes in `src/index.css`.
- Add optional `src/styles/tokens.css` only if `index.css` becomes too large; if used, it must be imported by `index.css`, not by feature components.

## Reused components

- `AppShell`
- `Drawer`
- `Button`
- `IconButton`
- `Card`
- `Badge`
- `EmptyState`
- `Breadcrumbs`
- `ItemCard`

## Explicit URLs covered

- `/`
- `/catalog`
- `/catalog/:categoryId`
- `/catalog/:categoryId/:subcategoryId`
- `/catalog/:categoryId/:subcategoryId/:subId`
- `/item/:id`
- `/checkout`
- `/contact`
- `/login`
- `/admin/cms`

## CSS tokens in `src/index.css`

- `--primary: #F7C7DB`
- `--secondary: #C5EBC3`
- `--accent: #5CBBEC`
- `--neutral: #D7C0D0`
- `--color-bg`
- `--color-surface`
- `--color-surface-soft`
- `--color-text`
- `--color-text-muted`
- `--color-heading`
- `--color-border`
- `--color-focus`
- `--space-xs`
- `--space-sm`
- `--space-md`
- `--space-lg`
- `--space-xl`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--shadow-sm`
- `--shadow-md`
- `--container-width`

## Shared CSS classes

- `container`
- `stack`
- `cluster`
- `grid`
- `surface`
- `section`
- `section__header`
- `button`
- `button--primary`
- `button--secondary`
- `button--ghost`
- `button--danger`
- `icon-button`
- `card`
- `badge`
- `form-field`
- `form-field__label`
- `form-field__input`
- `form-field__error`
- `drawer`
- `empty-state`
- `visually-hidden`

## Responsive classes and behavior

- `grid--items`: 4 columns desktop, 2 columns mobile, 1 column on very narrow screens if needed.
- `drawer--fullscreen`: used for mobile cart and filter drawers.
- `item-detail-page__layout`: side-by-side desktop, stacked mobile.
- `checkout-page__layout`: summary beside form desktop, stacked mobile.

## Translation keys

- No visual-only translation keys.
- Accessibility labels reused from feature specs:
  - `header.openMenu`
  - `header.closeMenu`
  - `pages.cart.open`
  - `pages.cart.close`
  - `pages.catalog.filters.open`
  - `pages.catalog.filters.close`
  - `pages.item.gallery.previous`
  - `pages.item.gallery.next`

## Implementation details

- Copy palette values into `src/index.css`; do not import `.agent/colors.css`.
- Define each reusable style once.
- Prefer shared classes and semantic tokens over page-specific CSS.
- Use BEM-style class names consistently: kebab-case blocks, `__` elements, and `--` modifiers.
- Compose classes on components from shared primitives plus local block classes instead of writing deep descendant selectors.
- Avoid exact one-off styling when the same visual role can use existing tokens.
- Respect `prefers-reduced-motion`.
- Ensure visible focus states for all interactive controls.
- Ensure no horizontal overflow at mobile widths.
