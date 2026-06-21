import { useTranslation } from 'react-i18next';
import type { LocalizedText } from './types';

/**
 * Returns a `l()` function bound to the current UI locale.
 * TanStack Query (staleTime/gcTime: Infinity) already deduplicates and caches
 * CMS fetches — no additional React Context is needed.
 */
export function useLocalize(): (text: LocalizedText) => string {
  const { i18n } = useTranslation();
  const locale = i18n.language as 'fr' | 'en';
  return (text: LocalizedText) => (locale === 'en' && text.en ? text.en : text.fr);
}
