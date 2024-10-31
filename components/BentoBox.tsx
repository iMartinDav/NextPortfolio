'use client';

import React, { memo, useEffect, useMemo } from 'react';

import { useTheme } from 'next-themes';

import { MotionProps, motion } from 'framer-motion';

interface BentoBoxProps extends React.PropsWithChildren {
  className?: string;
  glowColor?: string;
  hoverScale?: number;
  motionProps?: MotionProps;
}

const BentoBox: React.FC<BentoBoxProps> = memo(
  ({
    children,
    className = '',
    glowColor = 'rgba(255, 255, 255, 0.1)',
    hoverScale = 1.02,
    motionProps
  }) => {
    const { theme } = useTheme();

    // State to force re-render on theme change
    const [isMounted, setIsMounted] = React.useState(false);

    // Effect to set mounted state
    useEffect(() => {
      setIsMounted(true);
    }, []);

    const styles = useMemo(() => {
      const borderColor =
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
      const foregroundColor =
        theme === 'dark' ? 'bg-foreground-dark' : 'bg-foreground-light';
      return { borderColor, foregroundColor };
    }, [theme]);

    if (!isMounted) {
      return null;
    }

    return (
      <motion.div
        className={`relative ${styles.foregroundColor} overflow-hidden rounded-3xl p-1 shadow-lg ${className} ${styles.borderColor} border-[1px] border-opacity-30`}
        whileHover={{ scale: hoverScale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...motionProps}>
        <div
          className='absolute inset-0 h-[200px] w-[200px] rotate-45 animate-glow-move offset-path-rect'
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
          }}
        />
        <div
          className={`relative z-10 ${styles.foregroundColor} rounded-3xl border border-opacity-50 p-4 ${styles.borderColor} shadow-inner`}>
          {children}
        </div>
      </motion.div>
    );
  }
);

// Setting the display name
BentoBox.displayName = 'BentoBox';

export default BentoBox;
