import { useTranslation } from 'react-i18next';
import type { LocalizedText } from './types';
import type { Languages } from '../../i18n/i18n';

export type LocalizeText = (text: LocalizedText) => string;

/**
 * Returns a `l()` function bound to the current UI locale.
 * TanStack Query (staleTime/gcTime: Infinity) already deduplicates and caches
 * CMS fetches — no additional React Context is needed.
 */
export function useLocalize(): LocalizeText {
  const { i18n } = useTranslation();
  const locale = i18n.language as Languages;
  return text => (locale === 'en' && text.en ? text.en : text.fr);
}
