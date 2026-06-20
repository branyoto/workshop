export function getThumbnailUrl(id: string): string {
  const baseUrl = import.meta.env.VITE_CMS_IMAGE_BASE_URL;

  if (!baseUrl) {
    throw new Error('VITE_CMS_IMAGE_BASE_URL is not configured');
  }

  const normalizedBase = baseUrl.replace(/\/$/, '');
  return `${normalizedBase}/${id}_thumbnail.png`;
}
