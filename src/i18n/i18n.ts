import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

const STORAGE_KEY = 'artisan_language';
const storedLang = globalThis.localStorage?.getItem(STORAGE_KEY);
const lng = storedLang === 'en' ? 'en' : 'fr';

i18n.use(initReactI18next).init({
  lng,
  fallbackLng: 'fr',
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  interpolation: { escapeValue: false },
  saveMissing: import.meta.env.DEV,
  missingKeyHandler: import.meta.env.DEV
    ? (_lngs, _ns, key) => {
        console.warn(`[i18n] Missing key "${key}" — falling back to fr`);
      }
    : undefined,
});

i18n.on('languageChanged', lang => {
  globalThis.localStorage?.setItem(STORAGE_KEY, lang);
});

export default i18n;

