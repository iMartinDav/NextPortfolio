"use client";

import { Bento } from "@/components/bento";
import BentoContact from "@/components/Home/BentoContact";
import BiotechProfile from "@/components/Home/BiotechProfile";
import Hero from "@/components/Home/Hero";

export default function LandingPage() {
  return (
    <section className="min-h-screen flex flex-col justify-between">
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
  );
}
