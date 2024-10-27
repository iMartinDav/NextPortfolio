// components/About/About.tsx
import Image from "next/image";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import Toolstack from "./Toolstack";

const AboutContent: React.FC = () => {
  return (
    <div className="bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText py-10 transition-colors duration-300">
      <Particle />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="w-full md:w-7/12 px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-center md:text-left mt-16 md:mt-0">
              Know Who <span className="text-purple-600">I&apos;M</span>
            </h1>
            <Aboutcard />
          </div>
          <div className="w-full md:w-5/12 px-4 py-8 flex justify-center md:justify-start">
            <Image
              src="/about.png"
              alt="home pic"
              width={600}
              height={600}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center my-8">
          Professional <span className="text-purple-600">Skillset</span>
        </h1>
        <Techstack />
        <h1 className="text-2xl md:text-3xl font-bold text-center my-8">
          <span className="text-purple-600">Tools</span> I use
        </h1>
        <Toolstack />
      </div>

      <Github />
    </div>
  );
};

export default AboutContent;
