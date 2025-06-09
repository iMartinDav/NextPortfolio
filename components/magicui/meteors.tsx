'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

interface MeteorsProps {
  number?: number;
}
export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') return;

    const generateMeteorStyles = () => {
      // Start meteors heavily from the LEFT side for maximum left-to-right coverage
      // This creates a shower effect that starts predominantly from the left edge
      const leftStartPercent = -10; // Start from -10% (even beyond the left edge for full coverage)
      const widthRangePercent = 60; // Use 60% range (-10% to 50% of container width - heavy left bias)

      return [...new Array(number)].map(() => ({
        top: Math.random() * -140 - 50, // Start even higher for longer travel distance
        left: `${leftStartPercent + Math.random() * widthRangePercent}%`, // -10% to 50% positioning (HEAVY left emphasis)
        animationDelay: `${Math.random() * 7 + 0.1}s`, // 0.1-7.1s stagger for continuous left-heavy shower
        animationDuration: `${Math.floor(Math.random() * 3 + 5)}s` // 5-8 second duration for extended visibility
      }));
    };

    setMeteorStyles(generateMeteorStyles());

    // Update positioning on window resize
    const handleResize = () => {
      setMeteorStyles(generateMeteorStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style) => (
        // Meteor Head
        <span
          key={`${style.left}-${style.animationDelay}-${style.animationDuration}`}
          className={clsx(
            'pointer-events-none absolute h-0.5 w-0.5 animate-meteor rounded-[9999px] bg-slate-400 shadow-[0_0_0_1px_#ffffff20]'
          )}
          style={style}>
          {/* Meteor Tail */}
          <div className='pointer-events-none absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-slate-400 to-transparent opacity-75' />
        </span>
      ))}
    </>
  );
};

export default Meteors;
