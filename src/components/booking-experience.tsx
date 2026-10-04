'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Film,
  MapPin,
  ShieldCheck,
  Ticket,
  UserRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { BrandMark } from '@/src/components/brand-mark';
import { LanguageSwitcher } from '@/src/components/language-switcher';
import { events, type EventItem } from '@/src/data/events';
import { useLanguageSync } from '@/src/hooks/use-language-sync';
import '@/src/lib/i18n';

type Tier = 'vip' | 'gold' | 'silver';

type Seat = {
  id: string;
  label: string;
  tier: Tier;
  price: number;
  reserved: boolean;
};

const tierPrices: Record<Tier, number> = { vip: 400, gold: 300, silver: 150 };
const reservedSeats = new Set(['A4', 'B7', 'C3', 'D6', 'E2', 'F8', 'G5', 'H1']);

const seats: Seat[] = Array.from({ length: 8 }, (_, rowIndex) => {
  const row = String.fromCharCode(65 + rowIndex);
  const tier: Tier = rowIndex < 2 ? 'vip' : rowIndex < 4 ? 'gold' : 'silver';
  return Array.from({ length: 8 }, (_, seatIndex) => {
    const label = `${row}${seatIndex + 1}`;
    return { id: label, label, tier, price: tierPrices[tier], reserved: reservedSeats.has(label) };
  });
}).flat();

