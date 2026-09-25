'use client';

import { useTranslation } from 'react-i18next';
import type { Language } from '@/src/lib/i18n';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage === 'ar' ? 'ar' : 'en';

  const changeLanguage = (language: Language) => {
    void i18n.changeLanguage(language);
    window.localStorage.setItem('cairo-opera-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div aria-label={t('actions.language')} className="flex items-center rounded-full border border-white/25 bg-black/15 p-1 text-xs font-semibold text-white backdrop-blur-md">
      {(['en', 'ar'] as const).map((language) => (
        <button key={language} type="button" onClick={() => changeLanguage(language)} aria-pressed={current === language}
          className={`min-w-9 rounded-full px-2.5 py-1.5 transition-colors ${current === language ? 'bg-[#d7b567] text-[#17120b]' : 'text-white/75 hover:text-white'} ${compact ? 'text-[11px]' : ''}`}>
          {language === 'en' ? 'EN' : 'ع'}
        </button>
      ))}
    </div>
  );
}
