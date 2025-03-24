// app/page.tsx
'use client';

import { useEffect, useState } from 'react';

import BentoContact from '@/components/Home/BentoContact';
import BiotechProfile from '@/components/Home/BiotechProfile';
import Hero from '@/components/Home/Hero';
import PreLoader from '@/components/Pre';
import { Bento } from '@/components/bento';

// Create a ThemeAwareWrapper to prevent hydration mismatches
import type { ReactNode } from 'react';

function ThemeAwareWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Return a completely hidden placeholder during SSR to prevent hydration mismatches
  if (!mounted) {
    return <div style={{ visibility: 'hidden', height: '100vh' }}>{children}</div>;
  }
  
  return <>{children}</>;
}

export default function LandingPage() {
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
    }

    // Reduced total loading time to 1000ms (1 second)
    const timer = setTimeout(() => {
      setShowLoader(false);
      setTimeout(() => {
        setContentReady(true);
        document.body.style.overflow = 'auto';
      }, 50); // Faster content reveal
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [showLoader]); // Added showLoader as a dependency

  return (
    <>
      {showLoader && <PreLoader />}
      <ThemeAwareWrapper>
        <section
          className={`flex min-h-screen flex-col justify-between transition-opacity duration-300 ${
            contentReady ? 'opacity-100' : 'opacity-0'
          }`}>
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
