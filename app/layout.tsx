import type { Metadata } from 'next';
import { Noto_Kufi_Arabic, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ variable: '--font-latin', subsets: ['latin'] });
const playfair = Playfair_Display({ variable: '--font-display', subsets: ['latin'] });
const kufi = Noto_Kufi_Arabic({ variable: '--font-arabic', subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'Cairo Opera House | دار الأوبرا المصرية',
  description: 'Discover the Cairo Opera House programme, performances and cultural venues in Arabic and English.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${playfair.variable} ${kufi.variable}`}>{children}</body>
    </html>
  );
}
