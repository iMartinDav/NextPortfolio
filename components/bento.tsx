'use client';

import React from 'react';

import Image from 'next/image';

import BentoShowcase from '@/components/BentoShowcase';
import { AnimatedBeamMultipleOutputs } from '@/components/animated-beam-multiple-outputs';
import { EmailForm } from '@/components/email-form';
import GitHubStars from '@/components/github-stars';
import GlobeAndStars from '@/components/globe-and-stars';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import BlurIn from '@/components/magicui/blur-in';
import { FadeIn } from '@/components/magicui/fade-in';
import Marquee from '@/components/magicui/marquee';
import RetroGrid from '@/components/magicui/retro-grid';
import Orbit from '@/components/orbit';
import ProjectPosts from '@/components/project-posts';
import StatsChart from '@/components/stats-chart';
import Technologies from '@/components/technologies';
import { defaultDomains } from '@/lib/data';
import { cn } from '@/lib/utils';

import { RippleCard } from './ui/ripper-card';
import { motion } from 'framer-motion';

const features = [
  {
    Icon: '',
    name: '',
    description: '',
    href: '',
    cta: '',
    className: 'col-span-3 md:col-span-2',
    background: (
      <>
        <div
          id='BentoShowcase'
          className='absolute right-0 top-0 h-full w-full border-none transition-all duration-300 ease-out'>
          <BentoShowcase />
        </div>
      </>
    )
  },
  {
    Icon: '',
    name: "I'm Martin DAVILA",
    description:
      'Software Sorcerer & Bioinformatics Wizard Specialist Full-stack dev with a genomic twist. Cloud architect who speaks DNA.',
    className: 'col-span-3 md:col-span-1',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}`,
    cta: 'Explore my digital lab',
    background: (
      <div>
        <div className='absolute right-0 top-0 h-3/4 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_50%)] group-hover:scale-105'>
          <BlurIn
            duration={0.5}
            className='h-full'>
            <Image
              className='h-full w-full object-cover object-center'
              src={process.env.AVATAR_URL || '/images/profile-cool.webp'}
              alt='avatar image'
              width={400}
              height={400}
              quality={90}
              placeholder='blur'
              blurDataURL='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2QzZDNkMyIvPjwvc3ZnPg=='
            />
          </BlurIn>
        </div>

        <FadeIn
          direction='right'
          framerProps={{
            show: { transition: { delay: 1.5 } }
          }}>
          <a
            href={
              process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE === 'true'
                ? `${process.env.NEXT_PUBLIC_DISCORD}`
                : '#contact-form'
            }
            className='max-w-3/4 absolute right-2 top-2 w-fit rounded-lg bg-background px-4 py-2 text-xs text-neutral-500 dark:text-neutral-300'>
            <div className='flex items-center gap-2'>
              <div
                className={`h-3 w-3 animate-pulse rounded-full ${
                  process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE === 'true'
                    ? 'bg-emerald-400'
                    : 'bg-yellow-400'
                }`}
              />
              <div className=''>
                {process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE === 'true'
                  ? 'Available'
                  : 'On Engagement'}
              </div>
            </div>
          </a>
        </FadeIn>
      </div>
    )
  },

  {
    Icon: '',
    name: 'Tech Arsenal',
    description:
      "From web apps to gene sequencing. Docker to PCR. I've got the tools.",
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/projects`,
    cta: 'View my experiments',
    className: 'col-span-3 md:col-span-1',
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}>
        <Marquee
          className='absolute top-10 h-2/3 w-full [--duration:40s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]'
          pauseOnHover>
          {defaultDomains.map((f, idx) => (
            <a
              href={`${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/${f.slug}`}
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              className={cn(
                'relative h-full w-40 cursor-pointer overflow-hidden rounded-xl border p-4 hover:-translate-y-1',
                'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
                'transform-gpu transition-all duration-300 ease-out hover:blur-none'
              )}>
              <div className='flex flex-row items-center gap-2'>
                <div className='flex flex-col'>
                  <figcaption className='text-lg font-bold dark:text-white'>
                    {f.name}
                  </figcaption>
                </div>
              </div>
              <blockquote className='mt-2 text-xs'>{f.body}</blockquote>
            </a>
          ))}
        </Marquee>
      </motion.div>
    )
  },
  {
    Icon: '',
    name: 'Tech Shenanigans',
    description:
      'I tinker with biotech and code until, somehow, magic happens.',
    href: '/technologies',
    cta: 'View all technologies',
    className: 'col-span-3 md:col-span-2',
    background: (
      <div className='absolute right-0 top-0 w-[80%] origin-top translate-x-0 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_70%)] group-hover:-translate-y-5 group-hover:scale-105 md:[mask-image:linear-gradient(to_top,transparent_50%,#000_70%)]'>
        <FadeIn direction='up'>
          <Technologies />
        </FadeIn>
      </div>
    )
  },
  {
    Icon: '',
    name: 'AI Integrations',
    description:
      'From predicting protein structures to optimizing pipelines, I&apos;ve got AI that would make Watson jealous.',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/ai`,
    cta: 'Visit AI projects',
    className: 'col-span-3 md:col-span-2',
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}>
        <AnimatedBeamMultipleOutputs className='absolute right-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 md:[mask-image:linear-gradient(to_top,transparent_0%,#000_100%)]' />
      </motion.div>
    )
  },
  {
    Icon: '',
    name: 'Seamless Deployments',
    description: 'Push, Build, Deploy, Mutate.',
    className: 'col-span-3 md:col-span-1',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/vercel`,
    cta: 'Learn more',
    background: (
      <div className='absolute right-0 top-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_25%,#000_70%)] group-hover:scale-105'>
        <Orbit />
      </div>
    )
  },

  {
    Icon: '',
    name: 'Worldwide Reach',
    description:
      'Cloud or lab, my code spans continents. No genome left behind.',
    className: 'col-span-3 md:col-span-3',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/vercel`,
    cta: 'Learn more',
    background: (
      <div className='absolute right-0 top-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:-translate-y-4 group-hover:scale-105 md:[mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]'>
        <GlobeAndStars />
      </div>
    )
  },

  {
    Icon: '',
    name: 'GitHub Stars',
    description: 'Star my digital organisms. Help my code evolve.',
    className: 'col-span-3 md:col-span-1',
    href: 'https://github.com/iMartinDav/NextPortfolio',
    cta: 'Star repository',
    background: (
      <div className='absolute left-0 top-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_70%)] group-hover:-translate-y-4 group-hover:scale-105'>
        <div className='flex h-2/3 w-full items-center justify-center text-7xl font-semibold transition-all duration-300 group-hover:-translate-y-2'>
          <a
            href='https://github.com/iMartinDav/NextPortfolio'
            className='flex items-center gap-2 rounded-lg border border-gray-950/[.1] bg-gray-950/[.01] p-5 shadow-xl hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'>
            <GitHubStars />
            <Image
              src='/images/githubstar.webp'
              alt='GitHub logo'
              className='h-14 w-14 drop-shadow'
              width={56}
              height={56}
              priority
            />
          </a>
        </div>
      </div>
    )
  },

  {
    Icon: '',
    name: 'Project Showcase',
    description:
      'Explore my latest creations, from optimized CI/CD pipelines to DNA sequence analysis tools. Where silicon meets cells. Peek into my tech-bio brainstorms.',
    className: 'col-span-3 md:col-span-2',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/projects`,
    cta: 'All projects',
    background: (
      <div className='absolute left-0 top-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[102%]'>
        <div className='absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]'>
          <div className='absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]'>
            <div className='flex h-2/3 w-full items-center justify-center text-7xl font-semibold transition-all duration-300'>
              <div className='flex items-center gap-2'>
                <ProjectPosts />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  {
    Icon: '',
    name: 'Daily Visitors',
    description:
      'Watch my digital petri dish grow. Watch in real-time as curious minds explore my digital petri dish. Powered by analytics, not ATP. powered by Umami Analytics.',
    href: 'https://umami.is',
    cta: 'Umami',
    className: 'col-span-3 md:col-span-2',
    background: (
      <>
        <div className='absolute left-0 top-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[102%]'>
          <div className='absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]'>
            <div className='absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]' />
            <div className='sm:-translate-y-5'>
              <StatsChart />
            </div>
          </div>
        </div>
      </>
    )
  },

  {
    Icon: '',
    name: '',
    description: '',
    className: 'col-span-3 md:col-span-1',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/biocode`,
    cta: 'Incubating Innovations',
    background: (
      <div className='absolute left-0 top-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[105%]'>
        <div className='absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]'>
          <div className='absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]'>
            <RippleCard />
          </div>
        </div>
      </div>
    )
  },

  {
    Icon: '',
    name: '',
    description: '',
    className: 'col-span-3 md:col-span-3',
    href: '',
    cta: '',
    background: (
      <div
        id='contact-form'
        className='absolute left-0 top-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_0%)]'>
        <div className='absolute inset-0 z-50 flex items-center justify-center gap-5 p-5'>
          <div className='flex w-full max-w-sm flex-col gap-2'>
            <div className='flex w-full justify-start text-5xl font-semibold text-neutral-700 dark:text-neutral-300 md:text-6xl'>
              <BlurIn
                duration={0.5}
                className='h-full'>
                Connect.
              </BlurIn>
            </div>
            <div className='flex w-full justify-center text-neutral-500 dark:text-neutral-400'>
              Ready to collaborate? Whether you're into bits or base pairs, I'm
              all ears. Your message will be treated with the same care as a
              rare enzyme.
            </div>
            <div className='mt-2 text-sm text-neutral-500 dark:text-neutral-400'>
              *Your email is as protected as a patented.
            </div>
            <div className=''>
              <EmailForm />
            </div>
          </div>
        </div>

        <RetroGrid />
      </div>
    )
  }
];

export function Bento() {
  return (
    <>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={idx}
            {...feature}
          />
        ))}
      </BentoGrid>
    </>
  );
}
