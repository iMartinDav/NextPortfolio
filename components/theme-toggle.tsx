'use client';

import * as React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * BioTech Theme Toggle — Native View Transitions API
 *
 * Uses the browser's startViewTransition for a GPU-composited
 * circular reveal. Zero JavaScript animation overhead.
 * Falls back to an instant swap on unsupported browsers.
 */

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => setMounted(true), []);

  const handleToggle = React.useCallback(() => {
    if (!mounted) return;

    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    // If View Transitions API is not supported, just swap instantly
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Set CSS custom properties for the reveal origin
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      document.documentElement.style.setProperty('--toggle-x', `${x}px`);
      document.documentElement.style.setProperty('--toggle-y', `${y}px`);
    }

    // The browser snapshots the old state, we change the theme,
    // then it animates between old and new snapshots on the GPU
    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  }, [mounted, resolvedTheme, setTheme]);

  if (!mounted) return <div className="h-10 w-10" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      ref={buttonRef}
      variant="none"
      size="icon"
      onClick={handleToggle}
      className={cn(
        'relative z-50 h-10 w-10 rounded-full transition-all duration-200',
        'hover:bg-gray-200/60 dark:hover:bg-white/10 active:scale-90'
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ scale: 0, opacity: 0, rotate: -120 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 120 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-[1.15rem] w-[1.15rem] text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
          ) : (
            <Sun className="h-[1.15rem] w-[1.15rem] text-purple-600 drop-shadow-[0_0_6px_rgba(147,51,234,0.5)]" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
