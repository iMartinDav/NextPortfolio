import React from 'react';
import { CgWebsite } from 'react-icons/cg';
import { BsGithub } from 'react-icons/bs';

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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={imgPath}
        alt="card-img"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p
          className="text-gray-700 text-sm mb-4"
          style={{ textAlign: 'justify' }}
        >
          {description}
        </p>

        <div className="flex items-center">
          <a
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            href={ghLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="mr-2" /> {isBlog ? 'Blog' : 'GitHub'}
          </a>

          {!isBlog && demoLink && (
            <a
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ml-2"
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CgWebsite className="mr-2" /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
