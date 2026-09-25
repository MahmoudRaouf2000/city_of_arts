'use client';

import { useTranslation } from 'react-i18next';

export function AboutSection() {
  const { t } = useTranslation();
  const stats = [
    { value: '1988', label: t('about.stat1') },
    { value: '07', label: t('about.stat2') },
    { value: '01', label: t('about.stat3') },
  ];

  return (
    <section id="about" className="overflow-hidden bg-[#f2efe8] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div className="relative min-h-[420px] overflow-hidden sm:min-h-[580px]">
          <img src="/media/hero-3.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-x-6 bottom-6 border-t border-white/30 pt-4 text-xs font-semibold uppercase tracking-[.18em] text-white/75">
            {t('brand.eyebrow')}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#7e2133]">{t('about.eyebrow')}</p>
          <h2 className="display-type max-w-2xl text-4xl font-medium leading-[1.03] tracking-[-.035em] sm:text-6xl lg:text-7xl">{t('about.title')}</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#665f56] sm:text-lg">{t('about.body')}</p>
          <div className="mt-12 grid grid-cols-3 border-y border-[#cbc3b5] py-7">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`px-3 first:ps-0 ${index > 0 ? 'border-s border-[#cbc3b5]' : ''}`}>
                <strong className="display-type block text-3xl font-medium text-[#7e2133] sm:text-5xl">{stat.value}</strong>
                <span className="mt-2 block text-xs leading-5 text-[#6f675d] sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
