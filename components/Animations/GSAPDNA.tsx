'use client';

import React, { useRef } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const RUNGS_COUNT = 45;
const RUNG_SPACING = 12; // Vertical spacing between lines
const HELIX_TWIST = 16;  // Degrees of rotation per rung
const HELIX_SPEED = 4;   // Seconds for one full rotation

const GSAPDNA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const helixRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Handle hydration safely
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  // Premium theme colors adapted for dark and light modes
  const STRAND_1 = isDark ? '#00BFAE' : '#009688';
  const STRAND_2 = isDark ? '#7F00FF' : '#7C3AED';

  useGSAP(() => {
    // 1. Animate the main 3D Helix Rotation
    if (helixRef.current) {
      gsap.to(helixRef.current, {
        rotationY: 360,
        duration: HELIX_SPEED,
        repeat: -1,
        ease: 'none',
      });
    }

    // 2. Animate organic floating particles in the background
    if (particlesRef.current) {
      const particles = gsap.utils.toArray('.dna-particle');
      particles.forEach((particle: any) => {
        // Randomize starting positions and speeds
        gsap.to(particle, {
          y: `-=${gsap.utils.random(100, 200)}`,
          x: `+=${gsap.utils.random(-50, 50)}`,
          opacity: 0,
          scale: gsap.utils.random(0.5, 1.5),
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: false,
          delay: gsap.utils.random(0, -10), // start randomly during the timeline
          ease: 'sine.inOut',
        });
      });
    }
  }, { scope: containerRef });

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none"
      ref={containerRef}
      style={{ 
        perspective: '1200px', // Creates the 3D viewing perspective
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' // Fade top and bottom
      }}
    >
      {/* Fallback glow matching the high-end biology vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,0,255,0.05)_0%,transparent_60%)] -z-10 dark:bg-[radial-gradient(circle_at_center,rgba(0,191,174,0.08)_0%,transparent_60%)]" />
      
      {/* Floating Particles Layer */}
      <div ref={particlesRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="dna-particle absolute rounded-full"
            style={{
              // Use deterministic pseudo-random values seeded by index 'i' to prevent SSR hydration mismatches
              width: `${(Math.sin(i * 1.5) * 0.5 + 0.5) * 6 + 2}px`,
              height: `${(Math.cos(i * 2.3) * 0.5 + 0.5) * 6 + 2}px`,
              left: `${(Math.sin(i * 3.7) * 0.5 + 0.5) * 100}%`,
              top: `${80 + (Math.cos(i * 4.1) * 0.5 + 0.5) * 40}%`, // Start near bottom
              background: i % 2 === 0 ? STRAND_1 : STRAND_2,
              opacity: (Math.sin(i * 5.5) * 0.5 + 0.5) * 0.5 + 0.1,
              boxShadow: `0 0 8px ${i % 2 === 0 ? STRAND_1 : STRAND_2}`
            }}
          />
        ))}
      </div>

      {/* 3D Helix Layer */}
      <div 
        ref={helixRef}
        className="relative flex items-center justify-center z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* We center the strands by offsetting by half the total height */}
        <div className="relative" style={{ transform: `translateY(-${(RUNGS_COUNT * RUNG_SPACING) / 2}px)`, transformStyle: 'preserve-3d' }}>
          {Array.from({ length: RUNGS_COUNT }).map((_, i) => {
            const rotationY = i * HELIX_TWIST;
            
            // To create an infinite twisting illusion, the rungs are rotated independently.
            // We use a smooth glow and distinct colors for each strand backbone.
            
            return (
              <div 
                key={i}
                className="absolute flex items-center justify-between"
                style={{
                  top: `${i * RUNG_SPACING}px`,
                  left: '-90px', // Center the rung (180px total width)
                  width: '180px',
                  height: '2px', // Bonding thickness
                  transform: `rotateY(${rotationY}deg)`,
                  transformStyle: 'preserve-3d',
                  // The rung itself (Hydrogen bond)
                  background: `linear-gradient(90deg, ${STRAND_1}40 0%, ${STRAND_2}40 100%)`,
                }}
              >
                {/* Left Phosphate Backbone (Strand 1) */}
                <div 
                  className="absolute left-0 rounded-full"
                  style={{
                    width: '12px',
                    height: '12px',
                    transform: 'translate(-50%, -5px) rotateY(90deg)', // counteract flat distortion
                    background: STRAND_1,
                    boxShadow: `0 0 15px ${STRAND_1}, 0 0 5px ${STRAND_1} inset`
                  }}
                />
                
                {/* Right Phosphate Backbone (Strand 2) */}
                <div 
                  className="absolute right-0 rounded-full"
                  style={{
                    width: '12px',
                    height: '12px',
                    transform: 'translate(50%, -5px) rotateY(-90deg)', // counteract flat distortion
                    background: STRAND_2,
                    boxShadow: `0 0 15px ${STRAND_2}, 0 0 5px ${STRAND_2} inset`
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GSAPDNA;
