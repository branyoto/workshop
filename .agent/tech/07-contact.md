# Technical Spec — US06 Contact Page

## New components

- `src/pages/ContactPage.tsx`
- `src/components/contact/ArtistBio.tsx`
- `src/components/contact/MarketDates.tsx`
- `src/components/contact/SocialLinks.tsx`
- `src/components/contact/ContactMap.tsx`
- `src/components/contact/ContactForm.tsx`

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

- `contact.meta.title`
- `contact.title`
- `contact.bio.title`
- `contact.categories.title`
- `contact.markets.title`
- `contact.markets.empty.title`
- `contact.markets.empty.description`
- `contact.social.title`
- `contact.email.title`
- `contact.map.title`
- `contact.form.title`
- `contact.form.name`
- `contact.form.email`
- `contact.form.message`
- `contact.form.submit`
- `contact.form.submitting`
- `contact.form.success`
- `contact.form.error`
- `contact.validation.nameRequired`
- `contact.validation.emailRequired`
- `contact.validation.emailInvalid`
- `contact.validation.messageRequired`

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

