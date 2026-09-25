'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BrandMark } from '@/src/components/brand-mark';
import { LanguageSwitcher } from '@/src/components/language-switcher';

const navItems = [
  ['nav.events', '/#programme'],
  ['nav.venues', '/#venues'],
  ['nav.about', '/#about'],
] as const;

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const side = i18n.resolvedLanguage === 'ar' ? 'left' : 'right';

  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/15 text-white">
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/#top" className="flex items-center gap-3.5" aria-label={t('brand.name')}>
          <BrandMark />
          <span className="hidden flex-col leading-none min-[420px]:flex">
            <span className="text-[15px] font-semibold tracking-tight sm:text-base">{t('brand.name')}</span>
            <span className="mt-1 text-[11px] text-white/60">{t('brand.arabic')}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href} className="relative py-2 text-white/75 transition-colors hover:text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#d7b567] after:transition-transform hover:after:scale-x-100">
              {t(label)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link href="/booking" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-[#17120b] transition-colors hover:bg-[#d7b567]">
            {t('nav.tickets')} <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <LanguageSwitcher compact />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon-lg" aria-label={t('actions.menu')} className="rounded-full border border-white/25 text-white hover:bg-white/10 hover:text-white" />}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side={side} showCloseButton={false} className="w-[88vw] border-none bg-[#171514] p-0 text-white">
              <SheetHeader className="flex-row items-center justify-between border-b border-white/10 p-5">
                <SheetTitle className="text-base text-white">{t('brand.name')}</SheetTitle>
                <SheetClose aria-label={t('actions.close')} className="grid size-10 place-items-center rounded-full border border-white/20">
                  <X className="size-5" />
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-col px-5 pt-8" aria-label="Mobile">
                {navItems.map(([label, href], index) => (
                  <Link key={label} href={href} onClick={() => setMenuOpen(false)} className="display-type flex items-center justify-between border-b border-white/10 py-5 text-2xl">
                    {t(label)} <span className="text-xs text-[#d7b567]">0{index + 1}</span>
                  </Link>
                ))}
                <Link href="/booking" onClick={() => setMenuOpen(false)} className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[#d7b567] px-5 py-3.5 font-semibold text-[#17120b]">
                  {t('nav.tickets')} <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
