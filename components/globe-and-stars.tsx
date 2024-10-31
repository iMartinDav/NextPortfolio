'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import Globe from '@/components/magicui/globe';
import Particles from '@/components/magicui/particles';

export default function GlobeAndStars() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#808080');
  }, [theme]);

  return (
    <div className=''>
      <Particles
        className=''
        quantity={150}
        ease={80}
        color={color}
        refresh
      />
      <Globe />
    </div>
  );
}
