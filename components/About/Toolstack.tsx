import React from 'react';
import {
  SiLinux,
  SiVisualstudiocode,
  SiPostman,
  SiHeroku,
  SiVercel
} from 'react-icons/si';
import { FaApple, FaDocker } from 'react-icons/fa';

function Toolstack() {
  return (
    <div className="flex flex-wrap justify-center gap-6 pb-12">
      <div className="flex flex-col items-center w-16 h-16">
        <FaApple className="text-4xl text-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">MacOS</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiLinux className="text-4xl text-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">Linux</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiVisualstudiocode className="text-4xl text-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">VS Code</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <FaDocker className="text-4xl text-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">Docker</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiPostman className="text-4xl text-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">Postman</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiVercel className="text-4xl text-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">Vercel</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiHeroku className="text-4xl text-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">Heroku</p>
      </div>
    </div>
  );
}

export default Toolstack;
