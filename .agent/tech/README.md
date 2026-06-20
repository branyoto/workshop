# Technical Specs Index

## User story mapping

- US01 Homepage discovery: `03-homepage.md`
- US02 Category browsing and filters: `04-catalog-search.md`
- US03 Item detail page: `05-item-detail.md`
- US04 Cart review and management: `06-cart-checkout.md`
- US05 Checkout and order placement: `06-cart-checkout.md`
- US06 Contact page: `07-contact.md`
- US07 French/English language switching: `02-i18n.md`
- US08 Responsive mobile and desktop preview: `08-responsive-styles.md`
- US09 Consistent artist-style visual design: `08-responsive-styles.md`

## Foundation specs

- Application shell, shared routes, shared components, and global classes: `00-foundations.md`
- OneDrive JSON CMS and image model: `01-cms-data.md`
- Admin login and CMS editing: `09-admin-cms.md`

## Required conventions

- Every feature spec starts with new components and reused components.
- Every route-bearing feature lists explicit URLs.
- Every user-facing feature lists explicit translation keys.
- Every visual feature lists explicit CSS classes.
- Shared styles should be defined once in `src/index.css` and reused through tokens/classes.
- Routing uses `react-router`.
- i18n uses `i18next` and `react-i18next`.
- Translation keys are scoped by domain: `page.*`, `common.*`, `header.*`, and `footer.*`
- Route-level pages live in `src/pages/<domain>/`.
- Reusable non-page components live in `src/domain>/`, `src/common/`, or `src/layout/`.
- CMS modules live in `src/pages/`.
- `CategoryView` and `Item` do not include `imageId`; image paths are derived from their stable IDs.
- CSS class names use BEM-style kebab-case blocks, `__` elements, and `--` modifiers.
- TypeScript/TSX uses semicolons and is formatted with Prettier plus ESLint.
