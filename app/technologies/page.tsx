'use client';

import { motion } from 'framer-motion';
import Technologies from '@/components/technologies';

export default function Tech() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content should take full width, centered */}
      <div className="flex-grow flex flex-col justify-center items-center w-full max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-2">Technologies</h1>
          <p className="font-thin">
            Click on an icon to see projects using that technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full"
        >
          <Technologies liveLinks={true} />
        </motion.div>
      </div>

      {/* Footer will automatically be placed at the bottom */}
    </div>
  );
}
