import { MetadataRoute } from 'next';

import { getPathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';

const baseUrl = 'https://imartin.dev';

const routes = [
  '',
  '/about',
  '/technologies',
  '/resume',
  '/deployments',
  '/worldwide-reach'
];

const localizedUrl = (route: string, locale: Locale) =>
  `${baseUrl}${getPathname({ href: route || '/', locale }).replace(/\/$/, '')}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // One entry per route and language, each listing its translations (hreflang)
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(route, locale),
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(route, l)])
        )
      }
    }))
  );
}
