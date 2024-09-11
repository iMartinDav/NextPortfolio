"use client";

import React, { useEffect, useState } from "react";
import Particle from "../Particle";
import Image from "next/image";
import { Type } from "./Type";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Update state to indicate client-side rendering
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0A0B21] via-[#141C2A] to-[#1D2A34] min-h-screen flex items-center">
      <Particle />
      <div className="container mx-auto px-6 py-20 md:py-32 relative">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-6/12 mb-12 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Hi There!
              <span className="wave text-4xl" role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              I&apos;M <strong className="main-name">Martin DAVILA</strong>
            </h2>

            <div className="mt-8 md:mt-12">
              <Type />
            </div>
          </div>

          <div className="w-full md:w-6/12 flex justify-center">
            <Image
              src="/home-main.svg"
              alt="home pic"
              width={600} // Adjust width as needed
              height={600} // Adjust height as needed
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <a
          href="#contact"
          className="fixed bottom-10 right-10 px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
