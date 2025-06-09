// components/About/About.tsx
import Image from 'next/image';

import Particle from '../Particle';
import Aboutcard from './AboutCard';
import Github from './Github';
import Techstack from './Techstack';
import Toolstack from './Toolstack';

const AboutContent: React.FC = () => {
  return (
    <div className='bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText py-10 transition-colors duration-300 relative'>
      <Particle className='absolute inset-0 -z-10' />
      <div className='container mx-auto px-4 relative z-10'>
        <div className='flex flex-col items-center md:flex-row md:space-x-8'>
          <div className='w-full px-4 py-8 md:w-7/12'>
            <h1 className='mt-16 mb-6 text-center text-3xl leading-tight font-bold md:mt-0 md:text-left md:text-4xl'>
              Know Who <span className='text-purple-600'>I&apos;M</span>
            </h1>
            <Aboutcard />
          </div>
          <div className='flex w-full justify-center px-4 py-8 md:w-5/12 md:justify-start'>
            <Image
              src='/about.png'
              alt='home pic'
              width={600}
              height={600}
              className='h-auto max-w-full rounded-lg shadow-lg'
            />
          </div>
        </div>
        <h1 className='my-8 text-center text-2xl font-bold md:text-3xl'>
          Professional <span className='text-purple-600'>Skillset</span>
        </h1>
        <Techstack />
        <h1 className='my-8 text-center text-2xl font-bold md:text-3xl'>
          <span className='text-purple-600'>Tools</span> I use
        </h1>
        <Toolstack />
      </div>

      <Github />
    </div>
  );
};

export default AboutContent;
