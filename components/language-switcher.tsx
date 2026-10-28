'use client';

import * as React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { getPathname, usePathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { LOCALE_REVEAL_KEY } from '@/lib/locale-reveal';
import { cn } from '@/lib/utils';

/** Persists the choice, stores the reveal origin, then loads the new locale. */
function switchLocale(next: Locale, pathname: string, origin?: DOMRect) {
  // Remember the choice (beats Accept-Language detection on later visits)
  document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;

  // Origin of the circular reveal on the next page, like the theme toggle
  if (origin) {
    try {
      sessionStorage.setItem(
        LOCALE_REVEAL_KEY,
        JSON.stringify({
          x: origin.left + origin.width / 2,
          y: origin.top + origin.height / 2
        })
      );
    } catch {
      // No storage: the page still switches, just without the reveal origin
    }
  }

  const url = getPathname({ href: pathname, locale: next });
  window.location.assign(url + window.location.search + window.location.hash);
}

/**
 * Language picker styled to match ThemeToggle: same round icon button, and the
 * same circular reveal from the button when the language changes.
 *
 * Switching is a full navigation to the pre-rendered page of the new locale.
 * The root layout is keyed by [locale], so a client-side switch would remount
 * <html> anyway, re-creating inline scripts (next-themes) that React can't run.
 * A cross-document view transition (see lib/locale-reveal.ts) keeps it smooth.
 */
export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = React.useId();

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const selectLocale = (next: Locale) => {
    setOpen(false);
    buttonRef.current?.focus();
    if (next === locale) return;

    switchLocale(next, pathname, buttonRef.current?.getBoundingClientRect());
  };

  const focusItem = (index: number) => {
    const count = routing.locales.length;
    itemRefs.current[(index + count) % count]?.focus();
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const current = itemRefs.current.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(routing.locales.length - 1);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
      if (e.key === 'Escape') buttonRef.current?.focus();
    }
  };

  const toggleMenu = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        // Focus the active language once the menu has rendered
        requestAnimationFrame(() =>
          focusItem(routing.locales.indexOf(locale))
        );
      }
      return !wasOpen;
    });
  };

  return (
    <div className='relative'>
      <Button
        ref={buttonRef}
        variant='none'
        size='icon'
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            toggleMenu();
          }
        }}
        className={cn(
          'relative z-50 h-10 w-10 rounded-full transition-all duration-200',
          'hover:bg-gray-200/60 dark:hover:bg-white/10 active:scale-90'
        )}
        aria-label={t('label')}
        aria-haspopup='menu'
        aria-expanded={open}
        aria-controls={menuId}>
        <motion.span
          animate={{ rotate: open ? -12 : 0, scale: open ? 0.92 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className='flex items-center justify-center'>
          <Languages className='h-[1.15rem] w-[1.15rem] text-purple-600 drop-shadow-[0_0_6px_rgba(147,51,234,0.5)] dark:text-cyan-400 dark:drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]' />
        </motion.span>
        {/* Current language, tucked into the corner like a notification dot */}
        <span
          aria-hidden='true'
          className='ring-background absolute -right-0.5 -bottom-0.5 rounded-full bg-purple-600 px-1 text-[0.5rem] leading-[0.8rem] font-bold tracking-wide text-white uppercase ring-2 dark:bg-cyan-400 dark:text-gray-950'>
          {locale}
        </span>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role='menu'
            aria-label={t('label')}
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={cn(
              'absolute top-12 right-0 z-50 w-44 origin-top-right overflow-hidden rounded-2xl p-1.5',
              'border border-gray-200/70 bg-white/85 shadow-xl backdrop-blur-xl',
              'dark:border-white/10 dark:bg-gray-950/85 dark:shadow-[0_8px_30px_rgba(34,211,238,0.12)]'
            )}>
            {routing.locales.map((l, i) => {
              const active = l === locale;
              return (
                <button
                  key={l}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type='button'
                  role='menuitemradio'
                  aria-checked={active}
                  lang={l}
                  onClick={() => selectLocale(l)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors outline-none',
                    'hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-white/10 dark:focus-visible:bg-white/10',
                    active
                      ? 'font-semibold text-purple-700 dark:text-cyan-300'
                      : 'text-gray-700 dark:text-gray-300'
                  )}>
                  <span
                    aria-hidden='true'
                    className={cn(
                      'w-6 text-[0.65rem] font-bold tracking-wider uppercase',
                      active ? 'text-purple-600 dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500'
                    )}>
                    {l}
                  </span>
                  <span className='flex-1'>{t(l)}</span>
                  {active && (
                    <Check
                      aria-hidden='true'
                      className='h-4 w-4 text-purple-600 dark:text-cyan-400'
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
