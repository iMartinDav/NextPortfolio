'use client';

import Technologies from '@/components/technologies';

import { motion } from 'framer-motion';

export default function Tech() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Main content should take full width, centered */}
      <div className='mx-auto flex w-full max-w-2xl flex-grow flex-col items-center justify-center p-6'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='text-center'>
          <h1 className='mb-2 text-4xl font-bold'>Technologies</h1>
          <p className='font-thin'>
            Click on an icon to see projects using that technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className='w-full'>
          <Technologies liveLinks={true} />
        </motion.div>
      </div>

      {/* Footer will automatically be placed at the bottom */}
    </div>
  );
}
