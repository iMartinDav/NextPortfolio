import Particle from '../Particle';
import Aboutcard from './AboutCard';
import BioinformaticsCore from './BioinformaticsCore';
import Github from './Github';
import Techstack from './Techstack';
import Toolstack from './Toolstack';

const AboutContent: React.FC = () => {
  return (
    <div className='bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText relative py-10 transition-colors duration-300'>
      <Particle className='absolute inset-0 -z-10' />
      <div className='relative z-10 container mx-auto px-4'>
        <div className='flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center lg:flex-row lg:gap-8'>
          <div className='w-full px-4 py-8 lg:w-1/2'>
            <h1 className='mb-6 text-center text-3xl leading-tight font-bold md:text-left md:text-4xl'>
              Know Who <span className='text-purple-600'>I&apos;M</span>
            </h1>
            <Aboutcard />
          </div>
          <div className='w-full lg:w-1/2 overflow-visible'>
            <BioinformaticsCore />
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
