'use client';

import { useMemo } from 'react';

import clsx from 'clsx';

import { useMounted } from '@/hooks/use-mounted';

interface MeteorsProps {
  number?: number;
}
// Start meteors heavily from the LEFT side for a left-to-right shower:
// -10% (beyond the left edge) to 50% of the container width.
const LEFT_START_PERCENT = -10;
const WIDTH_RANGE_PERCENT = 60;

function generateMeteorStyles(count: number): React.CSSProperties[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * -140 - 50, // Start high for a longer travel distance
    left: `${LEFT_START_PERCENT + Math.random() * WIDTH_RANGE_PERCENT}%`,
    animationDelay: `${Math.random() * 7 + 0.1}s`, // 0.1-7.1s stagger for a continuous shower
    animationDuration: `${Math.floor(Math.random() * 3 + 5)}s` // 5-8s for extended visibility
  }));
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  // Random layout is client-only (it would differ from the server render);
  // positions are percentages, so it doesn't need regenerating on resize.
  const mounted = useMounted();
  const meteorStyles = useMemo(
    () => (mounted ? generateMeteorStyles(number) : []),
    [mounted, number]
  );

  return (
    <>
      {meteorStyles.map((style) => (
        // Meteor Head
        <span
          key={`${style.left}-${style.animationDelay}-${style.animationDuration}`}
          className={clsx(
            'animate-meteor pointer-events-none absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-400 shadow-[0_0_0_1px_#ffffff20]'
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
