import type React from 'react';

import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { SiCodeship } from 'react-icons/si';

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className='rounded-t-3xl bg-gray-800 py-4 text-gray-300 md:py-6'>
      <div className='container mx-auto px-4 md:px-8'>
        <div className='flex flex-col items-center space-y-1 md:flex-row md:justify-between md:space-y-0'>
          {/* Section 1: Branding */}
          <div className='w-full text-center md:w-1/3 md:text-left'>
            <h3 className='mb-1 text-xs font-bold leading-snug'>
              Built From Scratch With 💚 by Martin DAVILA
            </h3>
          </div>

          {/* Section 2: Copyright */}
          <div className='w-full text-center md:w-1/3 md:text-center'>
            <h3 className='text-xs font-medium leading-snug'>
              Copyright © {year} All Rights Reserved to GPT-4o
            </h3>
          </div>

          {/* Section 3: Social Icons */}
          <div className='w-full text-center md:w-1/3'>
            <ul className='flex justify-center space-x-4 md:space-x-6'>
              <li>
                <a
                  href='https://github.com/iMartinDav'
                  className='inline-block transform text-gray-400 transition-all duration-300 hover:scale-125 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'>
                  <AiFillGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  href='https://twitter.com/iMartinDav'
                  className='inline-block transform text-gray-400 transition-all duration-300 hover:scale-125 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Twitter'>
                  <RiTwitterXLine size={24} />
                </a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/in/imartindav/'
                  className='inline-block transform text-gray-400 transition-all duration-300 hover:scale-125 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'>
                  <FaLinkedinIn size={24} />
                </a>
              </li>
              <li>
                <a
                  href='https://opensea.io/iMartinDav'
                  className='inline-block transform text-gray-400 transition-all duration-300 hover:scale-125 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='OpenSea'>
                  <SiCodeship size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
