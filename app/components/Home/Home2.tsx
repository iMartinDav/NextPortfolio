import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { SiCodeship } from "react-icons/si";
import Particle from "../Particle";
import BentoBox from "../BentoBox";

const socialLinks = [
  { href: "https://twitter.com/iMartinDav", Icon: RiTwitterXLine },
  { href: "https://github.com/iMartinDav", Icon: AiFillGithub },
  { href: "https://www.linkedin.com/in/imartindav/", Icon: AiFillLinkedin },
  { href: "https://opensea.io/iMartinDav", Icon: SiCodeship },
];

const GradientText: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-light to-purple-light">
    {children}
  </span>
);

const OrganicShape: React.FC<{ className: string; color: string }> = ({
  className,
  color,
}) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fill={color}
      d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.1,15.3,83.5,30.6,75.2,43.9C66.9,57.3,54.8,68.7,40.9,76.6C27.1,84.5,13.6,88.9,-0.4,89.6C-14.3,90.3,-28.6,87.3,-41.6,80.6C-54.6,73.9,-66.3,63.5,-74.5,50.4C-82.7,37.3,-87.5,21.4,-88.2,5.4C-89,-10.6,-85.8,-26.8,-78.3,-40.6C-70.8,-54.4,-59,-65.8,-45.2,-73C-31.4,-80.3,-15.7,-83.4,-0.2,-83.1C15.3,-82.8,30.6,-83.1,44.7,-76.4Z"
      transform="translate(100 100)"
    />
  </svg>
);

const BiotechProfile: React.FC = () => (
  <ParallaxProvider>
    <section className="relative bg-gradient-to-b from-gray-900 to-black py-20 overflow-hidden">
      <Particle />
      <OrganicShape
        className="absolute top-0 left-0 w-96 h-96 opacity-10 -translate-x-1/2 -translate-y-1/2"
        color="#3B82F6"
      />
      <OrganicShape
        className="absolute bottom-0 right-0 w-96 h-96 opacity-10 translate-x-1/2 translate-y-1/2"
        color="#8B5CF6"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <BentoBox>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Innovating at the <GradientText>Intersection</GradientText> of
                <br />
                <GradientText>Biology and Code</GradientText>
              </h1>
              <p className="text-xl text-gray-300">
                Building the future by designing and modifying the code of life.
                👨🏻‍💻🧬
              </p>
            </BentoBox>

            <BentoBox>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Expertise
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-gray-300">
                {[
                  "Bioinformatics",
                  "Software Engineer",
                  "DNA Sequence Analysis",
                  "Machine Learning in Genomics",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </BentoBox>

            <BentoBox>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "R",
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "AWS",
                  "Docker",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-background text-blue-light rounded-full text-sm hover:bg-blue-light hover:text-background transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </BentoBox>
          </div>

          <Parallax speed={-10}>
            <div className="relative w-80 h-80 mx-auto">
              <Image
                src="/dna-helix.svg"
                alt="DNA Helix"
                layout="fill"
                className="opacity-30 animate-spin-slow"
              />
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src="/avatar.svg"
                  alt="avatar"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-purple-500 shadow-lg"
                />
              </motion.div>
            </div>
          </Parallax>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Connect & Collaborate
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s innovate together in the realm of{" "}
            <GradientText>biotech and software</GradientText>
          </p>
          <ul className="flex justify-center space-x-6">
            {socialLinks.map(({ href, Icon }) => (
              <motion.li
                key={href}
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-light hover:text-purple-500 focus:ring-4 focus:ring-purple-500/30 rounded-full p-2 block"
                >
                  <Icon className="text-4xl" />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  </ParallaxProvider>
);

export default BiotechProfile;
