'use client';

import type { ReactNode } from 'react';

import BentoContact from '@/components/Home/BentoContact';
import BiotechProfile from '@/components/Home/BiotechProfile';
import Hero from '@/components/Home/Hero';
import PreLoader from '@/components/Pre';
import { Bento } from '@/components/bento';
import { useMounted } from '@/hooks/use-mounted';

function ThemeAwareWrapper({ children }: { children: ReactNode }) {
  const mounted = useMounted();

  // Same element on both renders: swapping <div> for a fragment would remount
  // (and re-fetch) the whole page once hydrated.
  return (
    <div
      style={
        mounted ? undefined : { visibility: 'hidden', height: '100dvh' }
      }>
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <PreLoader />
      <ThemeAwareWrapper>
        <section
          className='intro-content flex min-h-screen flex-col justify-between'>
          <Hero />
          <div className='mx-auto flex w-full max-w-5xl items-center justify-center'>
            <div className='flex flex-col items-center overflow-hidden'>
              <div className='w-full px-2 py-2 lg:px-4 lg:py-10'>
                <Bento />
                <BentoContact />
                <BiotechProfile />
              </div>
            </div>
          </div>
        </section>
      </ThemeAwareWrapper>
    </>
  );
}
