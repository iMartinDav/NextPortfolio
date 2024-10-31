import React, { useEffect, useMemo, useRef } from 'react';

import { cn } from '@/lib/utils';

import Typewriter from 'typewriter-effect';

const ANIMATION_SETTINGS = {
  DELETE_SPEED: 30,
  TYPE_DELAY: 60,
  PAUSE_DURATION: 2500
} as const;

const THEME_GRADIENTS = {
  primary: {
    pokemon: 'bg-gradient-to-r from-purple-700 via-pink-500 to-purple-500',
    bioinformatics:
      'bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500',
    research: 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400',
    dna: 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400',
    protein: 'bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500',
    cell: 'bg-gradient-to-r from-blue-500 via-violet-400 to-purple-500',
    genome: 'bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500',
    biotech: 'bg-gradient-to-r from-emerald-500 via-cyan-400 to-green-500',
    analysis: 'bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500',
    software: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500',
    compbio: 'bg-gradient-to-r from-green-600 via-blue-500 to-purple-500'
  }
} as const;

type GradientKey = keyof typeof THEME_GRADIENTS.primary;

interface TypewriterString {
  text: string;
  gradient: GradientKey;
  emojis: string[];
}

const TypewriterEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sanitizeText = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradient {
        animation: gradientFlow 3s ease infinite;
        background-size: 200% 200%;
      }
      .emoji-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif !important;
        font-size: 1em;
        line-height: 1;
        vertical-align: middle;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-variant-emoji: emoji;
      }
      @supports not (font-variant-emoji: emoji) {
        .emoji-wrapper {
          font-variant: normal;
        }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const typewriterStrings = useMemo<TypewriterString[]>(
    () => [
      {
        text: 'Pokemon Master',
        gradient: 'pokemon',
        emojis: ['🎮', '✨']
      },
      {
        text: 'Software Engineer',
        gradient: 'software',
        emojis: ['👨🏻‍💻', '⌨️', '🚀']
      },
      {
        text: 'Computational Biology',
        gradient: 'compbio',
        emojis: ['🧬', '💻', '🔮']
      },
      {
        text: 'Bioinformatics',
        gradient: 'bioinformatics',
        emojis: ['🧬', '💻', '🔍']
      },
      {
        text: 'Research and Development',
        gradient: 'research',
        emojis: ['🔬', '🧪', '📊']
      },
      {
        text: 'DNA Sequencing',
        gradient: 'dna',
        emojis: ['🧬', '🔄', '🧫']
      },
      {
        text: 'Protein Analysis',
        gradient: 'protein',
        emojis: ['🔬', '🧪', '📈']
      },
      {
        text: 'Cell Biology',
        gradient: 'cell',
        emojis: ['🦠', '🔬', '🧫']
      },
      {
        text: 'Genome Editing',
        gradient: 'genome',
        emojis: ['✂️', '🧬', '🔧']
      },
      {
        text: 'Biotechnology',
        gradient: 'biotech',
        emojis: ['🧪', '⚗️', '🔬']
      },
      {
        text: 'Data Analysis',
        gradient: 'analysis',
        emojis: ['📊', '📈', '💻']
      }
    ],
    []
  );

  const formattedStrings = useMemo(
    () =>
      typewriterStrings.map(({ text, gradient, emojis }) => {
        const sanitizedText = sanitizeText(text);
        const emojiSpans = emojis
          .map(
            (emoji) =>
              `<span class="emoji-wrapper" data-emoji="${emoji}">${emoji}</span>`
          )
          .join('');

        return `<div class="inline-flex items-center gap-2">
        <span class="${THEME_GRADIENTS.primary[gradient]} animate-gradient bg-clip-text text-transparent">
          ${sanitizedText}
        </span>
        <span class="flex gap-1">
          ${emojiSpans}
        </span>
      </div>`;
      }),
    [typewriterStrings]
  );

  const typewriterOptions = useMemo(
    () => ({
      strings: formattedStrings,
      autoStart: true,
      loop: true,
      deleteSpeed: ANIMATION_SETTINGS.DELETE_SPEED,
      delay: ANIMATION_SETTINGS.TYPE_DELAY,
      pauseFor: ANIMATION_SETTINGS.PAUSE_DURATION,
      html: true
    }),
    [formattedStrings]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full text-center',
        'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
        'font-medium leading-relaxed'
      )}>
      <div className='relative z-10'>
        <style>
          {`
            .Typewriter__cursor {
              @apply text-base text-teal-700 dark:text-teal-500;
              -webkit-text-fill-color: currentColor;
            }
            .Typewriter__wrapper {
              @apply min-h-[1.5em] flex items-center justify-center;
            }
            @media (max-width: 767px) {
              .Typewriter__wrapper {
                @apply text-lg font-medium min-h-[2em];
              }
              .Typewriter__cursor {
                @apply hidden;
              }
            }
          `}
        </style>
        <Typewriter options={typewriterOptions} />
      </div>

      <div
        aria-hidden='true'
        className={cn(
          'absolute inset-0 -z-10 opacity-25',
          'pointer-events-none blur-3xl'
        )}
        style={{
          background: `
            radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)
          `
        }}
      />
    </div>
  );
};

export default TypewriterEffect;
