import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getPathname } from './navigation';
import { type Locale, routing, toLocale } from './routing';

const DOMAIN = 'https://www.imartin.dev';

type PageNamespace =
  | 'About'
  | 'Technologies'
  | 'Deployments'
  | 'WorldwideReach'
  | 'Resume';

/** Localized <title> plus canonical/hreflang URLs for a page. */
export async function getPageMetadata(
  requestedLocale: string,
  namespace: PageNamespace,
  href: string
): Promise<Metadata> {
  const locale = toLocale(requestedLocale);
  const t = await getTranslations({ locale, namespace });
  const url = (l: Locale) => `${DOMAIN}${getPathname({ href, locale: l })}`;

  return {
    title: t('metaTitle'),
    alternates: {
      canonical: url(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
        'x-default': url(routing.defaultLocale)
      }
    }
  };
}
