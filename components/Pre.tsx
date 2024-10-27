import React, { useEffect, useRef, useState } from 'react';
import 'src/style.css';

interface PreProps {
  load: boolean;
}

const Pre: React.FC<PreProps> = ({ load }) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startAnimations = () => {
      if (preloaderRef.current && !animationStarted) {
        const preloaderPaths =
          preloaderRef.current.querySelectorAll('#preloader path');

        preloaderPaths.forEach((path, index) => {
          animatePath(path as SVGPathElement, index);
        });

        startFillAnimation();
        setAnimationStarted(true);
      }
    };

    const animatePath = (svgPath: SVGPathElement, index: number) => {
      const delay = index * 0.3; // Adjust the delay based on your requirements

      // Set initial values for line-anim
      svgPath.style.strokeDasharray = `${svgPath.getTotalLength()}px`;
      svgPath.style.strokeDashoffset = `${svgPath.getTotalLength()}px`;

      // Apply line-anim with delay
      svgPath.style.animation = `line-anim 2s ease forwards ${delay}s`;
    };

    const startFillAnimation = () => {
      if (preloaderRef.current) {
        // Set initial values for fill animation
        preloaderRef.current.style.fill = 'transparent';

        // Start fill animation after the line animations
        preloaderRef.current.style.animation = 'fill 0.5s ease forwards 4s';
      }
    };

    if (load) {
      startAnimations();
    }
  }, [load, animationStarted]);

  return (
    <div
      ref={preloaderRef}
      id={load ? 'preloader' : 'preloader-none'}
      className={animationStarted ? 'animate' : ''}
    />
  );
};

export default Pre;
