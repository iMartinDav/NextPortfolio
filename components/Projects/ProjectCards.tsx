import Image from 'next/image';

import { BsGithub } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';

interface ProjectCardProps {
  imgPath: string;
  title: string;
  description: string;
  ghLink: string;
  demoLink?: string;
  isBlog?: boolean;
}

const ProjectCards: React.FC<ProjectCardProps> = ({
  imgPath,
  title,
  description,
  ghLink,
  demoLink,
  isBlog
}) => {
  return (
    <div className='relative overflow-hidden rounded-lg bg-white shadow-lg'>
      <Image
        fill
        className='object-cover'
        src={imgPath}
        alt='card-img'
      />

      <div className='p-4'>
        <h3 className='text-lg font-bold'>{title}</h3>
        <p
          className='mb-4 text-sm text-gray-700'
          style={{ textAlign: 'justify' }}>
          {description}
        </p>

        <div className='flex items-center'>
          <a
            className='flex items-center rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
            href={ghLink}
            target='_blank'
            rel='noopener noreferrer'>
            <BsGithub className='mr-2' /> {isBlog ? 'Blog' : 'GitHub'}
          </a>

          {!isBlog && demoLink && (
            <a
              className='ml-2 flex items-center rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
              href={demoLink}
              target='_blank'
              rel='noopener noreferrer'>
              <CgWebsite className='mr-2' /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
