# Technical Spec — US04 Cart and US05 Checkout

## New components and modules

- `src/cart/types.ts`
- `src/cart/cartStorage.ts`
- `src/cart/useCart.ts`
- `src/order/orderNumber.ts`
- `src/order/orderSubmission.ts`
- `src/pages/CheckoutPage.tsx`
- `src/components/cart/CartIconButton.tsx`
- `src/components/cart/CartItemRow.tsx`
- `src/components/cart/CartSummary.tsx`
- `src/components/checkout/CheckoutForm.tsx`
- `src/components/checkout/AddressField.tsx`
- `src/components/checkout/OrderSummary.tsx`
- `src/components/checkout/OrderConfirmation.tsx`

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

- `cart.title`
- `cart.open`
- `cart.close`
- `cart.count`
- `cart.empty.title`
- `cart.empty.description`
- `cart.remove`
- `cart.clear`
- `cart.total`
- `cart.proceedToCheckout`
- `cart.added`
- `cart.alreadyInCart`
- `cart.unavailable`
- `checkout.meta.title`
- `checkout.title`
- `checkout.empty.title`
- `checkout.empty.description`
- `checkout.backToCatalog`
- `checkout.form.name`
- `checkout.form.email`
- `checkout.form.phone`
- `checkout.form.address`
- `checkout.form.notes`
- `checkout.form.submit`
- `checkout.form.submitting`
- `checkout.validation.nameRequired`
- `checkout.validation.addressRequired`
- `checkout.validation.contactRequired`
- `checkout.validation.emailInvalid`
- `checkout.validation.phoneInvalid`
- `checkout.summary.title`
- `checkout.summary.deliveryNotice`
- `checkout.confirmation.title`
- `checkout.confirmation.description`
- `checkout.confirmation.orderNumber`
- `checkout.error.title`
- `checkout.error.retry`

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
