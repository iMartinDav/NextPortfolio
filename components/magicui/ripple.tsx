import type { CSSProperties } from 'react';
import React from 'react';

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

const Ripple = React.memo(function Ripple({
  mainCircleOpacity = 0.24,
  numCircles = 6
}: RippleProps) {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      {Array.from({ length: numCircles }, (_, i) => {
        const animationDelay = `${i * 1.5}s`;
        const opacity = Math.max(mainCircleOpacity - i * 0.04, 0.02);

        return (
          <div
            key={`ripple-${i}-${numCircles}`}
            className='animate-ripple border-foreground/30 pointer-events-none absolute rounded-full border'
            style={
              {
                width: '20px',
                height: '20px',
                left: '50%',
                top: '50%',
                marginLeft: '-10px',
                marginTop: '-10px',
                opacity: opacity,
                animationDelay: animationDelay,
                borderWidth: '3px'
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = 'Ripple';

export default Ripple;
