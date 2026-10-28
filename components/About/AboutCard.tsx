import { GiCroissant, GiSpaceship } from 'react-icons/gi';
import { TbPokeball } from 'react-icons/tb';
import { useTranslations } from 'next-intl';

import BentoBox from '../BentoBox';

function AboutCard() {
  const t = useTranslations('About.card');
  return (
    <BentoBox className='mx-auto max-w-md transition duration-300'>
      <p className='mb-6 text-justify text-gray-800 dark:text-gray-200'>
        {t.rich('intro', {
          name: (chunks) => (
            <span className='font-bold text-purple-700 dark:text-purple-400'>
              {chunks}
            </span>
          )
        })}
        <br />
        <br />
        {t('expertise')}
        <br />
        <br />
        {t('hobbiesIntro')}
      </p>
      <ul className='mb-6 list-inside list-disc space-y-3 text-gray-800 dark:text-gray-300'>
        <li className='flex items-center'>
          <TbPokeball className='mr-2 text-2xl text-purple-700 dark:text-purple-400' />{' '}
          {t('gaming')}
        </li>
        <li className='flex items-center'>
          <GiCroissant className='mr-2 text-2xl text-purple-700 dark:text-purple-400' />{' '}
          {t('food')}
        </li>
        <li className='flex items-center'>
          <GiSpaceship className='mr-2 text-2xl text-purple-700 dark:text-purple-400' />{' '}
          {t('travel')}
        </li>
      </ul>
      <p className='mb-4 text-gray-700 italic dark:text-gray-400'>
        {t('quote')}
      </p>
      <p className='text-right text-sm text-gray-600 dark:text-gray-500'>
        — Martin DAVILA
      </p>
    </BentoBox>
  );
}

export default AboutCard;
