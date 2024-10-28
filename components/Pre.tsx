// components/Pre.tsx
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const PreLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start with 30% progress instantly for perceived speed
    setProgress(30);

    // Faster progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerated progress
        const remaining = 100 - prev;
        return prev + remaining * 0.2; // Increased speed
      });
    }, 30); // Reduced interval

    // Shorter loading time (800ms instead of 2000ms)
    const timer = setTimeout(() => {
      setProgress(100);
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Faster exit animation
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isLoading) return null;

  const text = 'iMartinDav';

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-all duration-300 ${
        isExiting ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
      }`}
      style={{
        position: 'fixed',
        isolation: 'isolate',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="fixed inset-0 bg-black/80" />
      <div className="relative flex flex-col items-center gap-6 z-10">
        <div className="relative">
          <div className="flex space-x-1">
            {text.split('').map((char, index) => (
              <div
                key={index}
                className="animate-float"
                style={{
                  animationDelay: `${index * 0.05}s`, // Faster letter animations
                  animationDuration: '2s' // Shorter animation duration
                }}
              >
                <span
                  className="text-6xl md:text-8xl font-light tracking-wider text-transparent relative"
                  style={{
                    WebkitTextStroke: '1px rgb(79, 209, 197)',
                    filter: 'drop-shadow(0 0 12px rgba(79, 209, 197, 0.7))'
                  }}
                >
                  {char}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 -z-10">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent blur-2xl animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <Loader2 className="h-5 w-5 animate-spin text-teal-400" />
          <div className="w-48 h-1 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 animate-gradient-move transition-all duration-150 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
          <span className="text-teal-400 text-sm font-medium">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <style
        jsx
        global
      >{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
            filter: brightness(1);
          }
          50% {
            transform: translateY(-8px); // Reduced movement
            filter: brightness(1.2);
          }
        }
        .animate-float {
          animation: float 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-move {
          background-size: 200% 100%;
          animation: gradient-move 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PreLoader;
