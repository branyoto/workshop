# Implementation Plan — Artisanal Creations Website

## Problem and approach

Build a responsive bilingual showcase and ordering website for a solo artisan. Visitors must be able to discover featured handmade creations, browse an extensible catalog, inspect item details, manage a local cart, submit an order without payment, view contact and market information, and switch between French and English.

The implementation should use the project source documents `.agent/CONCEPT.md`, `.agent/specs/user-story.md`, and `.agent/colors.css` as the source of truth. The palette from `.agent/colors.css` must be copied into `index.css` as application tokens, not imported from `.agent/colors.css`.

Recommended approach:

1. Define a JSON CMS data layer first so categories, items, featured content, artist bio, and market dates can change without code edits.
2. Build shared foundations: routing, layout shell, responsive navigation, i18n, design tokens, reusable item/category/cart components.
3. Implement user stories page-by-page and feature-by-feature, keeping localStorage cart and language state isolated behind small services/hooks.
4. Validate responsive behavior, stock/cart constraints, translation fallback, and order submission flow before considering v1 complete.

## Shared foundations

### Application architecture

- Pages/routes:
    - `/` for Home.
    - `/catalog` for catalog root.
    - `/catalog/:categoryId`.
    - `/catalog/:categoryId/:subcategoryId`.
    - `/catalog/:categoryId/:subcategoryId/:subId`.
    - `/item/:id`.
    - `/checkout`.
    - `/contact`.
- Use a shared application shell containing:
    - Header/navigation.
    - Left category drawer.
    - Cart drawer.
    - Footer.
    - Language switcher.
- Keep all routes reachable by keyboard and usable on mobile.

### Content and catalog model

- Create a JSON CMS source loaded from a OneDrive repository.
- Store item images in the same OneDrive repository as the CMS JSON.
- Keep OneDrive image storage flat, without nested folders.
- Treat image references as file names or stable OneDrive URLs that can be resolved by the front-end data loader.
- Categories are a pure front-end catalog view over tags.
- A category page is equivalent to the global catalog/search page with the corresponding category tag filter already applied.
- Parent categories should apply the tag filters configured for that category and any desired child category tags.
- Model items with:
    - `id`.
    - localized `title`.
    - optional localized `description`.
    - `price`.
    - `images`.
    - `thumbnail`.
    - `tags`.
    - `available` boolean.
    - optional characteristics using the predefined keys `dimension`, `color`, `weight`, and `material`.
- Translate characteristic labels in the front-end; item data should use stable characteristic keys.
- Model homepage featured categories as an admin-editable ordered list of category/tag views.
- Model homepage featured items as an admin-editable ordered list of item IDs; items must not carry their own featured flag.
- Model contact content:
    - localized artist bio.
    - social links.
    - artist email.
    - optional studio/market map address.

### Internationalisation

- Default language: French.
- Supported languages: `fr`, `en`.
- Store language preference in localStorage.
- All UI labels, navigation, form labels, placeholders, validation messages, badges, and CTAs must use translation keys.
- Item/category/contact content must support per-language fields.
- Missing English content falls back to French.

### Design system

- Copy the palette from `.agent/colors.css` into `index.css`; do not import `.agent/colors.css` at runtime:
    - `--primary: #F7C7DB`.
    - `--secondary: #C5EBC3`.
    - `--accent: #5CBBEC`.
    - `--neutral: #D7C0D0`.
- Define semantic tokens from those colors:
    - primary background/accent surfaces.
    - secondary soft surfaces.
    - accent links/buttons/focus.
    - neutral borders/backgrounds.
    - readable foreground colors with sufficient contrast.
- Establish shared styles for:
    - buttons.
    - badges.
    - cards.
    - drawers.
    - form fields.
    - carousel/swiper controls.
    - focus states.
- Define each reusable style once and favor shared tokens/utilities over page-specific styling.
- Avoid over-specialized styles; when designs conflict, compromise toward the available tokens and shared component styles.
- Use a clean, personal, handmade aesthetic with subtle transitions only where they clarify interaction.

### Cart service

- Store cart in localStorage under a namespaced key such as `artisan_cart`.
- The cart should never be out of sync with localStorage. All updates must go through a service or hook that updates both state and localStorage together.
- Cart item shape:
    - item ID.
    - localized or language-independent title snapshot.
    - title snapshot.
    - price snapshot.
    - thumbnail URL.
- No quantities in v1. Each item is unique and stock is 1.
- Prevent adding the same item twice.
- Derive cart count and total from stored items.
- Provide actions:
    - add item.
    - remove item.
    - clear cart.
    - hydrate from localStorage.

### Order service

