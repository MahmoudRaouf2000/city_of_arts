'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function VisitSection() {
  const { t } = useTranslation();
  return (
    <section id="visit" className="relative isolate overflow-hidden bg-[#7e2133] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="absolute inset-y-0 end-0 -z-10 w-1/2 opacity-25 [background:repeating-linear-gradient(135deg,transparent_0,transparent_22px,#d7b567_23px,#d7b567_24px)]" />
      <div className="absolute -end-28 top-1/2 -z-10 size-[430px] -translate-y-1/2 rounded-full border border-[#d7b567]/30 sm:size-[620px]" />
      <div className="absolute -end-10 top-1/2 -z-10 size-[280px] -translate-y-1/2 rounded-full border border-[#d7b567]/30 sm:size-[440px]" />
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#e2c678]">{t('visit.eyebrow')}</p>
        <h2 className="display-type max-w-4xl text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-7xl lg:text-8xl">{t('visit.title')}</h2>
        <div className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">{t('visit.body')}</p>
          <a href="#programme" className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-[#d7b567] px-6 py-3 text-sm font-bold text-[#17120b] transition-colors hover:bg-white">
            {t('visit.button')} <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
