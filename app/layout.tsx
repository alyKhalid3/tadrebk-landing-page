import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import SmoothScroll from '@/components/smooth-scroll';
import ScrollFx from '@/components/scroll-fx';
import SwRegister from '@/components/sw-register';
import Loader from '@/components/loader';
import { SITE_URL } from '@/lib/app-url';
import './globals.css';

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: '800',
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const title = 'Tadreebak — Find internships that launch your career';
const description =
  "Egypt's first platform connecting university students with top internship opportunities. Create a profile, apply in one click, and launch your career — all for free.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: 'Tadreebak',
  keywords: [
    'internships Egypt',
    'student internships',
    'تدريب',
    'Egypt university careers',
    'graduate jobs Cairo',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Tadreebak',
    title,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  icons: {
    icon: [{ url: '/images/logoandfav.png', type: 'image/png' }],
    apple: [{ url: '/images/logoandfav.png' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#10B981',
  width: 'device-width',
  initialScale: 1,
};

const noFoucScript = `
document.documentElement.classList.add('js');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduced-motion');
}
try {
  if (sessionStorage.getItem('tbk-loader') === '1') {
    document.documentElement.classList.add('loader-skip');
  }
} catch (e) {}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFoucScript }} />
        <noscript>
          <style>{`.loader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <Loader />
        <SmoothScroll>
          {children}
          <ScrollFx />
          <SwRegister />
        </SmoothScroll>
      </body>
    </html>
  );
}
