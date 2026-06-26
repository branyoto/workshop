import clsx from 'clsx';
import i18n, { LANGUAGES, type Languages } from '../../services/i18n/i18n';
import { useTranslation } from 'react-i18next';

function switchLanguage(lang: Languages) {
  void i18n.changeLanguage(lang);
}

export function LanguageSwitcher({ className }: Readonly<{ className?: string }>) {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language as Languages;

  return (
    <div className={clsx('flex items-center gap-1', className)} aria-label="Language switcher">
      {LANGUAGES.map(lang => (
        <button
          key={lang}
          type="button"
          onClick={() => switchLanguage(lang)}
          className={clsx(
            'rounded-md px-2 py-1 text-xs font-medium uppercase transition-colors',
            current === lang ? 'bg-primary/60 text-gray-900' : 'text-gray-600 hover:bg-neutral/20',
          )}
          aria-pressed={current === lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
