'use client';

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
import { useTranslations } from 'next-intl';

type BentoT = ReturnType<typeof useTranslations<'Bento'>>;

const getFeatures = (t: BentoT) => [
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
          className='absolute top-0 right-0 h-full w-full border-none transition-all duration-300 ease-out'>
          <BentoShowcase />
        </div>
      </>
    )
  },
  {
    Icon: '',
    name: t('intro.name'),
    description: t('intro.description'),
    className: 'col-span-3 md:col-span-1',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}`,
    cta: t('intro.cta'),
    background: (
      <div>
        <div className='absolute top-0 right-0 h-3/4 w-full border-none mask-[linear-gradient(to_top,transparent_5%,#000_50%)] transition-all duration-300 ease-out group-hover:scale-105'>
          <BlurIn
            duration={0.5}
            className='h-full'>
            <Image
              className='h-full w-full object-cover object-center'
              src={process.env.AVATAR_URL || '/images/profile-cool.webp'}
              alt={t('avatarAlt')}
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
            className='bg-background absolute top-2 right-2 w-fit max-w-3/4 rounded-lg px-4 py-2 text-xs text-neutral-500 dark:text-neutral-300'>
            <div className='flex items-center gap-2'>
              <div
                className={`h-3 w-3 animate-pulse rounded-full ${
                  process.env.NEXT_PUBLIC_AVAILABLE_FOR_FREELANCE === 'true'
                    ? 'bg-emerald-400'
                    : 'bg-cyan-400'
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
    name: t('arsenal.name'),
    description: t('arsenal.description'),
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/projects`,
    cta: t('arsenal.cta'),
    className: 'col-span-3 md:col-span-1',
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}>
        <Marquee
          className='absolute top-10 h-2/3 w-full mask-[linear-gradient(to_top,transparent_10%,#000_100%)] [--duration:40s]'
          pauseOnHover>
          {defaultDomains.map((f, idx) => (
            <a
              href={`${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/${f.slug}`}
              // biome-ignore lint/suspicious/noArrayIndexKey: using index as key for tags
              key={idx}
              className={cn(
                'relative h-full w-40 cursor-pointer overflow-hidden rounded-xl border p-4 hover:-translate-y-1',
                'border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5',
                'dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15',
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
    name: t('shenanigans.name'),
    description: t('shenanigans.description'),
    href: '/technologies',
    cta: t('shenanigans.cta'),
    className: 'col-span-3 md:col-span-2',
    background: (
      <div className='absolute top-0 right-0 w-[80%] origin-top translate-x-0 mask-[linear-gradient(to_top,transparent_40%,#000_70%)] transition-all duration-300 ease-out group-hover:-translate-y-5 group-hover:scale-105 md:mask-[linear-gradient(to_top,transparent_50%,#000_70%)]'>
        <FadeIn direction='up'>
          <Technologies />
        </FadeIn>
      </div>
    )
  },
  {
    Icon: '',
    name: t('ai.name'),
    description: t('ai.description'),
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/ai`,
    cta: t('ai.cta'),
    className: 'col-span-3 md:col-span-2',
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}>
        <AnimatedBeamMultipleOutputs className='absolute top-4 right-0 h-75 w-150 border-none mask-[linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105 md:mask-[linear-gradient(to_top,transparent_0%,#000_100%)]' />
      </motion.div>
    )
  },
  {
    Icon: '',
    name: t('deployments.name'),
    description: t('deployments.description'),
    className: 'col-span-3 md:col-span-1',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/vercel`,
    cta: t('deployments.cta'),
    background: (
      <div className='absolute top-0 right-0 h-full w-full origin-top rounded-md mask-[linear-gradient(to_top,transparent_25%,#000_70%)] transition-all duration-300 ease-out group-hover:scale-105'>
        <Orbit />
      </div>
    )
  },

  {
    Icon: '',
    name: t('reach.name'),
    description: t('reach.description'),
    className: 'col-span-3 md:col-span-3',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/tags/vercel`,
    cta: t('reach.cta'),
    background: (
      <div className='absolute top-0 right-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-105'>
        <div className="absolute inset-0 w-full h-full mask-[linear-gradient(to_top,transparent_25%,#000_70%)]">
          <GlobeAndStars globeClassName="!max-w-[800px] !w-[150vw] md:!w-[800px] !h-[150vw] md:!h-[800px] !-top-10 md:!-top-40 !-right-20 md:!-right-40 !left-auto !mx-0" />
        </div>
      </div>
    )
  },

  {
    Icon: '',
    name: t('stars.name'),
    description: t('stars.description'),
    className: 'col-span-3 md:col-span-1',
    href: 'https://github.com/iMartinDav/NextPortfolio',
    cta: t('stars.cta'),
    background: (
      <div className='absolute top-0 left-0 h-full w-full origin-top rounded-md mask-[linear-gradient(to_top,transparent_40%,#000_70%)] transition-all duration-300 ease-out group-hover:-translate-y-4 group-hover:scale-105'>
        <div className='flex h-2/3 w-full items-center justify-center text-7xl font-semibold transition-all duration-300 group-hover:-translate-y-2'>
          <a
            href='https://github.com/iMartinDav/NextPortfolio'
            className='flex items-center gap-2 rounded-lg border border-gray-950/10 bg-gray-950/1 p-5 shadow-xl hover:bg-gray-950/5 dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15'>
            <GitHubStars />
            <Image
              src='/images/githubstar.webp'
              alt='GitHub logo'
              className='h-14 w-14 drop-shadow-sm'
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
    name: t('projects.name'),
    description: t('projects.description'),
    className: 'col-span-3 md:col-span-2',
    href: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/projects`,
    cta: t('projects.cta'),
    background: (
      <div className='absolute top-0 left-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[102%]'>
        <div className='absolute h-full w-full mask-[linear-gradient(to_top,transparent_20%,#000_70%)]'>
          <div className='absolute h-full w-full mask-[linear-gradient(to_bottom,transparent_2%,#000_10%)]'>
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
    name: t('visitors.name'),
    description: t('visitors.description'),
    href: 'https://umami.is',
    cta: t('visitors.cta'),
    className: 'col-span-3 md:col-span-2',
    background: (
      <>
        <div className='absolute top-0 left-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[102%]'>
          <div className='absolute h-full w-full mask-[linear-gradient(to_top,transparent_20%,#000_70%)]'>
            <div className='absolute h-full w-full mask-[linear-gradient(to_bottom,transparent_2%,#000_10%)]' />
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
    cta: t('incubating.cta'),
    background: (
      <div className='absolute top-0 left-0 h-full w-full origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[105%]'>
        <div className='absolute h-full w-full mask-[linear-gradient(to_top,transparent_20%,#000_70%)]'>
          <div className='absolute h-full w-full mask-[linear-gradient(to_bottom,transparent_2%,#000_10%)]'>
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
        className='absolute top-0 left-0 h-full w-full origin-top rounded-md mask-[linear-gradient(to_top,transparent_0%,#000_0%)] transition-all duration-300 ease-out'>
        <div className='absolute inset-0 z-50 flex items-center justify-center gap-5 p-5'>
          <div className='flex w-full max-w-sm flex-col gap-2'>
            <div className='flex w-full justify-start text-5xl font-semibold text-neutral-700 md:text-6xl dark:text-neutral-300'>
              <BlurIn
                duration={0.5}
                className='h-full'>
                {t('contact.title')}
              </BlurIn>
            </div>
            <div className='flex w-full justify-center text-neutral-500 dark:text-neutral-400'>
              {t('contact.body')}
            </div>
            <div className='mt-2 text-sm text-neutral-500 dark:text-neutral-400'>
              {t('contact.privacy')}
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
  const t = useTranslations('Bento');
  const features = getFeatures(t);

  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key for features
          key={idx}
          {...feature}
        />
      ))}
    </BentoGrid>
  );
}
