import React from "react";
import {
  SiLinux,
  SiVisualstudiocode,
  SiPostman,
  SiHeroku,
  SiVercel,
} from "react-icons/si";
import { FaApple } from "react-icons/fa"; // For MacOS
import { FaDocker } from "react-icons/fa"; // For Docker

function Toolstack() {
  return (
    <div className="flex flex-wrap justify-center gap-6 pb-12">
      <div className="flex flex-col items-center w-16 h-16">
        <FaApple className="text-4xl text-gray-800" />
        <p className="mt-2 text-gray-700">MacOS</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiLinux className="text-4xl text-gray-800" />
        <p className="mt-2 text-gray-700">Linux</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiVisualstudiocode className="text-4xl text-gray-800" />
        <p className="mt-2 text-gray-700">VS Code</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <FaDocker className="text-4xl text-gray-800" />
        <p className="mt-2 text-gray-700">Docker</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiPostman className="text-4xl text-gray-800" />
        <p className="mt-2 text-gray-700">Postman</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiVercel className="text-4xl text-gray-800" />
        <p className="mt-2 text-gray-700">Vercel</p>
      </div>
      <div className="flex flex-col items-center w-16 h-16">
        <SiHeroku className="text-4xl text-gray-800" />
        <p className="mt-2 text-gray-700">Heroku</p>
      </div>
    </div>
  );
}

export default Toolstack;
