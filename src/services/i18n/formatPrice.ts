import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type FormatPriceOptions = Omit<Intl.NumberFormatOptions, 'currency' | 'style'>;

export function formatPrice(language: string, amount: number, options?: FormatPriceOptions): string {
  return new Intl.NumberFormat(language === 'en' ? 'en-GB' : 'fr-FR', { style: 'currency', currency: 'EUR', ...options }).format(amount);
}

export function useFormatPrice() {
  const {
    i18n: { language },
  } = useTranslation();
  return useCallback((amount: number, options?: FormatPriceOptions) => formatPrice(language, amount, options), [language]);
}
