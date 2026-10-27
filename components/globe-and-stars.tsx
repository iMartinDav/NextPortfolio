'use client';


import { useTheme } from 'next-themes';

import { useRef } from 'react';

import { useMounted } from '@/hooks/use-mounted';
import { useInView } from 'framer-motion';
import Globe from '@/components/magicui/globe';
import Particles from '@/components/magicui/particles';

export default function GlobeAndStars({ globeClassName }: { globeClassName?: string } = {}) {
  const { theme } = useTheme();
  const mounted = useMounted();
  const color = mounted && theme !== 'dark' ? '#808080' : '#ffffff';
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px' });

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
