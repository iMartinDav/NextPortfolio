import React from "react";
import { motion } from "framer-motion";

const BentoBox: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <motion.div
    className={`relative bg-foreground rounded-3xl p-6 shadow-lg overflow-hidden ${className} border-transparent border-opacity-30 border-[1px]`}
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Optional: Add inner glow effect or animated background */}
    <div className="absolute inset-0 w-[200px] h-[200px] animate-glow-move offset-path-rect glow-bg rotate-45"></div>

    <div className="relative z-10 bg-foreground rounded-3xl p-6 border border-opacity-50 border-transparent shadow-inner">
      {children}
    </div>
  </motion.div>
);

export default BentoBox;