- Checkout submits without payment.
- Generate order numbers client-side as `CMD-YYYYMMDD-XXXX`.
  - `YYYYMMDD` is the current date.
  - `XXXX` is a random 4-digit number.
- Submission strategy:
    - start with a `mailto:` implementation or clearly isolated adapter.
    - keep the adapter swappable for a future lightweight serverless email endpoint.
    - the mail can be sent to multiple recipients: the artist's email and the other admins.
- Email/order payload must include:
    - order number.
    - item list with prices.
    - total excluding delivery.
    - customer contact details.
    - customer notes.
- Delivery fees are not calculated by the site.
- Clear cart only after successful order submission handoff.
- Snackbar if the order submission fails, with retry option.
- Show confirmation with the generated order number.
- Store the submitted order number with previous ones in localStorage to allow users to see the list of their past orders on a futur page.

## User Story implementation details

### US01 — Homepage discovery

As a visitor, I want to see a visually appealing homepage that showcases the artist's work and encourages me to explore the catalog.

Implementation details:

- Build a header in the shared layout.
- Use a left drawer menu for category browsing.
- Place the brand/logo prominently in the center on desktop if following the user story literally; preserve mobile behavior with a hamburger/drawer pattern.
- Show cart icon and language switcher left drawer menu.
- Hero section:
    - full-width responsive banner.
    - localized tagline.
    - CTA labelled `Découvrir les créations` in French and translated equivalent in English.
    - CTA links to `/catalog` or the featured catalog area.
- Featured category carousel:
    - driven by admin-editable tag grouping.
    - each slide/card shows localized category name, image if available, and link to category route.
    - works with mouse, touch, keyboard, and reduced motion preferences.
    - bellow the category routes, show the item grid filtered to the featured categories.
- Featured items grid:
    - driven by the admin-editable featured item ID list.
    - each card shows thumbnail, localized title, price, availability badge, and link to detail page.
    - the items are clickable and keyboard accessible.
    - add-to-cart affordance can be reused from category cards if stock allows.
- Footer:
    - contact page link.
    - social media links.
    - legal information link (CGV, CGU).
- Include a short artist/about teaser if content exists in the data model.

Acceptance criteria:

- A visitor can reach catalog browsing from the hero CTA.
- Featured categories and featured items come from editable content, not hard-coded markup.
- Header, footer, cart count, and language controls are visible and responsive.

### US02 — Category browsing and filters

As a visitor, I want to easily find items that interest me by browsing categories and applying filters.

Implementation details:

- Implement category routes up to 3 levels deep.
- Resolve category path segments from the front-end category/tag view configuration.
- Return a not-found or friendly empty state for unknown category slugs.
- Treat every category page as the global catalog/search page with a category tag filter applied from the route.
- Breadcrumb:
    - starts at Home/Catalog.
    - includes each category level.
    - each ancestor is clickable.
    - the level are user friendly names, not slugs.
- Category hierarchy:
    - left drawer lists top-level categories and nested child categories.
    - parent category pages apply their configured tag filters and any configured descendant category tag filters.
- Filtering:
    - price range filter.
    - color filter.
    - availability checkbox.
    - tags multi-select.
    - filter state reflected in URL query params where practical, so filtered views are shareable and back-button friendly.
    - filters are clearable one by one or all at once.
- Item grid:
    - thumbnail.
    - localized title.
    - price.
    - availability badge: `En stock` / `Épuisé` and English equivalents.
    - link to item detail.
    - hover-only add-to-cart button on desktop for available items.
    - non-hover accessible add-to-cart path for keyboard/touch users.
- Infinite scroll:
    - load initial page of items.
    - append more as the sentinel enters viewport.
    - include a non-JavaScript/accessibility-friendly fallback button such as "Load more" if needed.
    - keep current filters applied while loading more.
- Empty state:
    - localized message.
    - clear filters action.

Acceptance criteria:

- Parent and child category pages return the correct tag-driven item sets.
- Multiple filters can be combined predictably.
- Infinite scroll never drops active filters or duplicates items.
- Availability controls correctly disable add-to-cart for sold-out items.

### US03 — Item detail page

As a visitor, I want to see detailed information about each item, including price, availability, and description.

Implementation details:

- Implement `/item/:id`.
- Resolve item by ID from editable item content.
- Show a not-found state for missing IDs.
- Gallery:
    - desktop carousel with thumbnails or controls.
    - mobile swiper-style interaction.
    - all images include descriptive alt text, falling back to item title.
- Main item information:
    - localized title.
    - formatted price.
    - availability badge.
    - localized optional description.
    - categories and tags.
    - optional characteristics using `dimension`, `color`, `weight`, and `material`.
    - front-end translated characteristic labels.
- Tags/categories:
    - category links navigate to the catalog/search page with the matching category tag filter applied.
    - other tags can be shown as chips; non-clickable.
