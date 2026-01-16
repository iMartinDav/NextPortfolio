import { FaApple, FaDocker } from 'react-icons/fa';
import { SiHeroku, SiLinux, SiPostman, SiVercel } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

function Toolstack() {
  return (
    <div className='flex flex-wrap justify-center gap-6 pb-12'>
      <div className='flex h-16 w-16 flex-col items-center'>
        <FaApple className='text-4xl text-gray-800 dark:text-gray-200' />
        <p className='mt-2 text-gray-700 dark:text-gray-300'>MacOS</p>
      </div>
      <div className='flex h-16 w-16 flex-col items-center'>
        <SiLinux className='text-4xl text-gray-800 dark:text-gray-200' />
        <p className='mt-2 text-gray-700 dark:text-gray-300'>Linux</p>
      </div>
      <div className='flex h-16 w-16 flex-col items-center'>
        <VscCode className='text-4xl text-gray-800 dark:text-gray-200' />
        <p className='mt-2 text-gray-700 dark:text-gray-300'>VS Code</p>
      </div>
      <div className='flex h-16 w-16 flex-col items-center'>
        <FaDocker className='text-4xl text-gray-800 dark:text-gray-200' />
        <p className='mt-2 text-gray-700 dark:text-gray-300'>Docker</p>
      </div>
      <div className='flex h-16 w-16 flex-col items-center'>
        <SiPostman className='text-4xl text-gray-800 dark:text-gray-200' />
        <p className='mt-2 text-gray-700 dark:text-gray-300'>Postman</p>
      </div>
      <div className='flex h-16 w-16 flex-col items-center'>
        <SiVercel className='text-4xl text-gray-800 dark:text-gray-200' />
        <p className='mt-2 text-gray-700 dark:text-gray-300'>Vercel</p>
      </div>
      <div className='flex h-16 w-16 flex-col items-center'>
        <SiHeroku className='text-4xl text-gray-800 dark:text-gray-200' />
        <p className='mt-2 text-gray-700 dark:text-gray-300'>Heroku</p>
      </div>
    </div>
  );
}

export default Toolstack;
