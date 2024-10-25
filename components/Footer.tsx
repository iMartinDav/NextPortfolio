import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiCodeship } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-4 md:py-6 rounded-t-3xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-1 md:space-y-0">
          {/* Section 1: Branding */}
          <div className="text-center md:text-left w-full md:w-1/3">
            <h3 className="text-xs font-bold leading-snug mb-1">
              Built From Scratch With 💚 by Martin DAVILA
            </h3>
          </div>

          {/* Section 2: Copyright */}
          <div className="text-center md:text-center w-full md:w-1/3">
            <h3 className="text-xs font-medium leading-snug">
              Copyright © {year} All Rights Reserved to GPT-o1
            </h3>
          </div>

          {/* Section 3: Social Icons */}
          <div className="text-center w-full md:w-1/3">
            <ul className="flex justify-center space-x-4 md:space-x-6">
              <li>
                <a
                  href="https://github.com/iMartinDav"
                  className="text-gray-400 hover:text-white transition-all transform hover:scale-125 duration-300 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <AiFillGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/iMartinDav"
                  className="text-gray-400 hover:text-white transition-all transform hover:scale-125 duration-300 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <RiTwitterXLine size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/imartindav/"
                  className="text-gray-400 hover:text-white transition-all transform hover:scale-125 duration-300 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://opensea.io/iMartinDav"
                  className="text-gray-400 hover:text-white transition-all transform hover:scale-125 duration-300 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="OpenSea"
                >
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
