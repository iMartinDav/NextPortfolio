'use client';

import type React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'next-themes';

import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

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
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Effect to set mounted state
    useEffect(() => {
      setMounted(true);
    }, []);

    // Use a consistent theme value that works in both server and client
    const currentTheme = mounted ? resolvedTheme || theme : 'light'; // Default to light for SSR

    const styles = useMemo(() => {
      const borderColor =
        currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-300';
      const foregroundColor =
        currentTheme === 'dark' ? 'bg-foreground-dark' : 'bg-foreground-light';
      return { borderColor, foregroundColor };
    }, [currentTheme]);

    // Render a simple version during SSR that matches initial client render
    // This avoids the hydration mismatch
    return (
      <motion.div
        suppressHydrationWarning
        className={`relative ${styles.foregroundColor} overflow-hidden rounded-3xl p-1 shadow-lg ${className} ${styles.borderColor} border-[1px] border-opacity-30`}
        whileHover={{ scale: hoverScale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...motionProps}>
        <div
          suppressHydrationWarning
          className='absolute inset-0 h-[200px] w-[200px] rotate-45 animate-glow-move offset-path-rect'
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
          }}
        />
        <div
          suppressHydrationWarning
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
