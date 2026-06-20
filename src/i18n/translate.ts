import { getLocale } from './locale';
import { messages } from './messages';

export function translate(key: string): string {
  const locale = getLocale();
  return messages[locale][key] ?? messages.fr[key] ?? `[missing:${key}]`;
}
