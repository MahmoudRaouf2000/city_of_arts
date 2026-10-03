'use client';

import Link from 'next/link';
import { CalendarDays, Clock3, MapPin, ShieldAlert, TicketCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BrandMark } from '@/src/components/brand-mark';
import { LanguageSwitcher } from '@/src/components/language-switcher';
import { events, type EventItem } from '@/src/data/events';
import { useLanguageSync } from '@/src/hooks/use-language-sync';
import '@/src/lib/i18n';

const copy = {
  en: {
    eyebrow: 'Cairo Opera House',
    title: 'Digital admission ticket',
    validHeading: 'Ready to present',
    validBody: 'Show this screen with your booking reference at the entrance.',
    reference: 'Booking reference',
    seats: 'Seats',
    total: 'Total',
    demo: 'Demo ticket',
    demoBody: 'This ticket is displayed from QR data only. It is not securely verified without a booking system.',
    home: 'Homepage',
    book: 'Book another performance',
    invalidTitle: 'Ticket link is incomplete',
    invalidBody: 'The QR code does not contain all the information needed to display this ticket.',
  },
  ar: {
    eyebrow: 'دار الأوبرا المصرية',
    title: 'تذكرة دخول رقمية',
    validHeading: 'جاهزة للتقديم',
    validBody: 'اعرض هذه الشاشة مع رقم الحجز عند بوابة الدخول.',
    reference: 'رقم الحجز',
    seats: 'المقاعد',
    total: 'الإجمالي',
    demo: 'تذكرة تجريبية',
    demoBody: 'تُعرض هذه التذكرة من بيانات رمز QR فقط، ولا يتم التحقق منها بشكل آمن بدون نظام حجوزات.',
    home: 'الصفحة الرئيسية',
    book: 'حجز عرض آخر',
    invalidTitle: 'رابط التذكرة غير مكتمل',
    invalidBody: 'رمز QR لا يحتوي على كل البيانات المطلوبة لعرض التذكرة.',
  },
} as const;

function formatMoney(value: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(value);
}

export function TicketExperience({ reference, eventId, seats, total }: { reference?: string; eventId?: string; seats?: string; total?: string }) {
  useLanguageSync();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'ar' ? 'ar' : 'en';
  const c = copy[language];
  const locale = language === 'ar' ? 'ar-EG' : 'en-GB';
  const event = events.find((item) => item.id === eventId) as EventItem | undefined;
  const seatList = seats?.split(',').filter(Boolean) ?? [];
  const parsedTotal = Number(total);
  const isValid = Boolean(reference && event && seatList.length && Number.isFinite(parsedTotal) && parsedTotal >= 0);

  if (!isValid || !event || !reference) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#eee9df] px-5 py-12 text-[#171514]">
        <section className="w-full max-w-lg border border-[#d3cbbc] bg-[#faf8f2] p-7 text-center shadow-[0_20px_65px_rgba(35,22,16,.12)] sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#7e2133] text-white"><ShieldAlert className="size-7" /></span>
          <h1 className="display-type mt-6 text-3xl font-medium">{c.invalidTitle}</h1>
          <p className="mt-3 text-base leading-7 text-[#6b645c]">{c.invalidBody}</p>
          <Link href="/" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#7e2133] px-6 text-sm font-bold text-white transition-colors hover:bg-[#601625]">{c.home}</Link>
        </section>
      </main>
    );
  }

  const eventTitle = t(`events.items.${event.id}.title`);
  const venue = t(`events.items.${event.id}.venue`);
  const formattedDate = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(event.date));

  return (
    <div className="min-h-screen bg-[#eee9df] text-[#171514]">
      <header className="border-b border-white/10 bg-[#121010] text-white">
        <div className="mx-auto flex h-20 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={t('brand.name')}>
            <BrandMark />
            <span className="hidden text-sm font-semibold sm:block">{t('brand.name')}</span>
          </Link>
          <LanguageSwitcher compact />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <article className="overflow-hidden border border-[#cfc5b3] bg-[#faf8f2] shadow-[0_22px_70px_rgba(35,22,16,.14)]">
          <div className="bg-[#7e2133] px-6 py-8 text-center text-white sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ead18f]">{c.eyebrow}</p>
            <h1 className="display-type mt-3 text-4xl font-medium sm:text-5xl">{c.title}</h1>
          </div>

          <div className="border-b border-dashed border-[#cfc5b3] px-6 py-8 text-center sm:px-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#efe2bf] text-[#7e2133]"><TicketCheck className="size-8" /></span>
            <p className="mt-5 text-lg font-bold">{c.validHeading}</p>
            <p className="mt-1 text-sm leading-6 text-[#6b645c]">{c.validBody}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.14em] text-[#7e2133]">{c.reference}</p>
            <p className="display-type mt-2 break-all text-3xl font-semibold tracking-[.05em]" dir="ltr">{reference}</p>
          </div>

          <div className="p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#7e2133]">{eventTitle}</p>
            <div className="mt-5 space-y-4 text-base text-[#5f5850]">
              <p className="flex items-start gap-3"><CalendarDays className="mt-0.5 size-5 shrink-0 text-[#a57c28]" />{formattedDate}</p>
              <p className="flex items-start gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-[#a57c28]" /><bdi>{event.time}</bdi></p>
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-[#a57c28]" />{venue}</p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4 border-y border-[#ded7cc] py-6">
              <div>
                <p className="text-sm text-[#736b62]">{c.seats}</p>
                <p className="mt-2 text-lg font-bold" dir="ltr">{seatList.join(' · ')}</p>
              </div>
              <div className="text-end">
                <p className="text-sm text-[#736b62]">{c.total}</p>
                <p className="display-type mt-2 text-2xl font-semibold text-[#7e2133]">{formatMoney(parsedTotal, locale)}</p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 border border-[#dfc98f] bg-[#f8edcf] p-4 text-[#5f4a1f]">
              <ShieldAlert className="mt-0.5 size-5 shrink-0" />
              <div><p className="font-bold">{c.demo}</p><p className="mt-1 text-sm leading-6">{c.demoBody}</p></div>
            </div>
          </div>
        </article>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cfc8bb] bg-[#f7f3eb] px-6 text-sm font-semibold transition-colors hover:bg-white">{c.home}</Link>
          <Link href="/booking" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#7e2133] px-6 text-sm font-bold text-white transition-colors hover:bg-[#601625]">{c.book}</Link>
        </div>
      </main>
    </div>
  );
}
