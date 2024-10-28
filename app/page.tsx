// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Bento } from '@/components/bento';
import BentoContact from '@/components/Home/BentoContact';
import BiotechProfile from '@/components/Home/BiotechProfile';
import Hero from '@/components/Home/Hero';
import PreLoader from '@/components/Pre';

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
  }, []);

  return (
    <>
      {showLoader && <PreLoader />}
      <section
        className={`min-h-screen flex flex-col justify-between transition-opacity duration-300 ${
          contentReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Hero />
        <div className="w-full flex items-center justify-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center overflow-hidden">
            <div className="w-full py-2 px-2 lg:py-10 lg:px-4">
              <Bento />
              <BentoContact />
              <BiotechProfile />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
