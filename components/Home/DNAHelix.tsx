'use client';

import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { Suspense, useRef } from 'react';
import { useInView } from 'framer-motion';
import { DNAHelixScene } from './DNAHelixScene';

const S = 0.045;

export default function DNAHelix() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Performance Optimization: Pause the WebGL rendering loop entirely when off-screen
  const isInView = useInView(containerRef, { margin: '200px' });

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <Canvas
        frameloop={isInView ? 'always' : 'demand'} // Halts GPU rendering when user scrolls past
        camera={{ position: [0, 0, 16], fov: 48, near: 0.01, far: 300 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <DNAHelixScene isLight={isLight} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none select-none opacity-70 z-10 hidden md:flex">
        <div className="font-mono text-[9px] leading-relaxed text-[#00c8aa]/40 dark:text-[#00c8aa]/30 max-w-[340px] tracking-wide">
          <span className="text-[#00c8aa]/60 dark:text-[#00c8aa]/50 font-bold">Fig. 1</span>
          {' '}B-DNA double helix · canonical B-form · right-handed · 10 bp/turn
          <br />
          rise = 3.4 Å · twist = 36.0°/bp · ⌀ ≈ 20 Å · major groove 22 Å · minor groove 12 Å
          <br />
          strand offset 168° · C2′-endo sugar pucker · antiparallel 5′→3′ / 3′→5′
          <br />
          <span className="text-[#00c8aa]/25 dark:text-[#00c8aa]/18">
            ref. Drew et al. 1981 PDB:1BNA · Arnott &amp; Hukins 1972 · scale 1 Å = {S.toFixed(3)} u
          </span>
        </div>

        <div className="font-mono text-[9px] leading-relaxed text-[#00c8aa]/30 dark:text-[#00c8aa]/25 text-right tracking-wide">
          <div className="text-[#00c8aa]/45 dark:text-[#00c8aa]/40 mb-[2px] tracking-widest">— atom key —</div>
          <div><span className="text-[#00ffee]/50 dark:text-[#00ffee]/40">●</span> P · phosphate</div>
          <div><span className="text-[#00c8a8]/50 dark:text-[#00c8a8]/40">●</span> C · sugar</div>
          <div><span className="text-[#00e5cc]/50 dark:text-[#00e5cc]/40">●</span> A/G · purine</div>
          <div><span className="text-[#00b8ff]/50 dark:text-[#00b8ff]/40">●</span> C/T · pyrimidine</div>
          <div><span className="text-[#aafff0]/40 dark:text-[#aafff0]/30">—</span> H-bond · A·T=2 · G·C=3</div>
        </div>
      </div>
    </div>
  );
}
