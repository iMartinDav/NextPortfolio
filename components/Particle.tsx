'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import {
  type Container,
  type ISourceOptions,
  MoveDirection
} from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from 'next-themes';

interface ParticleProps {
  className?: string;
  density?: number;
  particleCount?: number;
  speed?: number;
  parallaxForce?: number;
  lightModeColor?: string;
  darkModeColor?: string;
}

const DEFAULT_COLORS = {
  light: '#33c7b2',
  dark: '#ffffff'
};

const DEFAULT_CONFIG = {
  density: 1400,
  particleCount: 120,
  speed: 0.1,
  parallaxForce: 60
};

const ParticleBackground: React.FC<ParticleProps> = ({
  className = 'absolute inset-0',
  density = DEFAULT_CONFIG.density,
  particleCount = DEFAULT_CONFIG.particleCount,
  speed = DEFAULT_CONFIG.speed,
  parallaxForce = DEFAULT_CONFIG.parallaxForce,
  lightModeColor = DEFAULT_COLORS.light,
  darkModeColor = DEFAULT_COLORS.dark
}) => {
  const [init, setInit] = useState(false);
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    const initEngine = async () => {
      try {
        await initParticlesEngine(loadSlim);
        setInit(true);
      } catch (error) {
        console.error('Failed to initialize particles engine:', error);
      }
    };

    initEngine();
  }, []);

  // Using useEffect for resize handler instead of particlesLoaded
  useEffect(() => {
    const updateParticleCount = (container: Container) => {
      const width = window.innerWidth;
      let adjustedCount = particleCount;

      if (width < 768) {
        adjustedCount = Math.floor(particleCount * 0.5);
      } else if (width < 1024) {
        adjustedCount = Math.floor(particleCount * 0.75);
      }

      container.options.particles.number.value = adjustedCount;
      container.refresh();
    };

    const resizeHandler = () => {
      const container = (window as any).particlesContainer;
      if (container) {
        updateParticleCount(container);
      }
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [particleCount]);

  // Fixed return type to match IParticlesProps
  const handleParticlesLoaded = useCallback(
    async (container?: Container): Promise<void> => {
      if (!container) return;
      (window as any).particlesContainer = container;

      // Initial particle count update
      const width = window.innerWidth;
      let adjustedCount = particleCount;

      if (width < 768) {
        adjustedCount = Math.floor(particleCount * 0.5);
      } else if (width < 1024) {
        adjustedCount = Math.floor(particleCount * 0.75);
      }

      container.options.particles.number.value = adjustedCount;
      container.refresh();
    },
    [particleCount]
  );

  const particleOptions: ISourceOptions = useMemo(
    () => ({
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            area: density
          }
        },
        color: {
          value: isDark ? darkModeColor : lightModeColor
        },
        size: {
          value: { min: 1, max: 3.5 },
          random: { enable: true, minimumValue: 1 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.5,
            sync: false
          }
        },
        opacity: {
          value: { min: 0.5, max: 1 },
          random: true,
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.5,
            sync: false
          }
        },
        shape: {
          type: 'circle'
        },
        move: {
          enable: true,
          direction: MoveDirection.none,
          speed: speed,
          random: true,
          straight: false,
          outModes: {
            default: 'out'
          },
          parallax: {
            enable: true,
            smooth: 10,
            force: parallaxForce
          }
        },
        glow: {
          enable: true,
          color: isDark ? darkModeColor : lightModeColor,
          opacity: 0.7
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 0.9
          }
        }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: {
            enable: true,
            mode: 'repulse'
          },
          onClick: {
            enable: true,
            mode: 'repulse'
          },
          resize: {
            enable: true,
            delay: 0.5
          }
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.4
          }
        }
      },
      detectRetina: true,
      fpsLimit: 60,
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: Math.floor(particleCount * 0.5)
              },
              move: {
                speed: speed * 0.8
              }
            }
          }
        },
        {
          maxWidth: 1024,
          options: {
            particles: {
              number: {
                value: Math.floor(particleCount * 0.75)
              }
            }
          }
        }
      ]
    }),
    [
      isDark,
      darkModeColor,
      lightModeColor,
      density,
      particleCount,
      speed,
      parallaxForce
    ]
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={handleParticlesLoaded}
      options={particleOptions}
      className={className}
    />
  );
};

export default ParticleBackground;
