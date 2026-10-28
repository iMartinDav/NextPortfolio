import { getTranslations, setRequestLocale } from 'next-intl/server';

import BlurIn from '@/components/magicui/blur-in';
import { FadeIn } from '@/components/magicui/fade-in';
import { getPageMetadata } from '@/i18n/metadata';
import { toLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, 'WorldwideReach', '/worldwide-reach');
}

export default async function WorldwideReach({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(toLocale(locale));
  const t = await getTranslations('WorldwideReach');

  return (
    <div className='mx-auto mt-10 w-full max-w-2xl px-6'>
      <BlurIn duration={0.5}>
        <FadeIn direction='up'>
          <div className='flex flex-col items-start'>
            <div className='text-center text-4xl font-bold'>{t('title')}</div>
            <div className='font-thin'>{t('subtitle')}</div>
          </div>
        </FadeIn>
      </BlurIn>

      <BlurIn duration={0.5}>
        <FadeIn direction='down'>
          <section className='mt-10'>
            <div className='text-2xl font-bold'>{t('cloudTitle')}</div>

            <div>
              {t('cloudBody')}
            </div>

            <ul className='mt-2 ml-10 list-disc'>
              <li>Vercel</li>
              <li>AWS</li>
              <li>Azure</li>
              <li>Docker</li>
              <li>Linode</li>
              <li>Digital Ocean</li>
            </ul>
          </section>

          <section className='mt-5'>
            <div className='text-2xl font-bold'>{t('edgeTitle')}</div>

            <div>
              {t('edgeBody')}
            </div>
          </section>

          <section className='mt-5'>
            <div className='text-2xl font-bold'>{t('onPremTitle')}</div>

            <div>
              {t('onPremBody')}
            </div>
          </section>
        </FadeIn>
      </BlurIn>
    </div>
  );
}
