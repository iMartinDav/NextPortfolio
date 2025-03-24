import type React from 'react';

import { BiLogoFlutter } from 'react-icons/bi';
import { CgCPlusPlus } from 'react-icons/cg';
import { DiGit, DiMongodb, DiNodejs, DiPython, DiReact } from 'react-icons/di';
import {
  SiAngular,
  SiAstro,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiLibreofficemath,
  SiNextdotjs,
  SiPostgresql,
  SiPytorch,
  SiRedis,
  SiRuby,
  SiSwift
} from 'react-icons/si';

interface TechItemProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function Techstack() {
  return (
    <div className='rounded-lg bg-white p-6 shadow-lg transition duration-300 dark:bg-gray-800'>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
        <TechItem
          icon={<SiPytorch className='text-red-600' />}
          label='PyTorch'
        />
        <TechItem
          icon={<DiPython className='text-blue-500' />}
          label='Python'
        />
        <TechItem
          icon={<SiFlask className='text-green-600' />}
          label='Flask'
        />
        <TechItem
          icon={<SiFastapi className='text-teal-500' />}
          label='FastAPI'
        />
        <TechItem
          icon={<SiPostgresql className='text-blue-700' />}
          label='PostgreSQL'
        />
        <TechItem
          icon={<DiMongodb className='text-green-800' />}
          label='MongoDB'
        />
        <TechItem
          icon={<SiFirebase className='text-orange-500' />}
          label='Firebase'
        />
        <TechItem
          icon={<SiRedis className='text-red-500' />}
          label='Redis'
        />
        <TechItem
          icon={<DiNodejs className='text-green-600' />}
          label='Node.js'
        />
        <TechItem
          icon={<DiReact className='text-blue-400' />}
          label='React'
        />
        <TechItem
          icon={<SiNextdotjs className='text-black dark:text-white' />}
          label='Next.js'
        />
        <TechItem
          icon={<SiAstro className='text-gray-500' />}
          label='Astro'
        />
        <TechItem
          icon={<BiLogoFlutter className='text-blue-400' />}
          label='Flutter'
        />
        <TechItem
          icon={<SiRuby className='text-red-600' />}
          label='Ruby'
        />
        <TechItem
          icon={<CgCPlusPlus className='text-blue-600' />}
          label='C++'
        />
        <TechItem
          icon={<DiGit className='text-orange-600' />}
          label='Git'
        />
        <TechItem
          icon={
            <SiAngular className='bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600' />
          }
          label='Angular'
        />
        <TechItem
          icon={<SiSwift className='text-orange-400' />}
          label='Swift'
        />
        <TechItem
          icon={<SiLibreofficemath className='text-blue-700' />}
          label='MATLAB'
        />
      </div>
    </div>
  );
}

const TechItem: React.FC<TechItemProps> = ({ icon, label, className = '' }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className='mb-2 text-4xl'>{icon}</div>
    <span className='text-gray-600 dark:text-gray-300'>{label}</span>
  </div>
);

export default Techstack;
