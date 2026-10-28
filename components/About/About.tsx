'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import Particle from '../Particle';
import Aboutcard from './AboutCard';
import Github from './Github';
import Techstack from './Techstack';
import Toolstack from './Toolstack';

// Dynamically import the heavy 3D canvas so it doesn't block initial page load
const BioinformaticsCore = dynamic(() => import('./BioinformaticsCore'), { 
  ssr: false, 
  loading: () => <div className="min-h-[400px] w-full" /> 
});

const accent = (chunks: React.ReactNode) => (
  <span className='text-purple-600'>{chunks}</span>
);

const AboutContent: React.FC = () => {
  const t = useTranslations('About');
  return (
    <div className='bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText relative py-10 transition-colors duration-300'>
      <Particle className='absolute inset-0 -z-10' />
      <div className='relative z-10 container mx-auto px-4'>
        <div className='flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center lg:flex-row lg:gap-8'>
          <div className='w-full px-4 py-8 lg:w-1/2'>
            <h1 className='mb-6 text-center text-3xl leading-tight font-bold md:text-left md:text-4xl'>
              {t.rich('heading', { accent })}
            </h1>
            <Aboutcard />
          </div>
          <div className='w-full lg:w-1/2 overflow-visible'>
            <BioinformaticsCore />
          </div>
        </div>
        <h1 className='my-8 text-center text-2xl font-bold md:text-3xl'>
          {t.rich('skillset', { accent })}
        </h1>
        <Techstack />
        <h1 className='my-8 text-center text-2xl font-bold md:text-3xl'>
          {t.rich('tools', { accent })}
        </h1>
        <Toolstack />
      </div>

      <Github />
    </div>
  );
};

export default AboutContent;
