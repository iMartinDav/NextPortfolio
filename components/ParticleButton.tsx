import React, { useState } from "react";

const ParticleButton: React.FC = () => {
  const [slowMotion, setSlowMotion] = useState(false);

  const particles = [
    { a: "-45deg", x: "53%", y: "15%", d: "4em", f: "0.7", t: "0.15" },
    { a: "150deg", x: "40%", y: "70%", d: "7.5em", f: "0.8", t: "0.08" },
    { a: "10deg", x: "90%", y: "65%", d: "7em", f: "0.6", t: "0.25" },
    { a: "-120deg", x: "15%", y: "10%", d: "4em", f: "1", t: "0" },
    { a: "-175deg", x: "10%", y: "25%", d: "5.25em", f: "0.6", t: "0.32" },
    { a: "-18deg", x: "80%", y: "25%", d: "4.75em", f: "0.5", t: "0.4" },
    { a: "-160deg", x: "30%", y: "5%", d: "9em", f: "0.9", t: "0.5" },
    { a: "175deg", x: "9%", y: "30%", d: "6em", f: "0.95", t: "0.6" },
    { a: "-10deg", x: "89%", y: "25%", d: "4.5em", f: "0.55", t: "0.67" },
    { a: "-140deg", x: "40%", y: "10%", d: "5em", f: "0.85", t: "0.75" },
    { a: "90deg", x: "45%", y: "65%", d: "4em", f: "0.5", t: "0.83" },
    { a: "30deg", x: "70%", y: "80%", d: "6.5em", f: "0.75", t: "0.92" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="slow"
          checked={slowMotion}
          onChange={() => setSlowMotion(!slowMotion)}
          className="w-5 h-5 mr-2 cursor-pointer"
        />
        <label
          htmlFor="slow"
          className="text-lg font-mono text-white cursor-pointer"
        >
          Slow Motion
        </label>
      </div>

      <button
        className={`
          relative px-8 py-6 text-xl font-bold text-white rounded-full
          bg-gradient-to-r from-blue-900 to-blue-500
          shadow-lg hover:shadow-xl transition-all duration-300
          ${slowMotion ? "animate-slow-motion" : "animate-normal-motion"}
        `}
      >
        Chocolate Coated Gingerbread
        <span className="absolute inset-0" aria-hidden="true">
          {particles.map((particle, index) => (
            <span
              key={index}
              className="absolute w-3 h-3 particle"
              style={
                {
                  "--a": particle.a,
                  "--x": particle.x,
                  "--y": particle.y,
                  "--d": particle.d,
                  "--f": particle.f,
                  "--t": particle.t,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </button>

      <style jsx>{`
        @keyframes normal-motion {
          0%,
          33.3% {
            --k: 1;
          }
        }
        @keyframes slow-motion {
          0%,
          33.3% {
            --k: 1;
          }
        }
        .particle {
          --f: 1;
          --pos-k: max(0, var(--k));
          --neg-k: max(0, -1 * var(--k));
          --low-c: min(1, 4 * (1 - var(--pos-k)));
          --abs-d: max(var(--neg-k) - 0.5, 0.5 - var(--neg-k));
          --mov-f: var(--pos-k);
          display: grid;
          position: absolute;
          left: var(--x);
          top: var(--y);
          rotate: var(--a);
          animation: normal-motion 1s linear calc(var(--t, 0) * 1s) infinite;
        }
        .particle::before,
        .particle::after {
          content: "";
          grid-area: 1 / 1;
          width: 0.75em;
          aspect-ratio: 1;
        }
        .particle::before {
          --sa: calc(min(1, 1 - 2 * min(0.5, var(--mov-f))) * 45deg);
          border-radius: calc(1.25 * min(0.8, var(--mov-f)) * 50%) 50% 50%;
          transform-origin: 0 0;
          translate: calc(var(--mov-f) * var(--d));
          rotate: -45deg;
          scale: var(--f);
          transform: skew(var(--sa), var(--sa));
          opacity: var(--low-c);
          filter: saturate(var(--low-c));
          background: radial-gradient(at 85% 85%, #bad9fa, #3e66a4 75%);
        }
        .particle::after {
          translate: -50% -50%;
          scale: calc(var(--f) * (1 - 2 * var(--abs-d)));
          text-align: center;
          filter: blur(0.5px);
          content: "✦";
        }
      `}</style>
    </div>
  );
};

export default ParticleButton;
