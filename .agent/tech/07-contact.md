# Technical Spec — US06 Contact Page

## New components

- `src/pages/contact/ContactPage.tsx`
- `src/pages/contact/ArtistBio.tsx`
- `src/pages/contact/MarketDates.tsx`
- `src/pages/contact/SocialLinks.tsx`
- `src/pages/contact/ContactMap.tsx`
- `src/pages/contact/ContactForm.tsx`

## Reused components

- `AppShell`
- `Button`
- `EmptyState`
- `Snackbar`
- `Card`

## Explicit URLs

- Contact page URL: `/contact`
- Email link URL: `mailto:${artistEmail}`
- Social URLs: provided by CMS `settings.socialLinks[]`
- Map URL: provided by CMS `settings.mapUrl`
- Contact form submission: same `mailto:` adapter pattern as checkout unless a serverless endpoint is configured later.

## Translation keys

- `pages.contact.meta.title`
- `pages.contact.title`
- `pages.contact.bio.title`
- `pages.contact.categories.title`
- `pages.contact.markets.title`
- `pages.contact.markets.empty.title`
- `pages.contact.markets.empty.description`
- `pages.contact.social.title`
- `pages.contact.email.title`
- `pages.contact.map.title`
- `pages.contact.form.title`
- `pages.contact.form.name`
- `pages.contact.form.email`
- `pages.contact.form.message`
- `pages.contact.form.submit`
- `pages.contact.form.submitting`
- `pages.contact.form.success`
- `pages.contact.form.error`
- `pages.contact.validation.nameRequired`
- `pages.contact.validation.emailRequired`
- `pages.contact.validation.emailInvalid`
- `pages.contact.validation.messageRequired`

## CSS classes

- `contact-page`
- `contact-page__section`
- `artist-bio`
- `artist-bio__image`
- `artist-bio__content`
- `market-dates`
- `market-dates__list`
- `market-dates__item`
- `social-links`
- `social-links__item`
- `contact-map`
- `contact-form`
- `contact-form__field`
- `contact-form__actions`

## Implementation details

- Bio, market dates, social links, email, map URL, and address come from the OneDrive JSON CMS.
- Market dates are sorted chronologically.
- Render an empty state when no future market dates exist.
- Do not expose a precise private studio location unless `mapUrl` or `address` is explicitly configured.
- Contact form produces an email-ready message for the artist.
