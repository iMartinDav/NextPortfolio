'use client';

import Typewriter from 'typewriter-effect';

export const Type: React.FC = () => {
  return (
    <div className="absolute typewriter-container text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      <Typewriter
        options={{
          strings: [
            '<span class="gradient-text">Pokemon Master</span> <span class="emoji" aria-label="stars">✨🎮</span>',
            '<span class="gradient-text">Bioinformatics</span> <span class="emoji" aria-label="dna">🧬</span>',
            '<span class="gradient-text">Computational Biology</span> <span class="emoji" aria-label="dna">🧬</span>',
            '<span class="gradient-text">Software Engineer</span> <span class="emoji" aria-label="developer">👨🏻‍💻</span>',
            '<span class="gradient-text">Open Source Advocate</span>',
            '<span class="gradient-text">Web3 Enthusiast</span>',
            '<span class="gradient-text">AI and Automation Enthusiast</span> <span class="emoji" aria-label="green heart">💚</span>'
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50
        }}
      />
    </div>
  );
};
