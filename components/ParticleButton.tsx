import React, { useState } from "react";

const ButtonWithParticles = () => {
  const [slow, setSlow] = useState(false);

  const handleSlowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlow(event.target.checked);
  };

  const particles = [
    { x: "53%", y: "15%", d: "4em", t: 0.15, a: -45, f: 0.7 },
    { x: "40%", y: "70%", d: "7.5em", t: 0.08, a: 150, f: 0.8 },
    { x: "90%", y: "65%", d: "7em", t: 0.25, a: 10, f: 0.6 },
    { x: "15%", y: "10%", d: "4em" },
    { x: "10%", y: "25%", d: "5.25em", t: 0.32, f: 0.6 },
    { x: "80%", y: "25%", d: "4.75em", t: 0.4, f: 0.5 },
    { x: "30%", y: "5%", d: "9em", t: 0.5, f: 0.9 },
    { x: "9%", y: "30%", d: "6em", t: 0.6, f: 0.95 },
    { x: "89%", y: "25%", d: "4.5em", t: 0.67, f: 0.55 },
    { x: "40%", y: "10%", d: "5em", t: 0.75, f: 0.85 },
    { x: "45%", y: "65%", d: "4em", t: 0.83, f: 0.5 },
    { x: "70%", y: "80%", d: "6.5em", t: 0.92, f: 0.75 },
  ];

  return (
    <div className="flex flex-col items-center space-y-8">
      <label className="flex items-center space-x-2 text-white text-xl">
        <input
          type="checkbox"
          checked={slow}
          onChange={handleSlowChange}
          className="unique-form-checkbox h-6 w-6 text-purple-600 rounded-md border-purple-400 focus:ring-purple-500"
        />
        <span>slow motion</span>
      </label>
      <button
        className={`
          unique-button relative py-4 px-8 text-2xl font-bold text-white
          rounded-full bg-gradient-to-r from-[#182959] to-[#2b4eb7]
          shadow-[0_0_30px_rgba(99,179,237,0.5)]
          overflow-hidden
        `}
        style={{ "--m": slow ? 5 : 1 } as React.CSSProperties}
      >
        <span className="relative z-10">Get in Touch</span>
        <span className="absolute inset-0 bg-gradient-to-r from-[#3e66a4] to-[#7aa4e3] opacity-50" />
        <span className="absolute inset-0" aria-hidden="true">
          {particles.map((particle, index) => (
            <span
              key={index}
              className="unique-particle absolute w-1 h-1 bg-white rounded-full"
              style={
                {
                  left: particle.x,
                  top: particle.y,
                  "--d": particle.d,
                  "--t": particle.t,
                  "--a": particle.a,
                  "--f": particle.f,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </button>
    </div>
  );
};

export default ButtonWithParticles;
