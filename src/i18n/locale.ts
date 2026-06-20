export type Locale = 'fr' | 'en';

const STORAGE_KEY = 'artisan_language';

export function getLocale(): Locale {
  const stored = globalThis.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' ? 'en' : 'fr';
}
