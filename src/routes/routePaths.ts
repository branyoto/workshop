export const ROUTES = { home: '/', catalog: '/catalog', item: '/item/:id', checkout: '/checkout', contact: '/contact' } as const;

export function homeUrl(): string {
  return ROUTES.home;
}

export function catalogUrl(): string {
  return ROUTES.catalog;
}

export function categoryUrl(...categoryIds: (string | undefined | null)[]): string {
  return `/catalog/${categoryIds.filter(Boolean).join('/')}`;
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
