import React, { memo, useEffect, useMemo } from "react";
import { motion, MotionProps } from "framer-motion";
import { useTheme } from "next-themes";

interface BentoBoxProps extends React.PropsWithChildren {
  className?: string;
  glowColor?: string;
  hoverScale?: number;
  motionProps?: MotionProps;
}

const BentoBox: React.FC<BentoBoxProps> = memo(({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.1)",
  hoverScale = 1.02,
  motionProps,
}) => {
  const { theme } = useTheme(); // Removed setTheme since it's unused

  // State to force re-render on theme change
  const [isMounted, setIsMounted] = React.useState(false);

  // Effect to set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const styles = useMemo(() => {
    const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
    const foregroundColor = theme === "dark" ? "bg-foreground-dark" : "bg-foreground-light";
    return { borderColor, foregroundColor };
  }, [theme]);

  if (!isMounted) {
    // Prevent rendering until mounted
    return null;
  }

  return (
    <motion.div
      className={`relative ${styles.foregroundColor} rounded-3xl p-1 shadow-lg overflow-hidden ${className} ${styles.borderColor} border-opacity-30 border-[1px]`}
      whileHover={{ scale: hoverScale }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...motionProps}
    >
      <div
        className="absolute inset-0 w-[200px] h-[200px] animate-glow-move offset-path-rect rotate-45"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      <div
        className={`relative z-10 ${styles.foregroundColor} rounded-3xl p-4 border border-opacity-50 ${styles.borderColor} shadow-inner`}
      >
        {children}
      </div>
    </motion.div>
  );
});

export default BentoBox;
