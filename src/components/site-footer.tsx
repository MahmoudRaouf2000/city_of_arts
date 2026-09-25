'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BrandMark } from '@/src/components/brand-mark';

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#0e0d0d] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 border-b border-white/12 pb-14 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-4"><BrandMark /><div><p className="font-semibold">{t('brand.name')}</p><p className="text-xs text-white/45">{t('brand.arabic')}</p></div></div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">{t('footer.summary')}</p>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#d7b567]">{t('footer.programme')}</p>
            <div className="flex flex-col gap-3 text-sm text-white/65"><Link href="/#programme" className="hover:text-white">{t('nav.events')}</Link><Link href="/#venues" className="hover:text-white">{t('nav.venues')}</Link><Link href="/#about" className="hover:text-white">{t('nav.about')}</Link></div>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#d7b567]">{t('footer.information')}</p>
            <p className="flex items-start gap-2 text-sm leading-6 text-white/65"><MapPin className="mt-1 size-4 shrink-0 text-[#d7b567]" /> {t('footer.address')}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-7 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {t('footer.copyright')}</p><p>{t('brand.eyebrow')}</p>
        </div>
      </div>
    </footer>
  );
}
