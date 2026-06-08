# Technical Spec — US04 Cart and US05 Checkout

## New components and modules

- `src/pages/cart/utils/types.ts`
- `src/pages/cart/utils/cartStorage.ts`
- `src/pages/cart/utils/useCart.ts`
- `src/pages/cart/CartIconButton.tsx`
- `src/pages/cart/CartItemRow.tsx`
- `src/pages/cart/CartSummary.tsx`
- `src/pages/order/orderNumber.ts`
- `src/pages/order/orderSubmission.ts`
- `src/pages/checkout/CheckoutPage.tsx`
- `src/pages/checkout/CheckoutForm.tsx`
- `src/pages/checkout/AddressField.tsx`
- `src/pages/checkout/OrderSummary.tsx`
- `src/pages/checkout/OrderConfirmation.tsx`

## Reused components

- `CartDrawer`
- `Drawer`
- `Button`
- `IconButton`
- `Price`
- `EmptyState`
- `Snackbar`
- `ItemCard` add-to-cart behavior

## Explicit URLs

- Checkout URL: `/checkout`
- Empty cart recovery target: `/catalog`
- Cart drawer is not a separate URL.
- Add-to-cart source URLs:
  - `/catalog`
  - `/catalog/:categoryId`
  - `/catalog/:categoryId/:subcategoryId`
  - `/catalog/:categoryId/:subcategoryId/:subId`
  - `/item/:id`

## Storage

- Cart localStorage key: `artisan_cart`
- Past order numbers localStorage key: `artisan_order_numbers`
- Cart item shape:
  - `id`
  - `title`
  - `price`
  - `thumbnail`

## Translation keys

- `pages.cart.title`
- `pages.cart.open`
- `pages.cart.close`
- `pages.cart.count`
- `pages.cart.empty.title`
- `pages.cart.empty.description`
- `pages.cart.remove`
- `pages.cart.clear`
- `pages.cart.total`
- `pages.cart.proceedToCheckout`
- `pages.cart.added`
- `pages.cart.alreadyInCart`
- `pages.cart.unavailable`
- `pages.checkout.meta.title`
- `pages.checkout.title`
- `pages.checkout.empty.title`
- `pages.checkout.empty.description`
- `pages.checkout.backToCatalog`
- `pages.checkout.form.name`
- `pages.checkout.form.email`
- `pages.checkout.form.phone`
- `pages.checkout.form.address`
- `pages.checkout.form.notes`
- `pages.checkout.form.submit`
- `pages.checkout.form.submitting`
- `pages.checkout.validation.nameRequired`
- `pages.checkout.validation.addressRequired`
- `pages.checkout.validation.contactRequired`
- `pages.checkout.validation.emailInvalid`
- `pages.checkout.validation.phoneInvalid`
- `pages.checkout.summary.title`
- `pages.checkout.summary.deliveryNotice`
- `pages.checkout.confirmation.title`
- `pages.checkout.confirmation.description`
- `pages.checkout.confirmation.orderNumber`
- `pages.checkout.error.title`
- `pages.checkout.error.retry`

## CSS classes

- `cart-button`
- `cart-button__badge`
- `cart-drawer`
- `cart-drawer__items`
- `cart-drawer__summary`
- `cart-item`
- `cart-item__media`
- `cart-item__body`
- `cart-item__title`
- `cart-item__price`
- `cart-summary`
- `cart-summary__total`
- `checkout-page`
- `checkout-page__layout`
- `checkout-form`
- `checkout-form__field`
- `checkout-form__actions`
- `address-field`
- `order-summary`
- `order-summary__items`
- `order-summary__total`
- `order-confirmation`

## Implementation details

- All cart writes go through `useCart`/`cartStorage`.
- Prevent duplicate unique items.
- Generate order numbers as `CMD-YYYYMMDD-XXXX`, where `XXXX` is a random 4-digit number.
- Require name and postal address.
- Require at least one contact method among email and phone.
- Validate email and phone only when provided.
- Address uses Google Maps integration only when config exists; otherwise use a normal address field.
- Submission starts as a swappable `mailto:` adapter.
- Clear cart only after successful order submission handoff.
- Use React Router navigation for checkout redirects and links.
