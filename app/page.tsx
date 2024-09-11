"use client";

import Hero from "./components/Home/Hero";
import Home2 from "./components/Home/Home2";

export default function LandingPage() {
  return (
    <section className="min-h-screen flex flex-col justify-between">
      <Hero />
      <Home2 />
    </section>
  );
}
