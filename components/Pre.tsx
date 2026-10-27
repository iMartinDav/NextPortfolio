// components/Pre.tsx
'use client';

import { useEffect } from 'react';

import { INTRO_STORAGE_KEY } from '@/lib/intro';

// Intro splash: plays once per browser session (first entry to the site).
// Visibility is driven by `html[data-intro]`, which `introBootScript` (lib/intro.ts) sets
// before first paint, so refreshes / back-navigation never flash the splash
// and server and client markup always match.

const INTRO_DURATION_MS = 800;
const EXIT_DURATION_MS = 300;

const text = 'iMartinDav';

const PreLoader = () => {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === 'played') return;

    document.body.style.overflow = 'hidden';

    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const timer = setTimeout(() => {
      root.dataset.intro = 'exiting';
      exitTimer = setTimeout(() => {
        root.dataset.intro = 'played';
        document.body.style.overflow = '';
        try {
          sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
        } catch {
          // Storage unavailable (private mode): intro simply replays next load
        }
      }, EXIT_DURATION_MS);
    }, INTRO_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
      document.body.style.overflow = '';
      // Unmounted mid-intro (navigated away): don't leave the content hidden
      if (root.dataset.intro !== 'played') root.dataset.intro = 'played';
    };
  }, []);

  return (
    <div
      className='intro-splash fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md'
      role='status'
      aria-label='Loading'
      style={{ isolation: 'isolate' }}>
      <div className='absolute inset-0 bg-black/80' />
      <div className='relative z-10 flex flex-col items-center gap-8'>
        <div className='relative'>
          <div
            className='flex space-x-1'
            aria-hidden='true'>
            {text.split('').map((char, index) => (
              <div
                key={`char-${char}-position-${index}`}
                className='intro-float'
                style={{ animationDelay: `${index * 0.05}s` }}>
                <span
                  className='relative text-6xl font-light tracking-wider text-transparent md:text-8xl'
                  style={{
                    WebkitTextStroke: '1px rgb(79, 209, 197)',
                    filter: 'drop-shadow(0 0 12px rgba(79, 209, 197, 0.7))'
                  }}>
                  {char}
                </span>
              </div>
            ))}
          </div>
          <div className='absolute inset-0 -z-10'>
            <div
              className='absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-teal-500/30 to-transparent blur-2xl'
              style={{ animationDuration: '1s' }}
            />
          </div>
        </div>

        <div className='h-1 w-48 overflow-hidden rounded-full bg-gray-800/50'>
          <div
            className='intro-progress h-full rounded-full bg-linear-to-r from-teal-400 via-cyan-500 to-teal-400'
            style={{ animationDuration: `${INTRO_DURATION_MS}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
