'use client';

import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function Github() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='flex flex-col items-center pb-10'>
      <h1 className='mb-5 text-2xl font-bold text-gray-900 dark:text-gray-100'>
        Days I <span className='text-purple-600'>Code</span>
      </h1>
      <div className='w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800'>
        <div className='flex items-center justify-center min-h-[170px]'>
          {mounted ? (
            <GitHubCalendar
              username='iMartinDav'
              blockSize={15}
              blockMargin={5}
              fontSize={16}
              theme={{
                light: [
                  '#E100FF',
                  '#7F00FF',
                  '#4B0082',
                  '#2A004C',
                  '#1A004A'
                ],
                dark: [
                  '#1A004A',
                  '#2A004C',
                  '#4B0082',
                  '#7F00FF',
                  '#E100FF'
                ]
              }}
            />
          ) : (
            <div className='text-sm text-gray-500 dark:text-gray-400'>Loading GitHub Activity...</div>
          )}
        </div>
      </div>
    </div>
  );
}
