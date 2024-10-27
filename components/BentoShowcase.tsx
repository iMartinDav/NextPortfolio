'use client';

import MeteorShower from '@/components/magicui/meteors';
import WordPullUp from '@/components/magicui/word-pull-up';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/magicui/fade-in';
import { Mail, Github } from 'lucide-react';
import BlurIn from '@/components/magicui/blur-in';

export default function BentoShowcase() {
  return (
    <div className="relative flex h-full w-full mx-auto items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="flex flex-col items-start justify-center h-full overflow-hidden p-6 z-50">
        <WordPullUp words="Code Meets Biotech" />

        <div className="text-xs sm:text-sm md:text-lg text-neutral-500 dark:text-neutral-400 lg:px-1 w-full">
          <BlurIn className="w-3/4 sm:w-2/3">
            Crafting smart, scalable software for science. Less bugs, more
            breakthroughs.
          </BlurIn>

          <FadeIn direction="down" className="my-class">
            <div className="flex items-center gap-2 w-full lg:w-2/3 mt-3 sm:mt-4">
              <a
                href="https://github.com/iMartinDav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 w-full group/Github"
                >
                  <div className="text-xs sm:text-sm">View Code</div>
                  <Github className="h-3 w-3 lg:group-hover/Github:translate-x-1 transition-all duration-300" />
                </Button>
              </a>

              <a
                href="mailto:aldntmi@gmail.com"
                target="_blank"
                className="flex-1"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 w-full group/Mail"
                >
                  <div className="text-xs sm:text-sm">Get in Touch</div>
                  <Mail className="h-3 w-3 lg:group-hover/Mail:translate-x-1 transition-all duration-300" />
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
      <MeteorShower />
    </div>
  );
}
