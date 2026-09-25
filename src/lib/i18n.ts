'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '@/src/locales/ar/translation.json';
import en from '@/src/locales/en/translation.json';

export const supportedLanguages = ['en', 'ar'] as const;
export type Language = (typeof supportedLanguages)[number];

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
