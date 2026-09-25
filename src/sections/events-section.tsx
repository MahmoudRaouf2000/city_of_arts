'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { events, type EventItem } from '@/src/data/events';

function EventCard({ event, featured = false }: { event: EventItem; featured?: boolean }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === 'ar' ? 'ar-EG' : 'en-GB';
  const date = new Date(event.date);
  const day = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
  const title = t(`events.items.${event.id}.title`);

  return (
    <article className={`event-card group relative overflow-hidden bg-[#191716] text-white ${featured ? 'min-h-[570px] lg:col-span-2 lg:row-span-2' : 'min-h-[420px]'}`}>
      <img src={event.image} alt={title} style={{ objectPosition: event.imagePosition }} className="event-card-image absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="absolute start-5 top-5 flex min-w-16 flex-col items-center bg-[#f2efe8] px-3 py-2 text-[#171514]">
        <span className="display-type text-2xl font-semibold leading-none">{day}</span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#7e2133]">{month}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-[#d7b567]">
          {t(`events.items.${event.id}.category`)} <span className="h-px w-7 bg-current" />
        </div>
        <h3 className={`display-type font-medium leading-tight ${featured ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{title}</h3>
        <p className={`mt-3 max-w-xl text-sm leading-6 text-white/68 ${featured ? 'block' : 'line-clamp-2'}`}>{t(`events.items.${event.id}.description`)}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/18 pt-4 text-xs text-white/70">
          <span className="inline-flex items-center gap-2"><Clock3 className="size-3.5 text-[#d7b567]" /> <bdi>{event.time}</bdi></span>
          <span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-[#d7b567]" /> {t(`events.items.${event.id}.venue`)}</span>
          <Link href={`/booking?event=${event.id}`} aria-label={`${t('actions.details')}: ${title}`} className="ms-auto grid size-9 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-[#d7b567] group-hover:bg-[#d7b567] group-hover:text-[#17120b]">
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function EventsSection() {
  const { t } = useTranslation();
  return (
    <section id="programme" className="bg-[#f2efe8] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 grid items-end gap-7 lg:grid-cols-[1fr_420px] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#7e2133]">{t('events.eyebrow')}</p>
            <h2 className="display-type max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-.035em] sm:text-6xl lg:text-7xl">{t('events.title')}</h2>
          </div>
          <p className="border-s border-[#b79855] ps-5 text-base leading-7 text-[#665f56] sm:text-lg">{t('events.intro')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => <EventCard key={event.id} event={event} featured={index === 0} />)}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#programme" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#171514] px-6 py-3 text-sm font-bold transition-colors hover:bg-[#171514] hover:text-white">
            {t('actions.allEvents')} <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
