import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

const DOMAIN = 'https://www.imartin.dev';

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: 'Martin DAVILA | Full Stack Bioinformatics Engineer',
    template: '%s | Martin DAVILA'
  },
  description:
    'Martin Davila specializes in bioinformatics solutions for advancing biotechnology research...',
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
  publisher: 'Martin DAVILA Portfolio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    type: 'website',
    url: DOMAIN,
    title: 'Martin DAVILA | Full Stack Bioinformatics Engineer',
    description: 'Bioinformatics solutions advancing biotechnology research...',
    siteName: 'Martin DAVILA Portfolio',
    locale: 'en_US',
    images: [
      {
        url: `${DOMAIN}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Martin DAVILA - Full Stack Bioinformatics Engineer',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martin DAVILA | Full Stack Bioinformatics Engineer',
    description:
      'Driving biotech innovation with bioinformatics and full-stack solutions.',
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
  alternates: {
    canonical: DOMAIN
  },
  icons: {
    icon: '/favicon.ico',
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

// JSON-LD Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Martin DAVILA',
  'url': DOMAIN,
  'jobTitle': 'Full Stack Bioinformatics Engineer',
  'description':
    'Offering innovative bioinformatics and biotechnology solutions.',
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
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={inter.className}
      data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager - Head */}
        {/* biome-ignore lint/nursery/useUniqueElementIds: Next.js Script components with inline content require static string IDs */}
        <Script
          id="google-analytics"
          strategy='afterInteractive'>
          {`
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', 'auto');
            ga('send', 'pageview');
          `}
        </Script>

        {/* Preconnect to analytics domains */}
        <link
          rel='preconnect'
          href='https://cloud.umami.is'
        />

        {/* Inject JSON-LD structured data */}
        <script
          type='application/ld+json'
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data injection is safe
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

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
        {/* Google Tag Manager - Body */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-PFT9XVXM'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
            title='Google Tag Manager'
          />
        </noscript>

        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          {/* Accessibility: skip to main content */}
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:absolute focus:p-4'>
            Skip to main content
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
      </body>
    </html>
  );
}