- Add to cart:
    - enabled only when `available` is true.
    - disabled for sold-out items with localized disabled label or helper text.
    - does not allow duplicate cart entries.
- Explicitly do not implement reviews, ratings, or quantities in v1.

Acceptance criteria:

- Item detail displays all available item data without breaking when optional fields are absent.
- Sold-out items cannot be added to cart.
- The same unique item cannot be added more than once.

### US04 — Cart review and management

As a visitor, I want to add items to my cart and review my selection before placing an order.

Implementation details:

- Header cart icon:
    - shows count badge derived from cart state.
    - opens cart drawer.
- Cart drawer:
    - lists cart items with thumbnail, title snapshot, price snapshot, and remove button.
    - closes via close button.
    - closes by clicking outside.
    - closes with Escape.
    - traps focus while open.
    - persists contents across reloads using localStorage.
    - displays total price at the bottom.
    - includes "Proceed to Checkout" button linking to `/checkout`.
    - includes "Clear cart" button.
- Add-to-cart sources:
    - item detail page button.
    - category item card hover action for desktop.
    - accessible card action for mobile/keyboard users.
- Cart constraints:
    - no quantities.
    - no duplicate unique items.
    - unavailable items cannot be added.
- Empty cart state:
    - localized message.
    - link to catalog.

Acceptance criteria:

- Cart state survives page reloads.
- Removing and clearing items updates drawer, header badge, and total immediately.
- Proceeding to checkout is blocked or redirected with a friendly message if the cart is empty.

### US05 — Checkout and order placement

As a visitor, I want to place an order by providing my contact information and any special instructions.

Implementation details:

- Implement `/checkout`.
- Guard empty checkout:
    - if cart is empty, show localized empty-cart message and link back to catalog.
- Checkout form fields:
    - name.
    - email.
    - phone number.
    - address with Google Maps integration and request api/config from admin with detailed journey.
    - special instructions textarea.
- Align validation with concept requirements:
    - require name and postal address.
    - require at least one contact method: email, phone.
    - validate email format and number when provided.
- Google Maps integration:
    - isolate behind a component/adaptor.
    - gracefully show a normal address textarea/input if Maps API configuration is absent.
    - do not block order submission solely because Maps autocomplete is unavailable.
- Order summary:
    - thumbnail.
    - localized title snapshot.
    - price.
    - total price excluding delivery.
    - message clarifying delivery fees are agreed manually after submission.
- Place Order button:
    - generates order number.
    - creates email/order payload.
    - triggers configured submission adapter.
    - clears cart after successful submission handoff.
    - shows confirmation with order number.
- No payment integration in v1.

Acceptance criteria:

- Orders cannot be submitted without at least one usable contact method.
- Submitted order content includes order number, item list, total, contact details, and notes.
- Cart clears only after order submission is handed off successfully.

### US06 — Contact page, artist bio, markets, and contact form

As a visitor, I want to see the artist's bio and upcoming market dates on the Contact page.

Implementation details:

- Implement `/contact`.
- Artist bio:
    - localized short presentation.
    - overview of creation categories.
    - image/portrait area if content exists.
- Upcoming markets:
    - editable data source.
    - date, location, optional description/link.
    - sorted chronologically.
    - friendly empty state if no upcoming dates are configured.
- Social links:
    - Instagram and any configured social media.
    - accessible labels.
- Email:
    - display artist email.
    - `mailto:` link.
- Map:
    - embedded map or static address block depending on available content/config.
    - avoid exposing precise private studio location unless explicitly configured.
- Contact form:
    - name.
    - email.
    - message.
    - validation for required fields and email format.
    - sends email to artist through the same mail adapter pattern as orders, or a separate contact adapter.
    - shows localized success/error status.

Acceptance criteria:

- Bio and market dates are editable outside component code.
- Contact methods are visible and accessible.
- Contact form produces an email-ready message for the artist.

### US07 — French/English language switching

As a visitor, I want to switch between French and English languages to better understand the content.

Implementation details:

- Implement a language provider/store.
- Default to French on first visit.
- Persist selected language in localStorage.
- Add language switcher:
    - in the left drawer bottom, per user story.
- Translate every user-facing string
- Use a simple key-based translation system with support for interpolation if needed.
- Localized content:
    - item titles and descriptions.
    - category names/descriptions.
    - artist bio.
    - market descriptions if applicable.
- Fallback:
    - missing English content falls back to French.
    - missing translation keys should be visible during development, but not crash production.

Acceptance criteria:

- Language preference survives reloads.
- Switching language updates UI and content without losing cart contents or current route.
- English missing content falls back to French.

### US08 — Responsive mobile and desktop preview

