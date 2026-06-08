# Technical Spec — Foundations

## New components

- `src/App.tsx`: replace the starter screen with the application shell and route switch.
- `src/layout/AppShell.tsx`
- `src/layout/SiteHeader.tsx`
- `src/layout/SiteFooter.tsx`
- `src/layout/Drawer.tsx`
- `src/layout/CategoryDrawer.tsx`
- `src/layout/CartDrawer.tsx`
- `src/common/Button.tsx`
- `src/common/IconButton.tsx`
- `src/common/Badge.tsx`
- `src/common/Card.tsx`
- `src/common/EmptyState.tsx`
- `src/common/Price.tsx`
- `src/common/Snackbar.tsx`
- `src/common/Spinner.tsx`
- `src/common/Breadcrumbs.tsx`
- `src/routes/AppRoutes.tsx`
- `src/routes/routePaths.ts`
- `src/routes/RequireAdmin.tsx`

## Reused components

- Reuse `Button`, `IconButton`, `Badge`, `Card`, `EmptyState`, `Price`, `Drawer`, and `Snackbar` across all pages.
- Reuse `CategoryDrawer` from the shell for desktop and mobile navigation.
- Reuse `CartDrawer` from all add-to-cart entry points.

## Explicit URLs

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

## Routing details

- Use `react-router` for all application routing.
- Add `react-router` to dependencies and wrap the app with `BrowserRouter`.
- Centralize route constants in `src/routes/routePaths.ts`.
- Route helpers:
  - `homeUrl(): '/'`
  - `catalogUrl(filters?): '/catalog?...'`
  - `categoryUrl(categoryIdPath): '/catalog/:categoryId/:subcategoryId?/:subId?'`
  - `itemUrl(id): '/item/:id'`
  - `checkoutUrl(): '/checkout'`
  - `contactUrl(): '/contact'`
  - `loginUrl(): '/login'`
  - `adminCmsUrl(): '/admin/cms'`
- Unknown URLs render a shared not-found page inside `AppShell`.
- `/admin/cms` is protected by `RequireAdmin` and redirects unauthenticated users to `/login`.

## Translation keys

- `app.brand`
- `header.openMenu`
- `header.closeMenu`
- `header.home`
- `header.catalog`
- `header.checkout`
- `header.contact`
- `header.cart`
- `header.language`
- `header.language.fr`
- `header.language.en`
- `footer.contact`
- `footer.social`
- `footer.legal.cgv`
- `footer.legal.cgu`
- `common.loading`
- `common.error`
- `common.retry`
- `common.close`
- `common.cancel`
- `common.confirm`
- `common.back`
- `common.empty`
- `common.price`
- `common.currency.eur`
- `common.notFound.title`
- `common.notFound.description`

## CSS classes

Use BEM-style component classes consistently:

- blocks use kebab-case: `site-header`, `app-shell`.
- elements use `__`: `site-header__actions`.
- modifiers use `--`: `button--primary`.
- compose shared utility classes with component classes instead of creating highly specific one-off selectors.

- `app`
- `app-shell`
- `app-shell__header`
- `app-shell__main`
- `app-shell__footer`
- `site-header`
- `site-header__menu`
- `site-header__brand`
- `site-header__actions`
- `site-footer`
- `site-footer__links`
- `site-footer__social`
- `drawer`
- `drawer--left`
- `drawer--right`
- `drawer--fullscreen`
- `drawer__backdrop`
- `drawer__panel`
- `drawer__header`
- `drawer__body`
- `drawer__footer`
- `button`
- `button--primary`
- `button--secondary`
- `button--ghost`
- `button--danger`
- `icon-button`
- `badge`
- `badge--success`
- `badge--muted`
- `card`
- `empty-state`
- `price`
- `snackbar`
- `spinner`
- `breadcrumbs`
- `breadcrumbs__item`

## Implementation details

- Copy the palette from `.agent/colors.css` into `src/index.css` and map it to semantic tokens.
- Keep global styles and reusable classes in `src/index.css`.
- Use feature CSS classes only when the shared classes cannot express the layout.
- Split CSS so components compose shared classes, for example `className="button button--primary hero-section__cta"`.
- Remove starter Vite/React demo assets and styles from `App.tsx` and `App.css` during implementation.
- Keep `src/App.css` either empty, deleted, or limited to feature-independent shell composition if the project keeps the import.
- Use semicolons in TypeScript and TSX files.
- Configure and run Prettier and ESLint using project scripts.
- Keep formatting automated; code examples in specs should include semicolons.
