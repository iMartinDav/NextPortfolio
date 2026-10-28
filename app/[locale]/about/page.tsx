import { setRequestLocale } from 'next-intl/server';

import AboutContent from '@/components/About/About';
import { getPageMetadata } from '@/i18n/metadata';
import { toLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, 'About', '/about');
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(toLocale(locale));
  return <AboutContent />;
}