As a visitor, I want to preview the website on both mobile and desktop devices.

Implementation details:

- Define responsive breakpoints for mobile, tablet, and desktop.
- Header/navigation:
    - desktop: visible brand/logo, category drawer trigger, cart, language switcher.
    - mobile: hamburger opens drawer with category links and language switcher.
- Category/item grid:
    - desktop: up to 4 items per row.
    - tablet: 2 or 3 items per row depending width.
    - mobile: 2 items per row where practical; fall back to 1 column for very narrow screens if needed for readability.
- Item detail:
    - desktop: gallery and item info side-by-side.
    - mobile: photos and description stack vertically.
- Cart drawer:
    - desktop: side drawer.
    - mobile: full-screen drawer/sheet.
- Filters:
    - desktop: sidebar or persistent panel.
    - mobile: collapsible drawer/sheet.
- Touch targets:
    - minimum comfortable tap sizes for buttons, filters, carousel controls, and drawer controls.
- Preview/testing:
    - verify common viewport widths.
    - check portrait and landscape behavior.
    - ensure no horizontal overflow.

Acceptance criteria:

- Core user journey works on mobile and desktop.
- Drawers, carousels, filters, and checkout forms remain usable on small screens.
- Item grids adapt without clipping text or images.

### US09 — Consistent artist-style visual design

As a visitor, I want to see a consistent and visually appealing design that reflects the artist's style and brand.

Implementation details:

- Apply the provided color palette consistently:
    - soft pink primary for warm handmade brand moments.
    - soft green secondary for supportive surfaces and highlights.
    - blue accent for CTAs, links, focus, and interactive emphasis.
    - neutral mauve for borders, subtle panels, and quiet backgrounds.
- Establish typography scale:
    - expressive but readable headings.
    - comfortable body text.
    - clear prices and labels.
- Imagery:
    - use high-quality item photos.
    - enforce consistent aspect ratios in cards.
    - avoid layout shift with image dimensions/placeholders.
- Layout:
    - generous whitespace.
    - card-based item presentation.
    - clear navigation and hierarchy.
    - content blocks that feel personal and artisanal rather than generic marketplace UI.
- Animation:
    - subtle hover states.
    - drawer transitions.
    - carousel/swiper transitions.
    - respect reduced motion preferences.
- Accessibility:
    - sufficient contrast for text and controls.
    - visible focus states.
    - alt text for images.
    - semantic headings.
    - form labels and error messages.
- Styling discipline:
    - define shared component styles once.
    - reuse semantic tokens and common primitives instead of creating one-off page styles.
    - compromise between exact visual intent and available tokens when a design would require overly specific styling.

Acceptance criteria:

- Shared components use common tokens rather than one-off styling.
- `index.css` owns the copied palette and global tokens.
- Visual treatment is consistent across home, catalog, item detail, cart, checkout, and contact pages.
- Design supports the handmade/personal brand without reducing usability.

## Implementation todos

1. Set up application foundations: routes, shared shell, copied `index.css` design tokens, responsive base styles, and reusable UI primitives.
2. Create OneDrive JSON CMS/data layer for categories as tag views, items, flat image references, featured item ID lists, artist bio, markets, and translations.
3. Implement i18n provider, translation fallback, language switcher, and localStorage persistence.
4. Implement catalog/search category tag filtering, breadcrumbs, filters, item grid, and infinite scroll.
5. Implement item detail page with responsive gallery, predefined front-end-translated characteristics, tag/category chips, and add-to-cart behavior.
6. Implement cart service, header badge, cart drawer, remove/clear actions, localStorage persistence, and checkout navigation.
7. Implement checkout page, order number generation, validation, order summary, submission adapter, confirmation, and cart clearing.
8. Implement contact page with bio, market dates, social/email links, map/address section, and contact form.
9. Implement homepage hero, featured category carousel, featured item grid, artist teaser, and footer links.
10. Complete responsive behavior across mobile and desktop for navigation, grids, detail pages, filters, cart drawer, and forms.
11. Polish visual design using the copied `index.css` palette, shared tokens, typography, imagery treatment, subtle interactions, and accessibility states while avoiding one-off styles.
12. Validate the end-to-end journey: home → catalog → item detail → cart → checkout → confirmation, plus contact and language switching.

## Dependencies and sequencing

- Foundations must come first because every page depends on routing, layout, styles, and shared components.
- OneDrive JSON CMS/data modeling should be completed before catalog, homepage, item detail, and contact pages.
- i18n should be established early so components are built with translation keys from the start.
- Catalog and item detail should precede cart integration because add-to-cart actions originate there.
- Cart must precede checkout because checkout summarizes and submits cart contents.
- Responsive and visual polish should happen throughout, with a final pass after all user-facing surfaces exist.
