
This file describe how the website should look and work from the user perspective.

## User Journey

1. User lands on the Home page, sees featured items and can browse categories
2. User clicks on an item to view its details
3. User can add the item to their cart
4. User can view their cart and proceed to checkout
5. User can use the checkout page to enter their information and place an order (no payment)

## User Stories

### As a visitor, I want to see a visually appealing homepage that showcases the artist's work and encourages me to explore the catalogue.
- A header with a left drawer menu for categories, a central logo, and a right section with the cart icon and language switcher.
- A full-width banner with a tagline and a call-to-action button ("Découvrir les créations")
- A carousel of featured categories handpicked by the admin
- A grid of featured items (also handpicked by the admin)
- A footer with links to the contact page, social media, and legal information
### As a visitor, I want to easily find items that interest me by browsing categories and applying filters.
- A clear category hierarchy with up to 3 levels (e.g. `Accessories > Head > Bob`)
- A breadcrumb navigation to keep track of where I am in the catalogue
- Filters for price range, color, availability (checkbox), and tags (multi-select)
- A filtered grid of items showing a thumbnail, title, price, and availability badge ("En stock" / "Épuisé")
- Infinite scroll to load more items as I browse
### As a visitor, I want to see detailed information about each item, including price, availability, and description.
- A gallery of photos for each item in a carousel (desktop) or swiper (mobile) format
- The item title and price prominently displayed
- The item categories and tags listed
- An availability badge indicating whether the item is in stock or sold out
- A description of the item (optional)
- Item characteristics (optional) such as dimensions, materials, color, etc.
- An "Add to Cart" button (disabled if out of stock) 
- No reviews or ratings for now, as the artist prefers to keep it simple and personal
- No item quantity for now, as each item is unique and has a stock of 1
### As a visitor, I want to add items to my cart and review my selection before placing an order.
- A cart icon in the navigation bar with a badge showing the number of items in the cart
- A cart drawer that lists the items added to the cart, showing their thumbnail, title, price, and a remove button
  - The drawer can be opened by clicking the cart icon and closed by clicking outside or on a close button
  - The cart contents are stored in local storage to persist across page reloads
  - The cart does not support item quantities for now, as each item is unique and has a stock of 1
  - The total price of the items in the cart is displayed at the bottom of the drawer
- A "Proceed to Checkout" button in the cart drawer that takes the user to a checkout
- A button to clear the cart and start over
- A button on the item detail page to add the item to the cart (disabled if out of stock)
- A button on the category page to add items to the cart directly from the item cards (disabled if out of stock, only displayed on hover)
### As a visitor, I want to place an order by providing my contact information and any special instructions.
- A checkout page with a form to enter the user's name, email, phone number, and address with Google Maps integration
- A textarea for special instructions or comments about the order
- A summary of the items in the cart, showing their thumbnail, title, price, and total price
- A "Place Order" button that submits the order (no payment integration for now)
### As a visitor, I want to see the artist's bio and upcoming market dates on the Contact page.
- A section on the Contact page with a short bio of the artist and a list of upcoming market dates and locations
- The artist's social media links (e.g. Instagram) for visitors to follow and see more of their work
- The artist's email address for direct contact
- A map showing the location of the artist's studio or market stalls
- A simple contact form (name, email, message) that sends an email to the artist
### As a visitor, I want to switch between French and English languages to better understand the content.
- A language switcher at the bottom left drawer that allows me to toggle between French and English
- The website content (navigation, page titles, item descriptions, etc.) should be translated accordingly when I switch languages
- The language preference should be stored in local storage to persist across page reloads
- The default language should be French, as the artist is based in France and most of their customers are French-speaking
### As a visitor, I want to preview the website on both mobile and desktop devices.
- The website should be responsive and adapt to different screen sizes and orientations
- On mobile devices, the navigation bar should collapse into a hamburger menu that opens a drawer with the category links and language switcher
- The item grid should adjust to show fewer items per row on smaller screens (e.g. 4 items per row on desktop, 2 items per row on mobile)
- The item detail page should stack the photos and description vertically on mobile for easier scrolling
- The cart drawer should take up the full screen on mobile for better usability
### As a visitor, I want to see a consistent and visually appealing design that reflects the artist's style and brand.
- A cohesive color scheme, typography, and imagery that align with the artist's aesthetic
- A clean and intuitive layout that highlights the artwork and makes it easy to navigate
- High-quality photos of the items that showcase their details and craftsmanship
- Subtle animations and interactions that enhance the user experience without being distracting
- A design that feels personal and authentic, reflecting the artist's unique style and story
