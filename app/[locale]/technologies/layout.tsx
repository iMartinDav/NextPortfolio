import { setRequestLocale } from 'next-intl/server';

import { getPageMetadata } from '@/i18n/metadata';
import { toLocale } from '@/i18n/routing';

// The page itself is a client component, so its metadata lives here
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;
  return getPageMetadata(locale, 'Technologies', '/technologies');
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(toLocale(locale));
  return children;
}
