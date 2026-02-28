'use client';

import { Player } from '@remotion/player';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

const POINTS = 80;

export const DNAHelixAnimation: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // Premium theme colors adapted for dark and light modes
  const STRAND_1 = isDark ? "rgba(0, 191, 174, 1)" : "rgba(0, 150, 136, 1)";
  const STRAND_2 = isDark ? "rgba(127, 0, 255, 1)" : "rgba(124, 58, 237, 1)";
  
  const loopDuration = fps * 4; // 4 seconds loop
  const progress = (frame % loopDuration) / loopDuration;

  const segments = [];
  
  // Calculate segments for 3D ribbon effect
  for (let i = 0; i < POINTS; i++) {
     const t1 = i / POINTS;
     const t2 = (i + 1) / POINTS;

     // Calculate position and 3D Z-depth for starting point of segment
     const x1 = t1 * width;
     const angle1 = t1 * Math.PI * 5 - progress * Math.PI * 2;
     const y1A = height / 2 + Math.sin(angle1) * (height / 3.5);
     const y1B = height / 2 + Math.sin(angle1 + Math.PI) * (height / 3.5);
     const z1A = Math.cos(angle1);
     const z1B = Math.cos(angle1 + Math.PI);

     // Calculate position and 3D Z-depth for ending point of segment
     const x2 = t2 * width;
     const angle2 = t2 * Math.PI * 5 - progress * Math.PI * 2;
     const y2A = height / 2 + Math.sin(angle2) * (height / 3.5);
     const y2B = height / 2 + Math.sin(angle2 + Math.PI) * (height / 3.5);
     const z2A = Math.cos(angle2);
     const z2B = Math.cos(angle2 + Math.PI);

     // Strand 1 segment
     segments.push({
         path: `M ${x1} ${y1A} L ${x2} ${y2A}`,
         z: (z1A + z2A) / 2,
         color: STRAND_1,
         type: 'strand'
     });

     // Strand 2 segment
     segments.push({
         path: `M ${x1} ${y1B} L ${x2} ${y2B}`,
         z: (z1B + z2B) / 2,
         color: STRAND_2,
         type: 'strand'
     });

     // Connecting links (hydrogen bonds)
     if (i % 3 === 0) {
         segments.push({
             path: `M ${x1} ${y1A} L ${x1} ${y1B}`,
             z: (z1A + z1B) / 2,
             color: "link",
             type: 'link'
         });
     }
  }

  // Sort by Z index to simulate realistic 3D depth rendering
  segments.sort((a, b) => a.z - b.z);

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'visible', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
                <linearGradient id="link-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={STRAND_1} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={STRAND_2} stopOpacity="0.6" />
                </linearGradient>
                <filter id="premium-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation={isDark ? "4" : "2"} result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {segments.map((seg, i) => {
                if (seg.type === "link") {
                    return (
                        <path 
                          key={`link-${i}`}
                          d={seg.path}
                          stroke="url(#link-grad)"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          opacity={0.3}
                        />
                    );
                }

                // Smooth Depth perception metrics
                const depthScale = (seg.z + 1) / 2; // Converts from logic [-1, 1] to [0, 1]
                const thickness = 2 + depthScale * 5; // Dynamic stroke width 2px to 7px based on depth
                const opacity = 0.3 + depthScale * 0.7; // Transparency for strokes in the back
                
                return (
                    <path
                        key={`strand-${i}`}
                        d={seg.path}
                        stroke={seg.color}
                        strokeWidth={thickness}
                        strokeLinecap="round"
                        opacity={opacity}
                        filter={depthScale > 0.6 ? "url(#premium-glow)" : "none"}
                    />
                );
            })}
            
            {/* Added ambient floating biological dust particles around the scene */}
            {Array.from({ length: 15 }).map((_, i) => {
                const speedOffset = (i * 0.1);
                const rawX = (progress + speedOffset) * width;
                const x = rawX % width;
                const wave = Math.sin((x / width) * Math.PI * 4 + i);
                const y = height / 2 + wave * (height / 2.5) * (i % 2 === 0 ? 1 : -1);
                const fadeOpacity = (1 - Math.abs(width/2 - x) / (width/2)) * 0.5; // Fades out perfectly on edges
                return (
                   <circle 
                     key={`particle-${i}`} 
                     cx={x} 
                     cy={y} 
                     r={i % 3 === 0 ? 2 : 1.2}
                     fill={i % 2 === 0 ? STRAND_1 : STRAND_2}
                     opacity={fadeOpacity}
                     filter="url(#premium-glow)"
                   />
                );
            })}
        </svg>
    </div>
  );
};

const RemotionDNA: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // To avoid hydration mismatch, default to dark representation
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <div className="w-full h-full relative isolate">
      {/* Fallback glow background matching the DNA vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,0,255,0.05)_0%,transparent_60%)] -z-10 dark:bg-[radial-gradient(circle_at_center,rgba(127,0,255,0.1)_0%,transparent_60%)]" />
      <Player
        component={DNAHelixAnimation}
        inputProps={{ isDark }}
        durationInFrames={120}
        compositionWidth={400}
        compositionHeight={200}
        fps={30}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        loop
        autoPlay
      />
    </div>
  );
};

export default RemotionDNA;
