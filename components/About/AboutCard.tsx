import React from 'react';

import BentoBox from '../BentoBox';
import { GiCroissant, GiSpaceship } from 'react-icons/gi';
import { TbPokeball } from 'react-icons/tb';

function AboutCard() {
  return (
    <BentoBox className='mx-auto max-w-md rounded-lg bg-white bg-opacity-30 shadow-lg backdrop-blur-xs transition duration-300 dark:bg-gray-800'>
      <p className='mb-6 text-justify text-gray-800 dark:text-gray-200'>
        Hello, I am{' '}
        <span className='font-bold text-purple-700 dark:text-purple-400'>
          Martin DAVILA
        </span>
        , a dedicated Full Stack Bioinformatics Engineer focused on harnessing
        the power of data to drive innovation in life sciences.
        <br />
        <br />
        With expertise in computational biology, I work to bridge the gap
        between technology and biological research, employing advanced
        algorithms to analyze complex datasets and contribute to groundbreaking
        discoveries.
        <br />
        <br />
        Outside of my technical pursuits, I enjoy:
      </p>
      <ul className='mb-6 list-inside list-disc space-y-3 text-gray-800 dark:text-gray-300'>
        <li className='flex items-center'>
          <TbPokeball className='mr-2 text-2xl text-purple-700 dark:text-purple-400' />{' '}
          Gaming: Exploring the Pokémon universe
        </li>
        <li className='flex items-center'>
          <GiCroissant className='mr-2 text-2xl text-purple-700 dark:text-purple-400' />{' '}
          Culinary Adventures: Discovering cultures through food
        </li>
        <li className='flex items-center'>
          <GiSpaceship className='mr-2 text-2xl text-purple-700 dark:text-purple-400' />{' '}
          Traveling: Experiencing the wonders of the world
        </li>
      </ul>
      <p className='mb-4 italic text-gray-700 dark:text-gray-400'>
        &quot;The true power of coding lies not in its technicality, but in its
        capacity to uplift and empower. Harness your skills to create positive
        change and together, we can pave the way for a brighter, more innovative
        future.&quot;
      </p>
      <p className='text-right text-sm text-gray-600 dark:text-gray-500'>
        — Martin DAVILA
      </p>
    </BentoBox>
  );
}

export default AboutCard;
