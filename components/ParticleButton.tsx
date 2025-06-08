import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Sparkles } from 'lucide-react';

const PARTICLE_COUNT = 32;

type Particle = {
  type: 'star' | 'glow';
  startX: number;
  startY: number;
  angle: number;
  delay: number;
  scale: number;
  speed: number;
  distance: number;
  rotation: number;
};

const ButtonWithParticles: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [slow, setSlow] = useState(false);
  const [time, setTime] = useState(0);
  const [interactionField, setInteractionField] = useState({ x: 50, y: 50 });

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const distance = 90 + Math.random() * 30;
      return {
        type: Math.random() > 0.5 ? 'star' : 'glow',
        startX: 50 + Math.cos(angle) * distance,
        startY: 50 + Math.sin(angle) * distance,
        angle: angle * (180 / Math.PI),
        delay: Math.random() * 3,
        scale: 0.5 + Math.random() * 1.2,
        speed: 0.5 + Math.random() * 1.5,
        distance: distance,
        rotation: Math.random() * 360
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + (slow ? 0.0005 : 0.003));
    }, 16);
    return () => clearInterval(interval);
  }, [slow]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setInteractionField({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100
      });
    },
    []
  );

  return (
    <div className='flex flex-col items-center space-y-6'>
      <label className='flex items-center space-x-3 text-lg text-white'>
        <input
          type='checkbox'
          checked={slow}
          onChange={(e) => setSlow(e.target.checked)}
          className='h-5 w-5 rounded-lg border-purple-400 bg-purple-100 focus:ring-purple-500'
        />
        <span className='select-none text-sm font-semibold'>
          ✦ Stellar Time Dilation ✦
        </span>
      </label>

      <div className='relative flex items-center justify-center'>
        {/* Layer of Stars (internal) */}
        {particles.map((particle, index) => {
          if (particle.type !== 'star') return null;

          const progress = ((time + particle.delay) * particle.speed) % 1;
          const opacity = Math.sin(progress * Math.PI * 2); // Twinkling of the stars

          const starSize = 8; // Size of the stars
          return (
            <div
              key={`particle-${index}`}
              className='absolute'
              style={{
                left: `${particle.startX}%`,
                top: `${particle.startY}%`,
                opacity,
                width: `${starSize}px`,
                height: `${starSize}px`,
                filter: 'blur(0.5px)',
                zIndex: 10 // Ensure the stars are above the button
              }}>
              ✦
            </div>
          );
        })}

        {/* Button Layer */}
        <button
          className={`relative transform overflow-hidden rounded-full bg-linear-to-r from-indigo-800 via-purple-800 to-blue-800 px-12 py-6 text-lg font-bold text-white shadow-[0_0_50px_rgba(147,51,234,0.6)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(147,51,234,0.8)] active:scale-95`}
          style={{
            perspective: '1500px',
            width: 'fit-content',
            height: 'fit-content',
            zIndex: 20 // Ensure the button is above the stars
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}>
          <div
            className='absolute inset-0 opacity-30'
            style={{
              background: `
                radial-gradient(
                  circle at ${interactionField.x}% ${interactionField.y}%,
                  rgba(167,139,250,0.4),
                  rgba(123,31,162,0.2) 30%,
                  transparent 70%
                )
              `
            }}
          />

          {/* Layer of Spheres (Glow Particles) coming from outside */}
          {particles.map((particle, index) => {
            if (particle.type !== 'glow') return null;

            const progress = ((time + particle.delay) * particle.speed) % 1;
            const movementFactor = Math.sqrt(progress);
            const scale = isHovered ? particle.scale * 0.8 : particle.scale;
            const opacity = Math.min(1, 4 * (1 - movementFactor));

            const currentX =
              particle.startX + (50 - particle.startX) * movementFactor;
            const currentY =
              particle.startY + (50 - particle.startY) * movementFactor;

            return (
              <div
                key={`particle-${index}`}
                className='absolute'
                style={{
                  left: `${currentX}%`,
                  top: `${currentY}%`,
                  zIndex: 30, // Ensure the spheres are above the button
                  transform: `translate(-50%, -50%) scale(${scale})`
                }}>
                <div
                  className='absolute h-3 w-3'
                  style={{
                    opacity,
                    background:
                      'radial-gradient(at 85% 85%, rgba(167,139,250,0.8), rgba(123,31,162,0.6) 75%)',
                    borderRadius: '50%'
                  }}
                />
              </div>
            );
          })}

          {/* Text over the button */}
          <div className='relative z-40 flex items-center justify-center space-x-2'>
            <Sparkles
              className={`h-5 w-5 transition-all duration-1000 ${isHovered ? 'rotate-180 scale-150 text-purple-300' : 'text-blue-200'}`}
            />
            <span className='group relative text-sm'>
              <span
                className={`transition-all duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                Connect
              </span>
              <span
                className={`absolute left-0 top-0 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                ✦ Explore ✦
              </span>
            </span>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes particle-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default ButtonWithParticles;
