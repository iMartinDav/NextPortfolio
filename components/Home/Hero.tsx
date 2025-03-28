import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Particle from '../Particle';
import ButtonWithParticles from '../ParticleButton';
import Type from './Type';

// Import your custom button

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Update state to indicate client-side rendering
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <section className='relative flex min-h-screen items-center overflow-hidden bg-gradient-to-r from-[#EAEAFF] via-[#C8B6FF] to-[#7F00FF] dark:from-[#16141E] dark:via-[#0B0A21] dark:to-[#1D2A34]'>
      <Particle />
      <div className='container relative mx-auto px-6 py-20 md:py-32'>
        <div className='flex flex-col-reverse items-center md:flex-row'>
          <div className='mb-12 flex w-full flex-col items-center text-center md:mb-0 md:w-6/12 md:items-start md:text-left'>
            <h1 className='mb-6 text-4xl font-extrabold leading-tight text-[#3D3C45] dark:text-[#EAEAFF] md:text-6xl'>
              Hi There!
              <span
                className='wave text-4xl'
                role='img'
                aria-labelledby='wave'>
                👋🏻
              </span>
            </h1>

            <h2 className='mb-6 text-3xl font-bold text-[#3D3C45] dark:text-[#EAEAFF] md:text-5xl'>
              I&apos;m <strong className='main-name'>Martin DAVILA</strong>
            </h2>

            <h3 className='mb-6 text-4xl font-extrabold leading-tight text-[#3D3C45] dark:text-[#EAEAFF] md:text-6xl'>
              Decoding Life&apos;s Blueprint
              <span
                className='wave text-4xl'
                role='img'
                aria-labelledby='wave'>
                🧬
              </span>
            </h3>

            <div className='mt-8 md:mt-12'>
              <Type />
            </div>
          </div>

          <div className='flex w-full justify-center md:w-6/12'>
            <Image
              src='/home-main.svg'
              alt='home pic'
              width={600}
              height={600}
              className='h-auto max-w-full object-cover'
            />
          </div>
        </div>

        <div className='mb-12 mt-10 flex justify-center md:mt-20 md:justify-end'>
          <a
            href='#contact'
            className='transform transition-transform hover:scale-105'>
            <ButtonWithParticles />
          </a>
        </div>
      </div>
    </section>
  );
}
