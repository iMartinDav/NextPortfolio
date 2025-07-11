'use client';

import { cn } from '../../lib/utils';
import { Variants, motion } from 'framer-motion';

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
}

export default function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  },
  className
}: WordPullUpProps) {
  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial='hidden'
      animate='show'
      className={cn(
        'font-display text-center text-6xl leading-20 font-bold tracking-tighter drop-shadow-xs md:text-7xl lg:text-8xl',
        className
      )}>
      {words.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: 'inline-block', paddingRight: '1rem' }}>
          {word === '' ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
