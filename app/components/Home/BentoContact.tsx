import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  User,
  Briefcase,
  Code,
  MapPin,
  Copy,
  Check,
  Linkedin,
  Github,
} from "lucide-react";

// Dynamically import the Globe component to disable SSR
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const BentoContact = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("aldntmi@gmail.com");
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section
      className="space-y-20 my-20 bg-[#0B0A21] text-white p-4"
      id="about"
    >
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Section 1: Introduction */}
        <div className="col-span-1 xl:row-span-3 p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-700">
          <div className="flex flex-col justify-center items-start">
            <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">
                Hi, I&apos;m Martin DAVILA
              </p>
              <p className="text-gray-300 mt-2">
                Software Engineer with 5+ years of experience in full-stack
                development, cloud infrastructure, and DevOps. Passionate about
                optimizing performance and delivering impactful solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Tech Stack */}
        <div className="col-span-1 xl:row-span-3 p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-700">
          <div className="flex flex-col justify-center items-start">
            <div className="w-full h-64 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Code size={64} className="text-white" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">Tech Stack</p>
              <ul className="text-gray-300 mt-2 list-disc list-inside">
                <li>Full-Stack Development (React, Node.js, Python)</li>
                <li>Cloud Architecture (AWS)</li>
                <li>DevOps & CI/CD</li>
                <li>Machine Learning</li>
                <li>Bioinformatics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Globe Visualization */}
        <div className="col-span-1 xl:row-span-4 p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-700">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-80">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 45.78,
                    lng: 4.87,
                    text: "Lyon, France",
                    color: "white",
                    size: 15,
                  },
                ]}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-white">
                Open to Remote Work Worldwide
              </p>
              <p className="text-gray-300 mt-2">
                Based in Lyon, France, but flexible with time zones and
                locations.
              </p>
              <Button variant="outline" className="w-full mt-6">
                <MapPin className="mr-2" /> Contact Me
              </Button>
            </div>
          </div>
        </div>

        {/* Section 4: Experience */}
        <div className="xl:col-span-2 xl:row-span-3 p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-700">
          <div className="flex flex-col justify-center items-start">
            <div className="w-full h-64 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <Briefcase size={64} className="text-white" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">
                Professional Experience
              </p>
              <ul className="text-gray-300 mt-2 list-disc list-inside">
                <li>DevOps Engineer & Full-Stack Developer - Agilebio</li>
                <li>Software Engineer - iGEM</li>
                <li>Full-Stack R&D Engineer - Hiring for Good</li>
                <li>Software Engineer & Data Scientist - Bioconductor</li>
                <li>Bioinformatics Researcher - INSA Lyon</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Contact Information */}
        <div className="xl:col-span-1 xl:row-span-2 p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-full h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <div className="space-y-2 mt-4 w-full">
              <p className="text-lg font-medium text-white text-center">
                Contact me
              </p>
              <Button
                className="w-full flex justify-center items-center"
                variant="outline"
                onClick={handleCopy}
              >
                {hasCopied ? (
                  <Check className="mr-2" />
                ) : (
                  <Copy className="mr-2" />
                )}
                <span>{hasCopied ? "Copied!" : "aldntmi@gmail.com"}</span>
              </Button>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="https://linkedin.com/in/imartindav"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Linkedin size={20} />
                  </Button>
                </a>
                <a
                  href="https://github.com/imartindav"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Github size={20} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoContact;
