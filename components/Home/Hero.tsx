import React, { useEffect, useState } from 'react';
import Particle from '../Particle';
import Image from 'next/image';
import { Type } from './Type';
import ButtonWithParticles from '../ParticleButton'; // Import your custom button

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Update state to indicate client-side rendering
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#EAEAFF] via-[#C8B6FF] to-[#7F00FF] dark:from-[#16141E] dark:via-[#0B0A21] dark:to-[#1D2A34] min-h-screen flex items-center">
      <Particle />
      <div className="container mx-auto px-6 py-20 md:py-32 relative">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-6/12 mb-12 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#3D3C45] dark:text-[#EAEAFF] leading-tight mb-6">
              Hi There!
              <span className="wave text-4xl" role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>

            <h2 className="text-3xl md:text-5xl font-bold text-[#3D3C45] dark:text-[#EAEAFF] mb-6">
              I&apos;m <strong className="main-name">Martin DAVILA</strong>
            </h2>

            <h3 className="text-4xl md:text-6xl font-extrabold text-[#3D3C45] dark:text-[#EAEAFF] leading-tight mb-6">
              Decoding Life&apos;s Blueprint
              <span className="wave text-4xl" role="img" aria-labelledby="wave">
                🧬
              </span>
            </h3>

            <div className="mt-8 md:mt-12">
              <Type />
            </div>
          </div>

          <div className="w-full md:w-6/12 flex justify-center">
            <Image
              src="/home-main.svg"
              alt="home pic"
              width={600}
              height={600}
              className="max-w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-10 md:mt-20 mb-12">
          <a
            href="#contact"
            className="transition-transform transform hover:scale-105"
          >
            <ButtonWithParticles />
          </a>
        </div>
      </div>
    </section>
  );
}
