import { hasLocale } from 'next-intl';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
  // English keeps today's URLs (/about); other languages are prefixed (/fr/about)
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

/** Narrows a route param to a supported locale (the root layout 404s others). */
export function toLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
