import type { Locale, LocalizedText } from './types';

export function localize(text: LocalizedText, locale: Locale): string {
  if (locale === 'en' && text.en) {
    return text.en;
  }

  return text.fr;
}
