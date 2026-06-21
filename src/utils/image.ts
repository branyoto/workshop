export function getThumbnailUrl(id: string): string {
  return _getItemImageUrl(id, 'thumbnail');
}

export function getItemImageUrl(id: string, index: number): string {
  return _getItemImageUrl(id, index.toLocaleString().padStart(2, '0'));
}

function _getItemImageUrl(id: string, suffix: string): string {
  const baseUrl = import.meta.env.VITE_CMS_IMAGE_BASE_URL;
  if (!baseUrl) throw new Error('VITE_CMS_IMAGE_BASE_URL is not configured');
  const normalizedBase = baseUrl.replace(/\/$/, '');
  return `${normalizedBase}/${id}_${suffix}.png`;
}
