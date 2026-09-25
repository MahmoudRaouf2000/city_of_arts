'use client';

import '@/src/lib/i18n';
import { SiteHeader } from '@/src/components/site-header';
import { SiteFooter } from '@/src/components/site-footer';
import { useLanguageSync } from '@/src/hooks/use-language-sync';
import { HeroSection } from '@/src/sections/hero-section';
import { EventsSection } from '@/src/sections/events-section';
import { VenuesSection } from '@/src/sections/venues-section';
import { AboutSection } from '@/src/sections/about-section';
import { VisitSection } from '@/src/sections/visit-section';

export function HomeExperience() {
  useLanguageSync();
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <EventsSection />
        <VenuesSection />
        <AboutSection />
        <VisitSection />
      </main>
      <SiteFooter />
    </>
  );
}
