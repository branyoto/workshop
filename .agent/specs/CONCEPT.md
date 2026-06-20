# CONCEPT.md — Artisanal Creations Website

## Project Overview

A responsive showcase and ordering website for a solo artisan selling handmade creations.  
The site allows visitors to browse items, get details, build a cart, and submit an order via email.  
No account system, no online payment — the artist handles order confirmation and delivery fees manually.

---

## Target Audience

- Individuals looking for unique handmade gifts (baby showers, weddings, birthdays, Christmas, Easter…)
- Visitors at local artisan markets who want to follow up online
- French-speaking audience primarily; English support for international visitors

---

## Creation Catalogue

The artist currently sells the following categories (extensible):

| Category | Description |
|---|---|
| **Diaper Cakes** (*Gâteaux de couches*) | Decorative fake cakes assembled from diapers and baby consumables (nursing bottles, bibs, pacifiers, etc.) |
| **Crochet Plushies** (*Peluches crochet*) | Stuffed animal plushies handmade in crochet |
| **Crochet Accessories** (*Accessoires crochet*) | Hairbands, bob hats, bags and other crochet accessories |
| **Jewellery** (*Bijoux*) | Pearl and epoxy jewellery: bracelets, earrings |
| **Suncatchers / Dreamcatchers** | Decorative window or wall hangings |

New categories can be added at any time by the admin without code changes.

---

## Information Architecture & Navigation

### Pages

```
Home (/)
│
├── Catalogue (/catalogue)
│   └── [Category] (/catalogue/:category)
│       └── [Subcategory] (/catalogue/:category/:subcategory)
│           └── [Sub-subcategory] (/catalogue/:category/:subcategory/:sub)
│
├── Item Detail (/item/:id)
│
└── Contact (/contact)
```

### Navigation Bar

- Logo / Brand name (left)
- Category links (centre or hamburger on mobile)
- Cart icon with item count badge (right)
- Language switcher FR | EN (right)

---

## Pages & Features

### Home Page

- Hero section: full-width banner with a tagline and a CTA ("Découvrir les créations")
- Featured items carousel or grid (handpicked by admin)
- Short "about the artist" blurb
- Link to the contact page / upcoming markets

### Catalogue / Category Page

- Breadcrumb navigation
- Category title and optional description
- Item grid: card view showing — thumbnail, title, price
- Filters sidebar / dropdown:
  - Price range
  - Colour
  - Tags (multi-select)
- Categories are **tag-driven**: a category maps to one or more tags; parent categories include all child-category tags automatically
- Category hierarchy: up to **3 levels** (e.g. `Accessories > Hats > Bob`)
- Categories and their tag mappings are **editable by the admin** without code changes

### Item Detail Page

- Multiple photos (gallery / swiper)
- Title + price
- Availability badge ("En stock" / "Épuisé") — each item currently has stock of 1
- Description:
  - Diaper cakes: composition (number of diapers, included accessories)
  - Crochet items: materials, colours available
  - Jewellery: materials, dimensions
  - Suncatchers: materials, dimensions
- Tags (clickable — navigate to matching category)
- "Add to cart" button (disabled when out of stock)

### Cart

- Stored entirely client-side (localStorage)
- List of selected items with thumbnail, title, price
- Remove item option
- Order total (before delivery — delivery fees communicated after)
- "Passer commande" / "Place order" button → opens order form

### Order Form (modal or dedicated page)

- Auto-generated order number (e.g. `CMD-20240601-0042`)
- Order summary (read-only list of items + total)
- **Mandatory contact field** — at least one of:
  - Email address
  - Phone number
  - Postal address
- Optional: message / notes
- Submit → sends an email to the artist containing:
  - Order number
  - Item list with prices
  - Total (excl. delivery)
  - Customer contact details
  - Customer notes
- Confirmation message shown to user after submission
- Cart is cleared after successful submission

> **Note:** Delivery fees are NOT calculated by the site. The artist contacts the customer to agree on delivery.

### Contact Page

- Short bio / artist presentation
- What she makes (brief overview of categories)
- Contact methods (email, social media links, etc.)
- Section: "Find me at markets" — list of upcoming market dates/locations (editable by admin)
- Embedded map or address if applicable

---

## Content Management & Admin

The following must be editable without code changes (via a config file, CMS, or admin panel TBD):

- Categories and subcategories (up to 3 levels), with their associated tags
- Items (title, description, price, images, tags, availability)
- Featured items on the Home page
- Upcoming market dates on the Contact page
- Artist bio / presentation text

---

## Tags System

- Every item carries **one or more tags**
- Tags are free-form strings (e.g. `crochet`, `baby`, `jewellery`, `pearl`, `xmas`, `easter`, `birthday`)
- Categories are defined as a mapping of `category slug → [tags]`
- Browsing a parent category shows all items matching any tag of itself or its descendants

---

## Internationalisation (i18n)

- **Default language: French**
- Supported languages: **French (fr)**, **English (en)**
- Fallback: if a translation key is missing in English, fall back to French
- All UI labels, navigation, placeholders, and error messages must be translatable
- Item content (title, description) should support per-language fields; fall back to French if English is absent
- Language preference stored in localStorage; switchable via the language toggle

---

## Cart & Order — Technical Behaviour

- Cart stored in `localStorage` under a namespaced key (e.g. `artisan_cart`)
- Cart holds: item ID, title, price snapshot, thumbnail URL
- Order number format: `CMD-YYYYMMDD-XXXX` (date + 4-digit sequence, generated client-side)
- Order submission sends the email via a **mailto:** link or a lightweight serverless email endpoint (to be decided)
- After order submission, cart is cleared and the order number is displayed for the customer's reference

---

## Out of Scope (v1)

- User authentication / accounts
- Online payment processing
- Package tracking / delivery management
- "All products" mega-page (may be added later)
- Wishlist / favourites
- Customer reviews

---

## Future Considerations

- Adding new creation types (admin adds a new tag + category)
- Seasonal promotions highlighted via event tags
- Integration with a headless CMS (Sanity, Contentful…) for easier content editing
- Optional payment gateway (Stripe) in v2
