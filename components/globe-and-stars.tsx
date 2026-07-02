'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Globe from '@/components/magicui/globe';
import Particles from '@/components/magicui/particles';

export default function GlobeAndStars({ globeClassName }: { globeClassName?: string } = {}) {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px' });

  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#808080');
  }, [theme]);

  return (
    <div className='h-full w-full' ref={containerRef}>
      {isInView && (
        <>
          <Particles
            className=''
            quantity={50}
            ease={80}
            color={color}
            refresh
          />
          <Globe className={globeClassName} />
        </>
      )}
    </div>
  );
}
