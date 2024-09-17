import React from "react";
import { TbPokeball } from "react-icons/tb";
import { GiCroissant, GiSpaceship } from "react-icons/gi";
import { Card, CardContent } from "@/components/ui/card"; // Import the components correctly

function AboutCard() {
  return (
    <Card className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <CardContent>
        <p className="text-gray-700 mb-6 text-justify">
          Hi Everyone, I am{" "}
          <span className="text-purple-600 font-semibold">Martin DAVILA</span>{" "}
          from{" "}
          <span className="text-purple-600 font-semibold">
            The World 🌎 to the 🪐
          </span>
          .
          <br />I am a Full Stack Bioinformatics Engineer.
          <br />
          <br />
          Apart from coding, here are some activities I enjoy:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-3 text-gray-800">
          <li className="flex items-center">
            <TbPokeball className="text-2xl text-purple-600 mr-2" /> Playing
            Pokemon Games
          </li>
          <li className="flex items-center">
            <GiCroissant className="text-2xl text-purple-600 mr-2" /> Exploring
            Cultures through Food
          </li>
          <li className="flex items-center">
            <GiSpaceship className="text-2xl text-purple-600 mr-2" /> Traveling
          </li>
        </ul>
        <p className="text-gray-600 italic mb-4">
          &quot;Knowing how to code is not a great power, but how you apply it
          to others is what truly makes a difference in the world. Use your
          knowledge and skills to empower and uplift those around you, and
          together we can build a brighter future for all.&quot;
        </p>
        <p className="text-gray-500 text-sm text-right">— Martin DAVILA</p>
      </CardContent>
    </Card>
  );
}

export default AboutCard;
