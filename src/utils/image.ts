export function getImageBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_CMS_IMAGE_BASE_URL;
  if (!baseUrl) throw new Error('VITE_CMS_IMAGE_BASE_URL is not configured');
  return baseUrl.replace(/\/$/, '');
}

export function getCategoryImageUrl(id: string): string {
  return `${getImageBaseUrl()}/categories/${id}_thumbnail}.png`;
}

export function getProductImageUrl(id: string, index: number = 1): string {
  return `${getImageBaseUrl()}/products/${id}_${index}.png`;
}
