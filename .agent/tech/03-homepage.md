# Technical Spec — US01 Homepage Discovery

## New components

- `src/pages/home/HomePage.tsx`
- `src/pages/home/HeroSection.tsx`
- `src/pages/home/FeaturedCategoryCarousel.tsx`
- `src/pages/home/FeaturedItemsSection.tsx`
- `src/pages/home/ArtistTeaser.tsx`

## Reused components

- `AppShell`
- `SiteHeader`
- `SiteFooter`
- `CategoryDrawer`
- `CartDrawer`
- `Button`
- `Card`
- `Badge`
- `Price`
- `ItemCard`

## Explicit URLs

- Homepage URL: `/`
- Hero CTA target: `/catalog`
- Featured category card target: `/catalog/:categoryId`
- Nested featured category card target if configured:
  - `/catalog/:categoryId/:subcategoryId`
  - `/catalog/:categoryId/:subcategoryId/:subId`
- Featured item card target: `/item/:id`
- Contact teaser target: `/contact`
- Footer CGV target: URL from CMS `legalLinks[key="cgv"]`
- Footer CGU target: URL from CMS `legalLinks[key="cgu"]`

## Translation keys

- `pages.home.meta.title`
- `pages.home.hero.title`
- `pages.home.hero.tagline`
- `pages.home.hero.cta`
- `pages.home.featuredCategories.title`
- `pages.home.featuredCategories.previous`
- `pages.home.featuredCategories.next`
- `pages.home.featuredCategories.empty`
- `pages.home.featuredItems.title`
- `pages.home.featuredItems.empty`
- `pages.home.artistTeaser.title`
- `pages.home.artistTeaser.cta`
- `footer.contact`
- `footer.social`
- `footer.legal.cgv`
- `footer.legal.cgu`

## CSS classes

- `home-page`
- `hero-section`
- `hero-section__content`
- `hero-section__title`
- `hero-section__tagline`
- `hero-section__actions`
- `featured-categories`
- `featured-categories__header`
- `featured-categories__track`
- `featured-categories__card`
- `featured-items`
- `featured-items__grid`
- `artist-teaser`
- `artist-teaser__content`

## Implementation details

- Featured categories come from CMS `featuredCategoryIds`.
- Featured items come from CMS `featuredItemIds`.
- Do not read any `featured` field from item records.
- Use `ItemCard` for featured item cards so pricing, availability, and add-to-cart behavior remain consistent.
- Carousel controls must be keyboard accessible and respect reduced motion.
- Use React Router `Link` components for all internal navigation.
