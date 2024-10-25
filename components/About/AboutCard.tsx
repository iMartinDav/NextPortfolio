import React from "react";
import { TbPokeball } from "react-icons/tb";
import { GiCroissant, GiSpaceship } from "react-icons/gi";
import BentoBox from "../BentoBox"; // Adjust the path to BentoBox if necessary

function AboutCard() {
  return (
    <BentoBox className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg backdrop-blur-sm bg-opacity-30 transition duration-300">
      <p className="text-gray-800 dark:text-gray-200 mb-6 text-justify">
        Hello, I am{" "}
        <span className="text-purple-700 dark:text-purple-400 font-bold">Martin DAVILA</span>,
        a dedicated Full Stack Bioinformatics Engineer focused on harnessing the power of data to drive innovation in life sciences.
        <br />
        <br />
        With expertise in computational biology, I work to bridge the gap between technology and biological research, 
        employing advanced algorithms to analyze complex datasets and contribute to groundbreaking discoveries.
        <br />
        <br />
        Outside of my technical pursuits, I enjoy:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-3 text-gray-800 dark:text-gray-300">
        <li className="flex items-center">
          <TbPokeball className="text-2xl text-purple-700 dark:text-purple-400 mr-2" /> Gaming: Exploring the Pokémon universe
        </li>
        <li className="flex items-center">
          <GiCroissant className="text-2xl text-purple-700 dark:text-purple-400 mr-2" /> Culinary Adventures: Discovering cultures through food
        </li>
        <li className="flex items-center">
          <GiSpaceship className="text-2xl text-purple-700 dark:text-purple-400 mr-2" /> Traveling: Experiencing the wonders of the world
        </li>
      </ul>
      <p className="text-gray-700 dark:text-gray-400 italic mb-4">
        &quot;The true power of coding lies not in its technicality, but in its capacity to uplift and empower. 
        Harness your skills to create positive change and together, we can pave the way for a brighter, more innovative future.&quot;
      </p>
      <p className="text-gray-600 dark:text-gray-500 text-sm text-right">— Martin DAVILA</p>
    </BentoBox>
  );
}

export default AboutCard;
