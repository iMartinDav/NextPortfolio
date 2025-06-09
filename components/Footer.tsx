import type React from 'react';

import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { SiCodeship } from 'react-icons/si';

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className='relative z-20 rounded-t-3xl bg-gray-800 py-3 text-gray-300 md:py-4'>
      <div className='mx-auto max-w-7xl px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0'>
          {/* Section 1: Branding */}
          <div className='w-full text-center md:w-1/3 md:text-left'>
            <h3 className='text-xs leading-tight font-bold text-gray-300'>
              Built From Scratch With 💚 by Martin DAVILA
            </h3>
          </div>

          {/* Section 2: Copyright */}
          <div className='w-full text-center md:w-1/3'>
            <h3 className='text-xs leading-tight font-medium text-gray-400'>
              Copyright © {year} All Rights Reserved to GPT-4o
            </h3>
          </div>

          {/* Section 3: Social Icons */}
          <div className='w-full text-center md:w-1/3 md:text-right'>
            <ul className='flex justify-center space-x-3 md:justify-end md:space-x-4'>
              <li className='relative z-10'>
                <a
                  href='https://github.com/iMartinDav'
                  className='inline-block transform cursor-pointer text-gray-400 transition-all duration-300 hover:scale-110 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'>
                  <AiFillGithub size={20} />
                </a>
              </li>
              <li className='relative z-10'>
                <a
                  href='https://twitter.com/iMartinDav'
                  className='inline-block transform cursor-pointer text-gray-400 transition-all duration-300 hover:scale-110 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Twitter'>
                  <RiTwitterXLine size={20} />
                </a>
              </li>
              <li className='relative z-10'>
                <a
                  href='https://www.linkedin.com/in/imartindav/'
                  className='inline-block transform cursor-pointer text-gray-400 transition-all duration-300 hover:scale-110 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'>
                  <FaLinkedinIn size={20} />
                </a>
              </li>
              <li className='relative z-10'>
                <a
                  href='https://opensea.io/iMartinDav'
                  className='inline-block transform cursor-pointer text-gray-400 transition-all duration-300 hover:scale-110 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='OpenSea'>
                  <SiCodeship size={20} />
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
