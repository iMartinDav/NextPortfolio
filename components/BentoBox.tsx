'use client';

import type React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'next-themes';

import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

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
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Effect to set mounted state - only runs once
    useEffect(() => {
      setMounted(true);
    }, []);

    // Use a stable theme value to prevent infinite re-renders
    const isDark = mounted ? resolvedTheme === 'dark' : false;

    const styles = useMemo(() => {
      // Proper background colors for each theme
      const cardBackground = isDark
        ? 'bg-gray-900/80 backdrop-blur-sm'
        : 'bg-white/90 backdrop-blur-sm';

      const borderBackground = isDark ? 'bg-gray-900' : 'bg-white';

      // Enhanced glow colors for better visibility in both themes
      const enhancedGlowColor = isDark
        ? glowColor
        : glowColor.includes('rgba')
          ? glowColor.replace(/[\d.]+\)$/, '0.9)') // Increase opacity for light mode
          : 'rgba(59, 130, 246, 0.9)'; // Fallback bright color for light mode

      return { cardBackground, borderBackground, enhancedGlowColor, isDark };
    }, [isDark, glowColor]);

    // Render a simple version during SSR that matches initial client render
    // This avoids the hydration mismatch
    return (
      <motion.div
        suppressHydrationWarning
        className={`group relative overflow-hidden rounded-3xl p-1 shadow-lg ${className}`}
        whileHover={{ scale: hoverScale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...motionProps}>
        {/* Animated Border Glow Effect */}
        <div className='absolute inset-0 rounded-3xl opacity-95'>
          <div
            className='animate-border-glow absolute inset-0 rounded-3xl'
            style={{
              background: `conic-gradient(from 0deg, transparent 10%, ${styles.enhancedGlowColor} 20%, transparent 35%, ${styles.enhancedGlowColor} 50%, transparent 65%, ${styles.enhancedGlowColor} 80%, transparent 95%)`,
              padding: '4px'
            }}
          />
          <div
            className={`absolute inset-[4px] rounded-3xl ${styles.borderBackground} shadow-lg`}
          />
        </div>

        {/* Inner Glow Effect */}
        <div
          suppressHydrationWarning
          className='animate-glow-move offset-path-rect absolute inset-0 h-[200px] w-[200px] rotate-45 opacity-20'
          style={{
            background: `radial-gradient(circle, ${styles.enhancedGlowColor} 0%, transparent 70%)`
          }}
        />

        {/* Content Container */}
        <div
          suppressHydrationWarning
          className={`relative z-10 rounded-3xl p-4 shadow-inner ${styles.cardBackground}`}>
          {children}
        </div>
      </motion.div>
    );
  }
);

// Setting the display name
BentoBox.displayName = 'BentoBox';

export default BentoBox;
