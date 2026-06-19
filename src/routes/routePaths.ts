export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  item: '/item/:id',
  checkout: '/checkout',
  contact: '/contact',
} as const;

export function homeUrl(): string {
  return ROUTES.home;
}

export function catalogUrl(): string {
  return ROUTES.catalog;
}

export function categoryUrl(
  categoryId: string,
  subcategoryId?: string,
  subId?: string,
): string {
  const segments = [categoryId, subcategoryId, subId].filter(Boolean);
  return `/catalog/${segments.join('/')}`;
}

export function itemUrl(id: string): string {
  return `/item/${id}`;
}

export function checkoutUrl(): string {
  return ROUTES.checkout;
}

export function contactUrl(): string {
  return ROUTES.contact;
}
