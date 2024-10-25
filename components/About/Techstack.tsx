import React from "react";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiPython,
} from "react-icons/di";
import {
  SiPytorch,
  SiFirebase,
  SiNextdotjs,
  SiAstro,
  SiPostgresql,
  SiRuby,
  SiFlask,
  SiRedis,
  SiAngular,
  SiSwift,
  SiLibreofficemath,
} from "react-icons/si";
import { BiLogoFlutter } from "react-icons/bi";

interface TechItemProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function Techstack() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition duration-300">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <TechItem icon={<SiPytorch className="text-red-600" />} label="PyTorch" />
        <TechItem icon={<DiPython className="text-blue-500" />} label="Python" />
        <TechItem icon={<SiFlask className="text-green-600" />} label="Flask" />
        <TechItem icon={<SiPostgresql className="text-blue-700" />} label="PostgreSQL" />
        <TechItem icon={<DiMongodb className="text-green-800" />} label="MongoDB" />
        <TechItem icon={<SiFirebase className="text-orange-500" />} label="Firebase" />
        <TechItem icon={<SiRedis className="text-red-500" />} label="Redis" />
        <TechItem icon={<DiNodejs className="text-green-600" />} label="Node.js" />
        <TechItem icon={<DiReact className="text-blue-400" />} label="React" />
        <TechItem icon={<SiNextdotjs className="text-gray-800" />} label="Next.js" />
        <TechItem icon={<SiAstro className="text-gray-500" />} label="Astro" />
        <TechItem icon={<BiLogoFlutter className="text-blue-400" />} label="Flutter" />
        <TechItem icon={<SiRuby className="text-red-600" />} label="Ruby" />
        <TechItem icon={<CgCPlusPlus className="text-blue-600" />} label="C++" />
        <TechItem icon={<DiGit className="text-orange-600" />} label="Git" />
        <TechItem icon={<SiAngular className="bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600"/>} label="Angular" />
        <TechItem icon={<SiSwift className="text-orange-400" />} label="Swift" />
        <TechItem icon={<SiLibreofficemath className="text-blue-700" />} label="MATLAB" />
      </div>
    </div>
  );
}

const TechItem: React.FC<TechItemProps> = ({ icon, label, className = "" }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className="text-4xl mb-2">{icon}</div>
    <span className="text-gray-600 dark:text-gray-300">{label}</span>
  </div>
);

export default Techstack;
