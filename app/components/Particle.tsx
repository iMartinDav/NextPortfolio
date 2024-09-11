"use client";

import React, { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const Particle: React.FC = () => {
  useEffect(() => {
    const initializeParticles = async () => {
      try {
        await initParticlesEngine(loadSlim);
      } catch (error) {
        console.error("Error initializing particles engine:", error);
      }
    };

    initializeParticles();
  }, []);

  const handleParticlesLoaded = async (
    container?: Container
  ): Promise<void> => {
    console.log(container);
  };

  const particleOptions: ISourceOptions = useMemo(
    () => ({
      particles: {
        number: {
          value: 160,
          density: {
            enable: true,
            area: 1800,
          },
        },
        links: {
          enable: false,
          opacity: 0.04,
        },
        move: {
          direction: MoveDirection.right,
          speed: 0.02,
        },
        size: {
          value: 1,
        },
        opacity: {
          value: 1,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.05,
          },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 1,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={handleParticlesLoaded}
      options={particleOptions}
      className="absolute inset-0"
    />
  );
};

export default Particle;
