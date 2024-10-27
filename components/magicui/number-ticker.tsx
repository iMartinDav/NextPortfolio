import { cn } from '@/lib/utils';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number; // delay in seconds
}

export default function NumberTicker({
  value,
  delay = 0,
  className
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      // Return cleanup function for the timeout
      return () => clearTimeout(timeoutId);
    }

    // Return undefined if not in view
    return undefined;
  }, [motionValue, isInView, delay, value]);

  useEffect(() => {
    const handleSpringChange = (latest: number) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(latest);
      }
    };

    const unsubscribe = springValue.on('change', handleSpringChange);

    // Return cleanup function for the subscription
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span className={cn('tabular-nums text-justify', className)} ref={ref} />
  );
}
