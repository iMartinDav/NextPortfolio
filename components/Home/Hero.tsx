'use client';

import { useEffect, useState } from 'react';

import Particle from '../Particle';
import DNAHelix from './DNAHelix';
import Type from './Type';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-[#060610] dark:via-[#0a0a1a] dark:to-[#0c1a1f]'>
      <div className='absolute inset-0 z-0'>
        <Particle
          className='absolute inset-0 z-0'
          lightModeColor='#00fff2'
          darkModeColor='#ffffff'
        />
      </div>

      <div
        className='pointer-events-none absolute inset-0 z-[1] dark:bg-[radial-gradient(ellipse_50%_40%_at_65%_45%,rgba(0,255,213,0.05)_0%,transparent_70%)] bg-[radial-gradient(ellipse_50%_40%_at_65%_45%,rgba(0,180,160,0.08)_0%,transparent_70%)]'
        aria-hidden='true'
      />

      <div className='relative z-20 container mx-auto px-6 h-full flex items-center pt-20 pb-10 md:py-32 pointer-events-none'>
        <div className='flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left pointer-events-auto'>
            <h1 className='mb-6 text-4xl leading-tight font-extrabold text-foreground dark:text-[#EAEAFF] md:text-6xl'>
              Hi There!
              <span
                className='wave text-4xl inline-block ml-2'
                role='img'
                aria-labelledby='wave'>
                👋🏻
              </span>
            </h1>

            <h2 className='mb-6 text-3xl font-bold text-foreground dark:text-[#EAEAFF] md:text-5xl'>
              I&apos;m <strong className='main-name text-primary-dark dark:text-primary'>Martin DAVILA</strong>
            </h2>

            <h3 className='mb-6 text-4xl leading-tight font-extrabold text-foreground dark:text-[#EAEAFF] md:text-6xl'>
              Decoding Life&apos;s Blueprint
              <span
                className='wave text-4xl inline-block ml-2'
                role='img'
                aria-labelledby='wave'>
                🧬
              </span>
            </h3>

            <div className='mt-8 md:mt-10 text-foreground'>
              <Type />
            </div>

            <div className='mt-10 flex w-full justify-center md:justify-start'>
              <a
                href='https://projects.imartin.dev/projects'
                target='_blank' 
                rel='noopener noreferrer'
                className='group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-teal-500/30 bg-teal-500/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-teal-400 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-teal-400 hover:bg-teal-500/20 hover:text-teal-100 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]'
              >
                <span className='absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]'>
                  <div className='relative h-full w-8 bg-white/20' />
                </span>
                <span className='relative flex items-center gap-2'>
                  Explore My Code
                  <svg className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </span>
              </a>
            </div>
          </div>
      </div>

      <div className='absolute inset-0 md:left-auto md:right-0 w-full md:w-[60%] h-full z-10 opacity-30 md:opacity-100 pointer-events-none md:pointer-events-auto'>
        <DNAHelix />
      </div>
    </section>
  );
}
