import type { CSSProperties } from 'react';

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export default function Ripple({
  mainCircleOpacity = 0.24,
  numCircles = 6
}: RippleProps): React.JSX.Element {
  const baseSize = 400; 

  return (
    <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
      {Array.from({ length: numCircles }, (_, i) => {
        const animationDelay = `${i * 1.5}s`;
        const opacity = Math.max(mainCircleOpacity - i * 0.04, 0.02);

        return (
          <div
            key={`ripple-${i}-${numCircles}`}
            className='animate-ripple border-foreground/30 absolute rounded-full border'
            style={
              {
                width: `${baseSize}px`,
                height: `${baseSize}px`,
                left: '50%',
                top: '50%',
                marginLeft: `-${baseSize / 2}px`,
                marginTop: `-${baseSize / 2}px`,
                opacity: opacity,
                animationDelay: animationDelay,
                borderWidth: '60px',
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