const copy = {
  en: {
    back: 'Back to programme',
    eyebrow: 'Official booking journey',
    title: 'Choose your night at the opera.',
    intro: 'Select your performance and seats, then add your contact details to review the booking.',
    steps: ['Seats', 'Your details', 'Confirmation'],
    bookingStart: 'Choose your date and show',
    bookingStartHelp: 'Select a date first, then choose from the films and performances available that day.',
    selectDate: 'Choose a date',
    selectEvent: 'Choose a film or performance',
    selectedShow: 'Selected',
    chooseSeats: 'Choose your seats',
    seatHelp: 'Select up to 8 available seats. Prices are shown in Egyptian pounds.',
    stage: 'Stage',
    available: 'Available',
    selected: 'Selected',
    unavailable: 'Unavailable',
    ticketTypes: { vip: 'VIP', gold: 'Gold', silver: 'Silver' },
    each: 'each',
    selectedSeats: 'Selected seats',
    noSeats: 'No seats selected yet',
    total: 'Total',
    continue: 'Continue to details',
    firstName: 'Full name',
    firstNamePlaceholder: 'Enter the ticket holder name',
    email: 'Email address',
    emailPlaceholder: 'name@example.com',
    phone: 'Mobile number',
    phonePlaceholder: '+20 1xx xxx xxxx',
    detailsTitle: 'Who should receive the tickets?',
    detailsHelp: 'We will use these details for the booking confirmation and any performance updates.',
    terms: 'I confirm that the booking details are correct and accept the venue terms.',
    review: 'Review your booking',
    reviewHelp: 'Check the details below before creating your booking reference.',
    editSeats: 'Edit seats',
    editDetails: 'Edit details',
    confirm: 'Confirm booking',
    summary: 'Booking summary',
    tickets: 'tickets',
    ticket: 'ticket',
    demoNotice: 'Online payment is not connected in this demo. No amount will be charged.',
    secure: 'Secure checkout design',
    confirmed: 'Your booking is ready',
    confirmedBody: 'Keep this reference with you. A copy of this booking has been saved on this device.',
    digitalTicket: 'Digital admission ticket',
    entryReady: 'Ready for entry',
    performance: 'Performance',
    dateLabel: 'Date',
    timeLabel: 'Time',
    venueLabel: 'Venue',
    reference: 'Booking reference',
    qrTitle: 'Entry QR code',
    qrHelp: 'Present this code with your booking reference at the entrance.',
    qrDemo: 'Demo ticket · local verification only',
    home: 'Return to homepage',
    another: 'Book another performance',
    required: 'Please complete all required fields and accept the terms.',
    seatsRequired: 'Choose at least one available seat to continue.',
    maxSeats: 'A maximum of 8 seats can be selected per booking.',
    for: 'for',
  },
  ar: {
    back: 'العودة إلى البرنامج',
    eyebrow: 'رحلة الحجز الرسمية',
    title: 'اختر ليلتك في الأوبرا.',
    intro: 'اختر العرض والمقاعد، ثم أضف بيانات التواصل لمراجعة الحجز وتأكيده.',
    steps: ['المقاعد', 'بياناتك', 'التأكيد'],
    bookingStart: 'اختر التاريخ والعرض',
    bookingStartHelp: 'اختر التاريخ أولًا، ثم اختر من الأفلام والعروض المتاحة في هذا اليوم.',
    selectDate: 'اختر التاريخ',
    selectEvent: 'اختر الفيلم أو العرض',
    selectedShow: 'تم الاختيار',
    chooseSeats: 'اختر مقاعدك',
    seatHelp: 'يمكنك اختيار حتى ٨ مقاعد متاحة. الأسعار بالجنيه المصري.',
    stage: 'المسرح',
    available: 'متاح',
    selected: 'محدد',
    unavailable: 'غير متاح',
    ticketTypes: { vip: 'VIP', gold: 'ذهبي', silver: 'فضي' },
    each: 'للمقعد',
    selectedSeats: 'المقاعد المختارة',
    noSeats: 'لم تختر أي مقعد بعد',
    total: 'الإجمالي',
    continue: 'متابعة إلى البيانات',
    firstName: 'الاسم بالكامل',
    firstNamePlaceholder: 'أدخل اسم صاحب التذاكر',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'name@example.com',
    phone: 'رقم الهاتف',
    phonePlaceholder: '+20 1xx xxx xxxx',
    detailsTitle: 'لمن نرسل التذاكر؟',
    detailsHelp: 'سنستخدم هذه البيانات لتأكيد الحجز وإرسال أي تحديثات تخص العرض.',
    terms: 'أؤكد صحة بيانات الحجز وأوافق على شروط دخول المسرح.',
    review: 'راجع حجزك',
    reviewHelp: 'تأكد من البيانات التالية قبل إنشاء رقم الحجز.',
    editSeats: 'تعديل المقاعد',
    editDetails: 'تعديل البيانات',
    confirm: 'تأكيد الحجز',
    summary: 'ملخص الحجز',
    tickets: 'تذاكر',
    ticket: 'تذكرة',
    demoNotice: 'الدفع الإلكتروني غير متصل في هذه النسخة التجريبية، ولن يتم خصم أي مبلغ.',
    secure: 'تصميم دفع آمن',
    confirmed: 'حجزك جاهز',
    confirmedBody: 'احتفظ بهذا الرقم معك. تم حفظ نسخة من الحجز على هذا الجهاز.',
    digitalTicket: 'تذكرة دخول رقمية',
    entryReady: 'جاهزة للدخول',
    performance: 'العرض',
    dateLabel: 'التاريخ',
    timeLabel: 'الموعد',
    venueLabel: 'المكان',
    reference: 'رقم الحجز',
    qrTitle: 'رمز الدخول QR',
    qrHelp: 'قدّم هذا الرمز مع رقم الحجز عند بوابة الدخول.',
    qrDemo: 'تذكرة تجريبية · التحقق محلي فقط',
    home: 'العودة للرئيسية',
    another: 'حجز عرض آخر',
    required: 'أكمل كل البيانات المطلوبة ووافق على الشروط.',
    seatsRequired: 'اختر مقعدًا متاحًا واحدًا على الأقل للمتابعة.',
    maxSeats: 'الحد الأقصى ٨ مقاعد في الحجز الواحد.',
    for: 'باسم',
  },
} as const;

function formatMoney(value: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(value);
}

