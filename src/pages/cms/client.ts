import type { CmsContent } from './types';

export async function fetchCmsContent(): Promise<CmsContent> {
  const url = import.meta.env.VITE_CMS_URL;

  if (!url) {
    throw new Error('VITE_CMS_URL is not configured');
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS content (${response.status})`);
  }

  return response.json() as Promise<CmsContent>;
}
