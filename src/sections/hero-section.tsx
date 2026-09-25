'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const slides = ['/media/hero-1.jpg', '/media/hero-2.jpg', '/media/hero-3.jpg'];

export function HeroSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 8000);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);

  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden bg-[#171514] text-white md:min-h-[800px] lg:h-[92svh] lg:max-h-[980px]">
      {slides.map((image, index) => (
        <img key={image} src={image} alt="" aria-hidden={index !== active}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-1000 ${index === active ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'}`} />
      ))}
      <div className="hero-mask absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,transparent_0,transparent_18%,rgba(0,0,0,.2)_75%)]" />

      <div className="relative z-10 mx-auto flex h-full min-h-[760px] w-full min-w-0 max-w-[1440px] items-end px-5 pb-20 pt-40 sm:px-8 md:pb-24 lg:min-h-0 lg:items-center lg:px-12 lg:pb-8 lg:pt-32">
        <div className="w-full min-w-0 max-w-3xl">
          <div className="mb-6 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d7b567]">
            <span className="h-px w-10 bg-current" /> {t('hero.kicker')}
          </div>
          <h1 className="display-type max-w-[calc(100vw-40px)] break-words text-[2.65rem] font-medium leading-[.96] tracking-[-0.045em] sm:max-w-[820px] sm:text-[clamp(3rem,7.4vw,7.2rem)] sm:text-balance">
            {t('hero.title')}
          </h1>
          <p className="mt-7 max-w-[calc(100vw-40px)] text-base leading-7 text-white/72 sm:max-w-xl sm:text-lg sm:leading-8">{t('hero.description')}</p>
          <a href="#programme" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#d7b567] px-6 py-3 text-sm font-bold text-[#17120b] transition-colors hover:bg-white">
            {t('actions.explore')} <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </a>
        </div>

        <div className="absolute bottom-7 inset-x-5 flex items-center justify-between sm:inset-x-8 lg:inset-x-12">
          <div className="hidden border-s border-white/35 ps-4 md:block">
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#d7b567]">{t('hero.featured')}</p>
            <p className="mt-1 text-sm font-semibold">{t('hero.featuredTitle')}</p>
            <p className="text-xs text-white/55">{t('hero.featuredMeta')}</p>
          </div>
          <div className="ms-auto flex items-center gap-3">
            <button type="button" onClick={() => move(-1)} aria-label={t('actions.previous')} className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:border-[#d7b567] hover:text-[#d7b567]">
              <ArrowLeft className="size-4 rtl:-scale-x-100" />
            </button>
            <span className="min-w-12 text-center text-xs tabular-nums"><strong className="text-[#d7b567]">0{active + 1}</strong> / 0{slides.length}</span>
            <button type="button" onClick={() => move(1)} aria-label={t('actions.next')} className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:border-[#d7b567] hover:text-[#d7b567]">
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
