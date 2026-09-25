'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const venues = [
  { id: 'main', image: '/media/main-hall.png', number: '01' },
  { id: 'gomhouria', image: '/media/gomhouria.png', number: '02' },
  { id: 'small', image: '/media/small-hall.png', number: '03' },
] as const;

export function VenuesSection() {
  const { t } = useTranslation();
  return (
    <section id="venues" className="bg-[#171514] py-20 text-white sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#d7b567]">{t('venues.eyebrow')}</p>
            <h2 className="display-type text-4xl font-medium leading-[1.05] tracking-[-.035em] sm:text-6xl">{t('venues.title')}</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg sm:leading-8">{t('venues.description')}</p>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {venues.map((venue) => (
              <article key={venue.id} className="group grid gap-5 py-7 sm:grid-cols-[160px_1fr_auto] sm:items-center">
                <div className="relative h-36 overflow-hidden sm:h-28">
                  <img src={venue.image} alt={t(`venues.${venue.id}.name`)} className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                  <span className="absolute start-2 top-2 bg-[#d7b567] px-2 py-1 text-[10px] font-bold text-[#17120b]">{venue.number}</span>
                </div>
                <div>
                  <h3 className="display-type text-2xl font-medium sm:text-3xl">{t(`venues.${venue.id}.name`)}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{t(`venues.${venue.id}.detail`)}</p>
                </div>
                <span className="hidden size-11 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-[#d7b567] group-hover:text-[#d7b567] sm:grid">
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
