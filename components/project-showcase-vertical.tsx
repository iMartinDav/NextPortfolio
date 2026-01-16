import { useState } from 'react';

import Image from 'next/image';

import Marquee from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';

interface Project {
  name: string;
  body: string;
  slug: string;
  image: string;
}

interface ProjectShowcaseVerticalProps {
  projects: Project[];
}

const ReviewCard = ({
  name,
  body,
  slug,
  image
}: {
  name: string;
  body: string;
  slug: string;
  image: string;
}) => {
  const [imageError, setImageError] = useState(false);

  // Construct the proper image URL
  const getImageUrl = (image: string) => {
    if (imageError) return '/images/placeholder.jpg';
    return image.startsWith('/')
      ? `https://projects.imartin.dev${image}`
      : `https://projects.imartin.dev/images/${image}`;
  };

  return (
    <figure
      className={cn(
        'group relative h-48 w-full cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl',
        // light styles - restored original colors
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles - restored original colors
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}>
      {/* Website screenshot - clear and prominent, covering left portion */}
      <div className='absolute top-0 left-0 h-full w-2/5 overflow-hidden rounded-l-2xl'>
        <Image
          src={getImageUrl(image)}
          alt={`${name} website screenshot`}
          fill
          sizes='(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 25vw'
          className='object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100'
          onError={() => setImageError(true)}
        />
      </div>

      <a href={`https://projects.imartin.dev/projects/${slug}`}>
        {/* Main content layout - positioned completely after the image */}
        <div className='relative z-10 flex h-full items-center'>
          {/* Content section - positioned starting from where image ends */}
          <div className='ml-[40%] flex h-full min-w-0 flex-1 flex-col justify-center pr-4 pl-8'>
            <div>
              <figcaption className='mb-3 line-clamp-2 text-xl leading-tight font-semibold transition-colors duration-300 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-400'>
                {name}
              </figcaption>
              <blockquote className='line-clamp-4 text-base leading-relaxed text-gray-600 dark:text-gray-300'>
                {body}
              </blockquote>
            </div>

            {/* Modern accent line at bottom */}
            <div className='mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-purple-700 to-purple-400 transition-all duration-500 ease-out group-hover:w-full' />
          </div>
        </div>
      </a>
    </figure>
  );
};

const ProjectShowcaseVertical = ({
  projects
}: ProjectShowcaseVerticalProps) => {
  // Single column display with all projects in one continuous scroll
  const totalProjects = Math.min(projects.length, 12); // Limit to 12 projects for performance

  return (
    <div className='bg-background relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'>
      {/* Single Column - Full width */}
      <Marquee
        pauseOnHover
        vertical
        className='w-full px-4 [--duration:60s]'>
        {projects.slice(0, totalProjects).map((project) => (
          <ReviewCard
            key={project.slug}
            {...project}
          />
        ))}
      </Marquee>

      {/* Subtle gradient overlays for modern effect */}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-white/80 to-transparent dark:from-gray-950/80'></div>
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-white/80 to-transparent dark:from-gray-950/80'></div>
    </div>
  );
};

export default ProjectShowcaseVertical;
