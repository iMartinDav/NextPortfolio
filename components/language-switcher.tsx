'use client';

import { useTransition } from 'react';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * Compact language picker for the navbar. A native <select> sits invisibly on
 * top of the pill, so it stays keyboard/screen-reader friendly and uses the
 * OS picker on mobile. next-intl stores the choice in the NEXT_LOCALE cookie,
 * which takes precedence over browser auto-detection on later visits.
 */
export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function onChange(next: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params always match the current pathname
        { pathname, params },
        { locale: next, scroll: false }
      );
    });
  }

  return (
    <label
      className={cn(
        'relative z-50 flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold uppercase transition-all duration-200',
        'text-purple-600 hover:bg-gray-200/60 dark:text-cyan-400 dark:hover:bg-white/10',
        isPending && 'opacity-60'
      )}>
      <Languages
        className='h-[1.05rem] w-[1.05rem]'
        aria-hidden='true'
      />
      <span aria-hidden='true'>{locale}</span>
      <span className='sr-only'>{t('label')}</span>
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value as Locale)}
        disabled={isPending}
        className='absolute inset-0 cursor-pointer appearance-none opacity-0'>
        {routing.locales.map((l) => (
          <option
            key={l}
            value={l}
            lang={l}>
            {t(l)}
          </option>
        ))}
      </select>
    </label>
  );
}
