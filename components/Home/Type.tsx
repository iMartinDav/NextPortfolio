import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

import { cn } from '@/lib/utils';

const THEME_GRADIENTS = {
  primary: {
    pokemon: 'bg-linear-to-r from-teal-400 via-indigo-400 to-purple-400',
    bioinformatics: 'bg-linear-to-r from-emerald-400 via-teal-400 to-purple-500',
    research: 'bg-linear-to-r from-violet-400 via-purple-400 to-emerald-400',
    dna: 'bg-linear-to-r from-teal-500 via-emerald-400 to-indigo-400',
    protein: 'bg-linear-to-r from-purple-400 via-violet-400 to-teal-400',
    cell: 'bg-linear-to-r from-indigo-400 via-purple-400 to-emerald-400',
    genome: 'bg-linear-to-r from-violet-500 via-fuchsia-400 to-purple-400',
    biotech: 'bg-linear-to-r from-emerald-500 via-teal-400 to-purple-400',
    analysis: 'bg-linear-to-r from-indigo-400 via-violet-400 to-teal-400',
    software: 'bg-linear-to-r from-teal-400 via-emerald-400 to-indigo-400',
    compbio: 'bg-linear-to-r from-purple-500 via-violet-400 to-emerald-400'
  }
} as const;

type GradientKey = keyof typeof THEME_GRADIENTS.primary;

interface TypewriterString {
  text: string;
  gradient: GradientKey;
  emojis: string[];
}

const typewriterStrings: TypewriterString[] = [
  { text: 'Pokemon Master', gradient: 'pokemon', emojis: ['🎮', '✨'] },
  { text: 'Software Engineer', gradient: 'software', emojis: ['👨🏻‍💻', '⌨️', '🚀'] },
  { text: 'Computational Biology', gradient: 'compbio', emojis: ['🧬', '💻', '🔮'] },
  { text: 'Bioinformatics', gradient: 'bioinformatics', emojis: ['🧬', '💻', '🔍'] },
  { text: 'Research and Development', gradient: 'research', emojis: ['🔬', '🧪', '📊'] },
  { text: 'DNA Sequencing', gradient: 'dna', emojis: ['🧬', '🔄', '🧫'] },
  { text: 'Protein Analysis', gradient: 'protein', emojis: ['🔬', '🧪', '📈'] },
  { text: 'Cell Biology', gradient: 'cell', emojis: ['🦠', '🔬', '🧫'] },
  { text: 'Genome Editing', gradient: 'genome', emojis: ['✂️', '🧬', '🔧'] },
  { text: 'Biotechnology', gradient: 'biotech', emojis: ['🧪', '⚗️', '🔬'] },
  { text: 'Data Analysis', gradient: 'analysis', emojis: ['📊', '📈', '💻'] }
];

const TypewriterEffect: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [frame, setFrame] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '100px' });

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const fps = 30;
    const interval = 1000 / fps;
    let lastTime = 0;

    const loop = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - lastTime;
      
      if (elapsed > interval) {
        setFrame(prev => prev + 1);
        lastTime = timestamp - (elapsed % interval);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView]);

  const item = typewriterStrings[currentIdx];
  const fullTokens = useMemo(() => [...item.text.split(''), ...item.emojis], [item]);
  
  const charFrames = 2;
  const pauseFrames = 45;
  const deleteCharFrames = 1;
  const pauseAfterFrames = 15;

  const typeDuration = fullTokens.length * charFrames;
  const holdStart = typeDuration;
  const holdEnd = holdStart + pauseFrames;
  const deleteDuration = fullTokens.length * deleteCharFrames;
  const totalDuration = holdEnd + deleteDuration + pauseAfterFrames;

  useEffect(() => {
    if (frame >= totalDuration) {
      setFrame(0);
      setCurrentIdx((prev) => (prev + 1) % typewriterStrings.length);
    }
  }, [frame, totalDuration]);

  let displayChars = 0;

  if (frame < holdStart) {
    displayChars = Math.floor(frame / charFrames);
  } else if (frame < holdEnd) {
    displayChars = fullTokens.length;
  } else if (frame < holdEnd + deleteDuration) {
    const deletePhaseFrame = frame - holdEnd;
    displayChars = fullTokens.length - Math.floor(deletePhaseFrame / deleteCharFrames);
  } else {
    displayChars = 0;
  }

  const typedTokens = fullTokens.slice(0, displayChars);
  const isEmoji = (token: string) => item.emojis.includes(token);
  
  const textPart = typedTokens.filter(t => !isEmoji(t)).join('');
  const emojiPart = typedTokens.filter(t => isEmoji(t));

  return (
    <div className={cn(
        'relative w-full text-center',
        'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
        'leading-relaxed font-medium'
      )}
    >
      <div className='relative z-10 w-full flex flex-wrap items-center justify-center md:justify-start min-h-[1.5em] md:min-h-[2em]'>
        <div className='inline-flex items-center gap-2 max-w-full overflow-hidden'>
          <span className={cn(THEME_GRADIENTS.primary[item.gradient], 'animate-gradient bg-clip-text text-transparent break-words whitespace-pre-wrap')}>
            {textPart === '' ? '\u00A0' : textPart}
          </span>
          {emojiPart.length > 0 && (
            <span className='flex gap-1 items-center shrink-0'>
              {emojiPart.map((e, i) => (
                <span 
                  key={i} 
                  className='emoji-wrapper text-[1em] leading-none' 
                  style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
                >
                  {e}
                </span>
              ))}
            </span>
          )}
          <span 
            className='inline-block w-[3px] h-[1.2em] bg-teal-500 dark:bg-teal-400 ml-1 rounded-sm align-middle shrink-0' 
            style={{ opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0 }} 
          />
        </div>
      </div>

      <div
        aria-hidden='true'
        className={cn(
          'absolute inset-0 -z-10 opacity-40',
          'pointer-events-none blur-3xl'
        )}
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(45, 212, 191, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)
          `,
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default TypewriterEffect;
