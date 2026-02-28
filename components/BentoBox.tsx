'use client';

import { motion, type MotionProps } from 'framer-motion';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface BentoBoxProps extends React.PropsWithChildren {
  className?: string;
  hoverScale?: number;
  motionProps?: MotionProps;
}

const ROTATION_SPEED_DEG_PER_MS = 0.07; // Smooth speed factor
const BORDER_WIDTH = 2;

// Generates the mask strings directly to guarantee browser repaints (avoids Safari CSS var caching bugs)
const getConicMask = (deg: number) => `
  conic-gradient(
    from ${deg}deg at 50% 50%,
    black 0%,
    black 12%,
    transparent 30%,
    transparent 70%,
    black 88%,
    black 100%
  )
`;

const getBorderMask = (deg: number) => `
  ${getConicMask(deg)},
  linear-gradient(#fff 0 0) content-box,
  linear-gradient(#fff 0 0)
`;

const BentoBox: React.FC<BentoBoxProps> = memo(
  ({ children, className = '', hoverScale = 1.02, motionProps }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    // Using refs directly allows 60fps manipulation without React renders
    const cardRef = useRef<HTMLDivElement>(null);
    const borderRef = useRef<HTMLDivElement>(null);
    const haloRef = useRef<HTMLDivElement>(null);

    const isHoveredRef = useRef(false);
    const angleRef = useRef(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
      setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === 'dark' : false;

    // The central animation loop updates the mask directly.
    // This perfectly robust Time-Delta based loop guarantees continuous looping
    // under all refresh rates and prevents the rotation from getting "stuck".
    useEffect(() => {
      let lastTime = performance.now();

      function tick(time: number) {
        // Calculate delta time to keep rotation speed consistent across monitors
        const dt = time - lastTime;
        lastTime = time;

        if (!isHoveredRef.current) {
          angleRef.current = (angleRef.current + dt * ROTATION_SPEED_DEG_PER_MS) % 360;
          
          if (borderRef.current) {
            borderRef.current.style.webkitMask = getBorderMask(angleRef.current);
            borderRef.current.style.mask = getBorderMask(angleRef.current);
          }
          if (haloRef.current) {
            haloRef.current.style.webkitMask = getBorderMask(angleRef.current);
            haloRef.current.style.mask = getBorderMask(angleRef.current);
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      }
      
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // Pointer events map directly into the DOM styles for instant feedback
    const handlePointerEnter = useCallback(() => {
      isHoveredRef.current = true;
      if (borderRef.current) borderRef.current.style.opacity = '1';
      if (haloRef.current) haloRef.current.style.opacity = isDark ? '0.7' : '0.9';
    }, [isDark]);

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        let angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;

        angleRef.current = angle;
        
        // Update mask strings matching the pointer perfectly
        if (borderRef.current) {
          borderRef.current.style.webkitMask = getBorderMask(angle);
          borderRef.current.style.mask = getBorderMask(angle);
        }
        if (haloRef.current) {
          haloRef.current.style.webkitMask = getBorderMask(angle);
          haloRef.current.style.mask = getBorderMask(angle);
        }
      },
      []
    );

    const handlePointerLeave = useCallback(() => {
      isHoveredRef.current = false;
      if (borderRef.current) borderRef.current.style.opacity = isDark ? '0.55' : '0.75';
      if (haloRef.current) haloRef.current.style.opacity = isDark ? '0.35' : '0.55';
    }, [isDark]);

    const meshColor1 = isDark ? 'hsl(270, 80%, 60%)' : 'hsl(270, 90%, 50%)';
    const meshColor2 = isDark ? 'hsl(174, 100%, 37%)' : 'hsl(174, 100%, 40%)';
    const meshColor3 = isDark ? 'hsl(200, 90%, 55%)' : 'hsl(200, 100%, 45%)';

    const cardBg = isDark
      ? 'rgba(15, 17, 21, 0.85)'
      : 'rgba(255, 255, 255, 0.95)';

    const meshGradient = `
      radial-gradient(circle at 30% 20%, ${meshColor1} 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, ${meshColor2} 0%, transparent 50%),
      radial-gradient(circle at 50% 90%, ${meshColor3} 0%, transparent 40%)
    `;

    return (
      <motion.div
        suppressHydrationWarning
        whileHover={{ scale: hoverScale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={className}
        {...motionProps}
      >
        <div
          ref={cardRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerLeave} // Ensures pointer leaving violently via scroll doesn't freeze it
          className="group relative w-full h-full rounded-[2rem] isolate"
        >
          <div
            ref={borderRef}
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] transition-opacity duration-500"
            style={{
              opacity: isDark ? 0.55 : 0.75,
              padding: `${BORDER_WIDTH}px`,
              background: meshGradient,
              // The mask is now driven entirely by RS/JS to avoid CSS var bugs
              WebkitMaskComposite: 'source-in, xor',
              maskComposite: 'intersect, exclude',
            }}
          />

          <div
            ref={haloRef}
            className="pointer-events-none absolute -inset-[3px] -z-20 rounded-[calc(2rem+3px)] blur-[6px] transition-opacity duration-500"
            style={{
              opacity: isDark ? 0.35 : 0.55,
              padding: `${BORDER_WIDTH + 3}px`,
              background: meshGradient,
              WebkitMaskComposite: 'source-in, xor',
              maskComposite: 'intersect, exclude',
              mixBlendMode: isDark ? 'plus-lighter' : 'normal',
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
            style={{
              padding: '1px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(0,191,174,0.1), rgba(124,58,237,0.12))'
                : 'linear-gradient(135deg, rgba(167,139,250,0.5), rgba(45,212,191,0.3), rgba(167,139,250,0.4))',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          <div
            className="relative z-10 w-full h-full rounded-[calc(2rem-1px)] p-6 transition-colors duration-500 shadow-xl backdrop-blur-3xl"
            style={{ backgroundColor: cardBg }}
          >
            {children}
          </div>
        </div>
      </motion.div>
    );
  }
);

BentoBox.displayName = 'BentoBox';

export default BentoBox;
