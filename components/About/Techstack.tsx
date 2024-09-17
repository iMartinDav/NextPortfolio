import React from "react";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
} from "react-icons/di";
import { SiPytorch, SiFirebase, SiNextdotjs } from "react-icons/si";

function Techstack() {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Technologies I Work With
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center">
          <CgCPlusPlus className="text-4xl text-blue-600 mb-2" />
          <span className="text-gray-600">C++</span>
        </div>
        <div className="flex flex-col items-center">
          <DiJavascript1 className="text-4xl text-yellow-600 mb-2" />
          <span className="text-gray-600">JavaScript</span>
        </div>
        <div className="flex flex-col items-center">
          <DiNodejs className="text-4xl text-green-600 mb-2" />
          <span className="text-gray-600">Node.js</span>
        </div>
        <div className="flex flex-col items-center">
          <DiReact className="text-4xl text-blue-400 mb-2" />
          <span className="text-gray-600">React</span>
        </div>
        <div className="flex flex-col items-center">
          <DiMongodb className="text-4xl text-green-800 mb-2" />
          <span className="text-gray-600">MongoDB</span>
        </div>
        <div className="flex flex-col items-center">
          <SiNextdotjs className="text-4xl text-gray-800 mb-2" />
          <span className="text-gray-600">Next.js</span>
        </div>
        <div className="flex flex-col items-center">
          <DiGit className="text-4xl text-orange-600 mb-2" />
          <span className="text-gray-600">Git</span>
        </div>
        <div className="flex flex-col items-center">
          <SiFirebase className="text-4xl text-orange-500 mb-2" />
          <span className="text-gray-600">Firebase</span>
        </div>
        <div className="flex flex-col items-center">
          <DiPython className="text-4xl text-blue-500 mb-2" />
          <span className="text-gray-600">Python</span>
        </div>
        <div className="flex flex-col items-center">
          <SiPytorch className="text-4xl text-red-600 mb-2" />
          <span className="text-gray-600">PyTorch</span>
        </div>
      </div>
    </div>
  );
}

export default Techstack;
