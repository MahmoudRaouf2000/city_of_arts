'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '@/src/lib/i18n';

export function useLanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('lang');
    const stored = window.localStorage.getItem('cairo-opera-language');
    const preferred: Language = query === 'ar' || query === 'en'
      ? query
      : stored === 'ar' || stored === 'en' ? stored
      : window.navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    if (query === 'ar' || query === 'en') window.localStorage.setItem('cairo-opera-language', query);
    document.documentElement.lang = preferred;
    document.documentElement.dir = preferred === 'ar' ? 'rtl' : 'ltr';
    if (i18n.resolvedLanguage !== preferred) void i18n.changeLanguage(preferred);
  }, [i18n]);
}
