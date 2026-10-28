import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import Footer from '@/components/Footer';
import InlineScript from '@/components/inline-script';
import { introBootScript } from '@/lib/intro';
import { localeRevealScript } from '@/lib/locale-reveal';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

const DOMAIN = 'https://www.imartin.dev';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// One static build per locale
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const OG_LOCALES = { en: 'en_US', fr: 'fr_FR', es: 'es_ES' } as const;

export async function generateMetadata({
  params
}: Omit<LayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = (l: typeof locale) =>
    `${DOMAIN}${getPathname({ href: '/', locale: l }).replace(/\/$/, '')}`;

  return {
    metadataBase: new URL(DOMAIN),
    title: {
      default: t('title'),
      template: t('titleTemplate')
    },
    description: t('description'),
    keywords: [
      'bioinformatics engineer',
      'biotech software',
      'genomics data analysis',
      'full stack developer',
      'pipeline development',
      'Martin DAVILA',
      'biotechnology solutions',
      'computational biology'
    ],
    authors: [{ name: 'Martin DAVILA', url: DOMAIN }],
    creator: 'Martin DAVILA',
    publisher: t('siteName'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    openGraph: {
      type: 'website',
      url: url(locale),
      title: t('title'),
      description: t('ogDescription'),
      siteName: t('siteName'),
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l]),
      images: [
        {
          url: `${DOMAIN}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('twitterDescription'),
      images: [`${DOMAIN}/og-image.jpg`],
      creator: '@iMartinDav'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    // hreflang alternates so search engines serve the right language
    alternates: {
      canonical: url(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
        'x-default': url(routing.defaultLocale)
      }
    },
    icons: {
      icon: '/imartin-logo.ico',
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon-32x32.png'
        }
      ]
    },
    manifest: '/site.webmanifest',
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || ''
    }
  };
}

// JSON-LD Structured Data
// Runs before app code so dependency warnings are filtered from the start
const CONSOLE_FILTER_SCRIPT = `
              if (typeof console !== 'undefined') {
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  const msg = typeof args[0] === 'string' ? args[0] : '';
                  if (msg.includes('THREE.Clock: This module has been deprecated')) return;
                  if (msg.includes('Multiple instances of Three.js being imported')) return;
                  originalWarn.apply(console, args);
                };
              }
`;

const getStructuredData = (jobTitle: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Martin DAVILA',
  'url': DOMAIN,
  'jobTitle': jobTitle,
  'description': description,
  'sameAs': [
    'https://www.linkedin.com/in/imartindav/',
    'https://github.com/iMartinDav'
  ],
  'knowsAbout': [
    'Bioinformatics',
    'Computational Biology',
    'Software Engineering',
    'Full Stack Development',
    'Genomics',
    'Pipeline Development',
    'Biotechnology'
  ]
});

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale
  setRequestLocale(locale);
  const t = await getTranslations('Metadata');
  const tCommon = await getTranslations('Common');
  const structuredData = getStructuredData(t('jobTitle'), t('personDescription'));

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={inter.className}
      data-scroll-behavior='smooth'>
      <head>
        {/* Decide before first paint whether the intro splash already played this session */}
        <InlineScript code={introBootScript} />
        <InlineScript code={localeRevealScript} />
        <noscript>
          <style>{'.intro-splash{display:none}.intro-content{opacity:1!important}'}</style>
        </noscript>

        {/* Preconnect to analytics domains */}
        <link
          rel='preconnect'
          href='https://cloud.umami.is'
        />

        {/* Inject JSON-LD structured data */}
        <script
          type='application/ld+json'
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data injection is safe
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />

        {/* Suppress harmless console warnings from dependencies */}
        <InlineScript code={CONSOLE_FILTER_SCRIPT} />

        {/* Cookie Script */}
        <Script
          src='//cdn.cookie-script.com/s/27a1e4f6bdc2bd98f6d922cb116a0b70.js'
          strategy='afterInteractive'
          type='text/javascript'
          charSet='UTF-8'
        />

        {/* Umami Analytics Script */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src='https://cloud.umami.is/script.js'
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy='afterInteractive'
            async
          />
        )}
      </head>
      <body>

        <NextIntlClientProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          {/* Accessibility: skip to main content */}
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:absolute focus:p-4'>
            {tCommon('skipToContent')}
          </a>

          <Navbar />
          {/* biome-ignore lint/nursery/useUniqueElementIds: main-content is a semantic landmark ID needed for skip links */}
          <main
            id='main-content'
            className='min-h-screen'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
