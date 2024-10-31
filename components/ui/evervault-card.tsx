'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { MotionValue, useMotionValue } from 'framer-motion';
import { motion, useMotionTemplate } from 'framer-motion';

export const EvervaultCard = ({
  text,
  className
}: {
  text?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(0); // Initialized as MotionValue<number>
  const mouseY = useMotionValue(0); // Initialized as MotionValue<number>

  const [randomString, setRandomString] = useState<string>('');

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        'relative flex aspect-square h-full w-full items-center justify-center bg-transparent p-0.5',
        className
      )}>
      <div
        onMouseMove={onMouseMove}
        className='group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent'>
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className='relative z-10 flex items-center justify-center'>
          <div className='relative flex h-44 w-44 items-center justify-center rounded-full text-xl font-bold text-white lg:text-3xl'>
            <div className='absolute h-full w-full rounded-full bg-white/[0.8] blur-sm dark:bg-black/[0.8]' />
            <span className='z-20 text-black dark:text-white'>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CardPattern({
  mouseX,
  mouseY,
  randomString
}: {
  mouseX: MotionValue<number>; // Specify as MotionValue<number>
  mouseY: MotionValue<number>; // Specify as MotionValue<number>
  randomString: string;
}) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className='pointer-events-none'>
      <div className='absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50'></div>
      <motion.div
        className='absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00BFAE] to-[#4B0082] opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100'
        style={style}
      />
      <motion.div
        className='absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100'
        style={style}>
        <p className='absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-white transition duration-500'>
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  'ATGGAAGGTGGTTTTTCCAGCAGTGGCTTACAAATCACATTCATTGAGCTGTCATTGTCA';
export const generateRandomString = (length: number): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const TouchButton = ({
  onClick,
  label
}: {
  onClick: () => void;
  label: string;
}) => {
  return (
    <button
      onClick={onClick}
      className='flex transform items-center justify-center rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 active:scale-95'
      aria-label={label}
      style={{ minWidth: '44px', minHeight: '44px' }}>
      {label}
    </button>
  );
};