export function BookingExperience({ initialEvent }: { initialEvent?: string }) {
  useLanguageSync();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'ar' ? 'ar' : 'en';
  const c = copy[language];
  const locale = language === 'ar' ? 'ar-EG' : 'en-GB';
  const initialSelectedEvent = events.find((event) => event.id === initialEvent) ?? events[0];
  const availableDates = useMemo(() => [...new Set(events.map((event) => event.date.slice(0, 10)))].sort(), []);
  const [selectedDate, setSelectedDate] = useState(() => initialSelectedEvent.date.slice(0, 10));
  const [eventId, setEventId] = useState<EventItem['id']>(initialSelectedEvent.id);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', terms: false });
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  const selectedEvent = events.find((event) => event.id === eventId) ?? events[0];
  const eventsForSelectedDate = events.filter((event) => event.date.startsWith(selectedDate));
  const selectedSeats = useMemo(() => seats.filter((seat) => selected.includes(seat.id)), [selected]);
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const date = new Date(selectedEvent.date);
  const formattedDate = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const eventTitle = t(`events.items.${selectedEvent.id}.title`);
  const venue = t(`events.items.${selectedEvent.id}.venue`);
  const ForwardIcon = language === 'ar' ? ArrowLeft : ArrowRight;
  const BackIcon = language === 'ar' ? ChevronRight : ChevronLeft;

  const selectDate = (dateKey: string) => {
    const firstEventForDate = events.find((event) => event.date.startsWith(dateKey));
    if (!firstEventForDate) return;
    setSelectedDate(dateKey);
    setEventId(firstEventForDate.id);
    setSelected([]);
    setError('');
  };

  const selectEvent = (nextEventId: EventItem['id']) => {
    setEventId(nextEventId);
    setSelected([]);
    setError('');
  };

  const toggleSeat = (seat: Seat) => {
    if (seat.reserved) return;
    setError('');
    setSelected((current) => {
      if (current.includes(seat.id)) return current.filter((id) => id !== seat.id);
      if (current.length >= 8) {
        setError(c.maxSeats);
        return current;
      }
      return [...current, seat.id];
    });
  };

  const goToDetails = () => {
    if (!selected.length) return setError(c.seatsRequired);
    setError('');
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitDetails = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.name.trim() || !emailValid || form.phone.trim().length < 8 || !form.terms) return setError(c.required);
    setError('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmBooking = () => {
    const code = `COH-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const booking = { reference: code, eventId, seats: selected, total, customer: form, createdAt: new Date().toISOString() };
    window.localStorage.setItem('cairo-opera-last-booking', JSON.stringify(booking));
    setReference(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetBooking = () => {
    setStep(0);
    setSelected([]);
    setForm({ name: '', email: '', phone: '', terms: false });
    setReference('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#eee9df] text-[#171514]">
      <header className="border-b border-white/10 bg-[#121010] text-white">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3" aria-label={t('brand.name')}>
            <BrandMark />
            <span className="hidden text-sm font-semibold sm:block">{t('brand.name')}</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main>
        <section className="border-b border-[#d8d0c2] bg-[#191616] text-white">
          <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
            <Link href="/#programme" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-[#e0c276]">
              <BackIcon className="size-4" /> {c.back}
            </Link>
            <div className="grid gap-7 lg:grid-cols-[1fr_440px] lg:items-end">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#d7b567]">{c.eyebrow}</p>
                <h1 className="display-type max-w-3xl text-4xl font-medium leading-tight tracking-[-.035em] sm:text-6xl">{reference ? c.confirmed : c.title}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{reference ? c.confirmedBody : c.intro}</p>
              </div>
              {!reference && (
                <div className="rounded-sm border border-white/12 bg-white/[.04] p-5">
                  <div className="mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-[.14em] text-white/55">
                    <span>{c.steps[step]}</span><bdi dir="ltr">{step + 1} / 3</bdi>
                  </div>
                  <Progress value={((step + 1) / 3) * 100} className="[&_[data-slot=progress-indicator]]:bg-[#d7b567] [&_[data-slot=progress-track]]:bg-white/15" />
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-white/45">
                    {c.steps.map((label, index) => <span key={label} className={index <= step ? 'text-white' : ''}>{label}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {reference ? (
          <Confirmation reference={reference} language={language} eventTitle={eventTitle} formattedDate={formattedDate} eventTime={selectedEvent.time} venue={venue} selectedSeats={selectedSeats} total={total} locale={locale} c={c} onReset={resetBooking} />
        ) : (
          <div className="mx-auto grid max-w-[1440px] gap-7 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-12">
            <section className="border border-[#d6cfc3] bg-[#faf8f2] p-5 shadow-[0_18px_55px_rgba(32,22,16,.08)] sm:p-8">
              {step === 0 && (
                <div>
                  <div className="border-b border-[#ded7cc] pb-8">
                    <div>
                      <h2 className="display-type text-3xl font-medium">{c.bookingStart}</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b645c]">{c.bookingStartHelp}</p>
                    </div>

                    <div className="mt-7">
                      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#6e2635]"><CalendarDays className="size-4" />{c.selectDate}</p>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {availableDates.map((dateKey) => {
                          const dateOption = new Date(`${dateKey}T12:00:00`);
                          const active = selectedDate === dateKey;
                          const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(dateOption);
                          const dayAndMonth = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(dateOption);
                          return (
                            <button key={dateKey} type="button" onClick={() => selectDate(dateKey)} aria-pressed={active}
                              className={`flex min-h-20 items-center justify-between gap-4 border px-4 py-3 text-start transition-colors ${active ? 'border-[#7e2133] bg-[#7e2133] text-white shadow-[0_7px_18px_rgba(126,33,51,.18)]' : 'border-[#d8d0c4] bg-white text-[#332d29] hover:border-[#9d6b74]'}`}>
                              <span><span className={`block text-xs font-semibold ${active ? 'text-white/65' : 'text-[#7b7168]'}`}>{weekday}</span><span className="mt-1 block font-bold">{dayAndMonth}</span></span>
                              {active && <Check className="size-5 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-7">
                      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#6e2635]"><Film className="size-4" />{c.selectEvent}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {eventsForSelectedDate.map((event) => {
                          const active = event.id === eventId;
                          const title = t(`events.items.${event.id}.title`);
                          return (
                            <button key={event.id} type="button" onClick={() => selectEvent(event.id)} aria-pressed={active}
                              className={`group overflow-hidden border text-start transition-all ${active ? 'border-[#7e2133] ring-2 ring-[#7e2133]/15' : 'border-[#d8d0c4] hover:-translate-y-0.5 hover:border-[#a9874b]'}`}>
                              <span className="relative block h-32 overflow-hidden bg-[#211d1b]">
                                <Image src={event.image} alt="" fill sizes="(max-width: 640px) 100vw, 360px" className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: event.imagePosition }} />
                                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                {active && <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 bg-[#7e2133] px-2.5 py-1 text-[10px] font-bold text-white"><Check className="size-3" />{c.selectedShow}</span>}
                                <span className="absolute inset-x-4 bottom-3 text-lg font-bold text-white">{title}</span>
                              </span>
                              <span className={`flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-xs ${active ? 'bg-[#fbf0f1] text-[#6e2635]' : 'bg-white text-[#665f57]'}`}>
                                <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" /><bdi>{event.time}</bdi></span>
                                <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" />{t(`events.items.${event.id}.venue`)}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-7">
                    <h2 className="display-type text-3xl font-medium">{c.chooseSeats}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#6b645c]">{c.seatHelp}</p>
                  </div>

                  <div className="mt-7 overflow-x-auto pb-2">
                    <div className="mx-auto min-w-[310px] max-w-[560px]">
                      <div className="mx-auto mb-8 w-[78%] rounded-b-[50%] border-t-4 border-[#d7b567] bg-[#272220] py-2 text-center text-[10px] font-bold uppercase tracking-[.22em] text-white/60">{c.stage}</div>
                      <div className="space-y-2">
                        {Array.from({ length: 8 }, (_, rowIndex) => {
                          const row = String.fromCharCode(65 + rowIndex);
                          return (
                            <div key={row} className="grid grid-cols-[20px_repeat(8,minmax(30px,1fr))_20px] items-center gap-1.5 sm:gap-2">
                              <span className="text-center text-[10px] font-bold text-[#8a8176]">{row}</span>
                              {seats.filter((seat) => seat.label.startsWith(row)).map((seat) => {
                                const isSelected = selected.includes(seat.id);
                                return (
                                  <button key={seat.id} type="button" disabled={seat.reserved} onClick={() => toggleSeat(seat)} aria-pressed={isSelected} aria-label={`${seat.label} · ${c.ticketTypes[seat.tier]} · ${formatMoney(seat.price, locale)}`}
                                    className={`aspect-square min-h-8 rounded-t-lg border text-[10px] font-bold transition-all ${seat.reserved ? 'cursor-not-allowed border-[#d8d3ca] bg-[#ddd8cf] text-[#aaa297]' : isSelected ? 'border-[#7e2133] bg-[#7e2133] text-white shadow-[0_5px_12px_rgba(126,33,51,.25)]' : seat.tier === 'vip' ? 'border-[#b99647] bg-[#f2e5b9] text-[#594315] hover:-translate-y-0.5' : seat.tier === 'gold' ? 'border-[#a98543] bg-[#ead5a5] text-[#604b24] hover:-translate-y-0.5' : 'border-[#a9adb2] bg-[#e7e8e8] text-[#4e5358] hover:-translate-y-0.5'}`}
                                  >{seat.label.slice(1)}</button>
                                );
                              })}
                              <span className="text-center text-[10px] font-bold text-[#8a8176]">{row}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 border-y border-[#ded7cc] py-4 text-xs text-[#625b53]">
                    <Legend color="bg-[#f2e5b9] border-[#b99647]" label={`${c.ticketTypes.vip} · ${formatMoney(400, locale)}`} />
                    <Legend color="bg-[#ead5a5] border-[#a98543]" label={`${c.ticketTypes.gold} · ${formatMoney(300, locale)}`} />
                    <Legend color="bg-[#e7e8e8] border-[#a9adb2]" label={`${c.ticketTypes.silver} · ${formatMoney(150, locale)}`} />
                    <Legend color="bg-[#7e2133] border-[#7e2133]" label={c.selected} />
                    <Legend color="bg-[#ddd8cf] border-[#d8d3ca]" label={c.unavailable} />
                  </div>

                  {error && <p role="alert" className="mt-5 text-sm font-semibold text-[#9d2538]">{error}</p>}
                  <div className="mt-7 flex justify-end">
                    <Button type="button" onClick={goToDetails} className="h-12 rounded-full bg-[#7e2133] px-6 text-sm font-bold hover:bg-[#601625]">{c.continue} <ForwardIcon className="size-4" /></Button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <form onSubmit={submitDetails} noValidate>
                  <h2 className="display-type text-3xl font-medium">{c.detailsTitle}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b645c]">{c.detailsHelp}</p>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <Field label={c.firstName} htmlFor="name"><Input id="name" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder={c.firstNamePlaceholder} className="h-12 rounded-sm bg-white px-4" required /></Field>
                    <Field label={c.phone} htmlFor="phone"><Input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder={c.phonePlaceholder} className="h-12 rounded-sm bg-white px-4" required /></Field>
                    <div className="sm:col-span-2"><Field label={c.email} htmlFor="email"><Input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder={c.emailPlaceholder} className="h-12 rounded-sm bg-white px-4" required /></Field></div>
                  </div>
                  <Label className="mt-7 flex cursor-pointer items-start gap-3 rounded-sm border border-[#ded7cc] bg-white p-4 text-sm leading-6 text-[#514b45]">
                    <Checkbox checked={form.terms} onCheckedChange={(checked) => setForm({ ...form, terms: checked === true })} className="mt-1" />
                    <span>{c.terms}</span>
                  </Label>
                  {error && <p role="alert" className="mt-5 text-sm font-semibold text-[#9d2538]">{error}</p>}
                  <div className="mt-8 flex flex-wrap justify-between gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(0)} className="h-12 rounded-full px-5"><BackIcon className="size-4" /> {c.editSeats}</Button>
                    <Button type="submit" className="h-12 rounded-full bg-[#7e2133] px-6 font-bold hover:bg-[#601625]">{c.continue} <ForwardIcon className="size-4" /></Button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div>
                  <h2 className="display-type text-3xl font-medium">{c.review}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6b645c]">{c.reviewHelp}</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <ReviewBlock icon={<Ticket />} title={eventTitle} lines={[formattedDate, `${selectedEvent.time} · ${venue}`, selectedSeats.map((seat) => seat.label).join(' · ')]} />
                    <ReviewBlock icon={<UserRound />} title={form.name} lines={[form.email, form.phone]} />
                  </div>
                  <div className="mt-6 flex items-start gap-3 rounded-sm border border-[#e0c78c] bg-[#fbf1d8] p-4 text-sm leading-6 text-[#5f4a1f]"><CreditCard className="mt-0.5 size-5 shrink-0" /><p>{c.demoNotice}</p></div>
                  <div className="mt-8 flex flex-wrap justify-between gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12 rounded-full px-5"><BackIcon className="size-4" /> {c.editDetails}</Button>
                    <Button type="button" onClick={confirmBooking} className="h-12 rounded-full bg-[#7e2133] px-7 font-bold hover:bg-[#601625]"><Check className="size-4" /> {c.confirm}</Button>
                  </div>
                </div>
              )}
            </section>

            <BookingSummary event={selectedEvent} eventTitle={eventTitle} venue={venue} formattedDate={formattedDate} selectedSeats={selectedSeats} total={total} locale={locale} c={c} />
          </div>
        )}
      </main>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2"><span className={`size-3 rounded-t-sm border ${color}`} />{label}</span>;
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div><Label htmlFor={htmlFor} className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[#514943]">{label}</Label>{children}</div>;
}

function ReviewBlock({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return <div className="border border-[#ded7cc] bg-white p-5"><div className="mb-4 flex size-10 items-center justify-center rounded-full bg-[#f0e5c9] text-[#7e2133] [&_svg]:size-5">{icon}</div><p className="font-bold">{title}</p>{lines.map((line) => <p key={line} className="mt-1 text-sm leading-6 text-[#6d665e]">{line}</p>)}</div>;
}

type Copy = (typeof copy)['en'] | (typeof copy)['ar'];

function BookingSummary({ event, eventTitle, venue, formattedDate, selectedSeats, total, locale, c }: { event: EventItem; eventTitle: string; venue: string; formattedDate: string; selectedSeats: Seat[]; total: number; locale: string; c: Copy }) {
  return (
    <aside className="h-fit border border-[#2b2624] bg-[#181514] text-white shadow-[0_18px_55px_rgba(32,22,16,.16)] lg:sticky lg:top-6">
      <div className="relative h-48 overflow-hidden"><Image src={event.image} alt="" fill sizes="360px" className="object-cover opacity-65" style={{ objectPosition: event.imagePosition }} /><div className="absolute inset-0 bg-gradient-to-t from-[#181514] to-transparent" /><p className="display-type absolute inset-x-5 bottom-4 text-2xl font-medium">{eventTitle}</p></div>
      <div className="p-5 sm:p-6">
        <h2 className="text-xs font-bold uppercase tracking-[.16em] text-[#d7b567]">{c.summary}</h2>
        <div className="mt-5 space-y-3 text-sm text-white/68">
          <p className="flex gap-3"><CalendarDays className="mt-0.5 size-4 shrink-0 text-[#d7b567]" />{formattedDate}</p>
          <p className="flex gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-[#d7b567]" /><bdi>{event.time}</bdi></p>
          <p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-[#d7b567]" />{venue}</p>
        </div>
        <div className="my-5 border-t border-white/12" />
        <div className="flex items-start justify-between gap-4 text-sm"><span className="text-white/55">{c.selectedSeats}</span><span className="max-w-[190px] text-end font-semibold">{selectedSeats.length ? selectedSeats.map((seat) => seat.label).join(', ') : c.noSeats}</span></div>
        <div className="mt-5 flex items-end justify-between border-t border-white/12 pt-5"><span className="text-sm text-white/55">{c.total}</span><strong className="display-type text-3xl font-medium text-[#ead18f]">{formatMoney(total, locale)}</strong></div>
        <div className="mt-5 flex items-center gap-2 text-[11px] text-white/45"><ShieldCheck className="size-4 text-[#d7b567]" />{c.secure}</div>
      </div>
    </aside>
  );
}

function Confirmation({ reference, language, eventTitle, formattedDate, eventTime, venue, selectedSeats, total, locale, c, onReset }: { reference: string; language: 'ar' | 'en'; eventTitle: string; formattedDate: string; eventTime: string; venue: string; selectedSeats: Seat[]; total: number; locale: string; c: Copy; onReset: () => void }) {
  const seatLabels = selectedSeats.map((seat) => seat.label).join(', ');
  const qrValue = language === 'ar'
    ? [
        '🎭 دار الأوبرا المصرية',
        '🎟️ تذكرة دخول رقمية',
        '✅ حالة الحجز: مؤكد',
        '',
        'رقم الحجز',
        reference,
        '',
        'تفاصيل العرض',
        `العرض: ${eventTitle}`,
        `التاريخ: ${formattedDate}`,
        `الموعد: ${eventTime}`,
        `المكان: ${venue}`,
        `المقاعد: ${seatLabels}`,
        `عدد التذاكر: ${selectedSeats.length}`,
        `الإجمالي: ${formatMoney(total, locale)}`,
        '',
        'يرجى إبراز هذا الرمز عند بوابة الدخول.',
        'تذكرة تجريبية — التحقق محلي فقط',
      ].join('\n')
    : [
        '🎭 Cairo Opera House',
        '🎟️ Digital admission ticket',
        '✅ Booking status: Confirmed',
        '',
        'Booking reference',
        reference,
        '',
        'Performance details',
        `Performance: ${eventTitle}`,
        `Date: ${formattedDate}`,
        `Time: ${eventTime}`,
        `Venue: ${venue}`,
        `Seats: ${seatLabels}`,
        `Number of tickets: ${selectedSeats.length}`,
        `Total: ${formatMoney(total, locale)}`,
        '',
        'Please present this code at the entrance.',
        'Demo ticket — local verification only',
      ].join('\n');

  return (
    <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="overflow-hidden border border-[#cfc5b5] bg-[#faf8f2] shadow-[0_28px_80px_rgba(35,22,16,.16)]">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#181514] px-5 py-5 text-white sm:px-8">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d7b567]">{tBrandName(language)}</p>
              <p className="mt-0.5 text-sm font-semibold">{c.digitalTicket}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d7b567]/40 bg-[#d7b567]/10 px-3 py-1.5 text-xs font-bold text-[#efd99d]"><Check className="size-3.5" />{c.entryReady}</span>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_310px]">
          <div className="p-6 sm:p-9 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-5 border-b border-[#ded6c9] pb-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#7e2133]">{c.performance}</p>
                <h2 className="display-type mt-2 text-3xl font-medium leading-tight sm:text-5xl">{eventTitle}</h2>
              </div>
              <div className="min-w-48 border-s-2 border-[#d7b567] ps-4">
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#81776d]">{c.reference}</p>
                <p className="mt-1 font-mono text-lg font-bold tracking-[.08em] text-[#7e2133]" dir="ltr">{reference}</p>
              </div>
            </div>

            <div className="grid gap-x-7 gap-y-6 py-7 sm:grid-cols-2">
              <TicketDetail icon={<CalendarDays />} label={c.dateLabel} value={formattedDate} />
              <TicketDetail icon={<Clock3 />} label={c.timeLabel} value={eventTime} ltr />
              <TicketDetail icon={<MapPin />} label={c.venueLabel} value={venue} />
              <TicketDetail icon={<Ticket />} label={selectedSeats.length === 1 ? c.ticket : c.tickets} value={`${selectedSeats.length} ${selectedSeats.length === 1 ? c.ticket : c.tickets}`} />
            </div>

            <div className="flex flex-wrap items-end justify-between gap-5 border-t border-dashed border-[#cfc5b5] pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#81776d]">{c.selectedSeats}</p>
                <div className="mt-2 flex flex-wrap gap-2" dir="ltr">{selectedSeats.map((seat) => <span key={seat.id} className="grid min-w-10 place-items-center rounded-sm bg-[#eee4cf] px-2.5 py-1.5 text-xs font-bold text-[#6e2635]">{seat.label}</span>)}</div>
              </div>
              <div className="text-end">
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#81776d]">{c.total}</p>
                <p className="display-type mt-1 text-3xl font-semibold text-[#7e2133]">{formatMoney(total, locale)}</p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center border-t border-dashed border-[#bfb4a3] bg-[#f1eadc] p-7 text-center lg:border-s lg:border-t-0">
            <span className="absolute -start-3 -top-3 size-6 rounded-full bg-[#eee9df]" />
            <span className="absolute -end-3 -top-3 size-6 rounded-full bg-[#eee9df] lg:-start-3 lg:-bottom-3 lg:end-auto lg:top-auto" />
            <div className="rounded-md border border-[#d2c6b3] bg-white p-3 shadow-[0_12px_35px_rgba(35,22,16,.1)]">
              <QRCodeSVG value={qrValue} size={210} level="L" marginSize={2} bgColor="#ffffff" fgColor="#171514" aria-label={`${c.qrTitle}: ${reference}`} title={`${c.qrTitle}: ${reference}`} />
            </div>
            <p className="mt-5 text-sm font-bold text-[#2e2925]">{c.qrTitle}</p>
            <p className="mt-1 max-w-[240px] text-xs leading-5 text-[#70675e]">{c.qrHelp}</p>
            <div className="mt-4 w-full border-t border-[#d5cbbb] pt-4">
              <p className="font-mono text-xs font-bold tracking-[.12em] text-[#7e2133]" dir="ltr">{reference}</p>
              <p className="mt-1 text-[10px] font-semibold text-[#9a7a36]">{c.qrDemo}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 border-t border-[#e1d7c6] bg-[#f8f0df] px-6 py-4 text-xs leading-5 text-[#614d25] sm:px-9"><CreditCard className="mt-0.5 size-4 shrink-0" /><p>{c.demoNotice}</p></div>
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/" className="inline-flex h-12 items-center justify-center rounded-full border border-[#d6d0c3] bg-[#f2efe8] px-6 text-sm font-medium transition-colors hover:bg-[#e5e0d5]">{c.home}</Link><Button type="button" onClick={onReset} className="h-12 rounded-full bg-[#7e2133] px-6 font-bold hover:bg-[#601625]">{c.another}</Button></div>
    </section>
  );
}

function TicketDetail({ icon, label, value, ltr = false }: { icon: React.ReactNode; label: string; value: string; ltr?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eee4cf] text-[#7e2133] [&_svg]:size-4">{icon}</span>
      <div><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#81776d]">{label}</p><p className="mt-1 text-sm font-semibold leading-6 text-[#332d29]" dir={ltr ? 'ltr' : undefined}>{value}</p></div>
    </div>
  );
}

function tBrandName(language: 'ar' | 'en') {
  return language === 'ar' ? 'دار الأوبرا المصرية' : 'Cairo Opera House';
}
