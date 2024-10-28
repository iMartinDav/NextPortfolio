import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MapPin, Copy, Check, Linkedin, Github } from 'lucide-react';
import { EvervaultCard } from '../ui/evervault-card';

// Dynamically import the Globe component to disable SSR
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const BentoContact = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('aldntmi@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section
      className="space-y-20 my-20 bg-background text-foreground p-4"
      id="contact"
    >
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Section 1: Introduction */}
        <div className="col-span-1 xl:row-span-3 p-6 bg-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-border">
          <div className="flex flex-col justify-center items-start">
            <EvervaultCard
              text="Crafting Tomorrow's Solutions"
              className="w-full h-48 md:h-72 lg:h-80"
            />
            <div className="mt-4">
              <p className="text-muted-foreground">
                In the ever-evolving world of bioinformatics and biotech, every
                breakthrough starts with curiosity and innovation. Through years
                of dedication, transformative technology has been harnessed to
                decode the complexities of biological data, bridging the gap
                between raw information and meaningful insights.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: The Bioinformatics Journey */}
        <div className="col-span-1 xl:row-span-3 p-6 bg-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-border">
          <div className="flex flex-col justify-center items-start">
            <EvervaultCard
              text="Innovative Solutions"
              className="w-full h-48 md:h-72 lg:h-80"
            />
            <div className="mt-4">
              <p className="text-muted-foreground">
                Each project undertaken is a step towards unraveling the
                mysteries of biological systems. By integrating advanced
                algorithms and machine learning techniques, the mission has
                always been to provide actionable insights that propel research
                and application in the biotech sphere.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Global Impact */}
        <div className="col-span-1 xl:row-span-4 p-6 bg-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-border">
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
                    text: 'Lyon, France',
                    color: 'white',
                    size: 15
                  }
                ]}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                A Global Network of Innovation
              </p>
              <p className="text-muted-foreground mt-2">
                Collaboration knows no boundaries. From Lyon to every corner of
                the globe, the focus remains on driving advancements that
                influence and enhance the biotech industry worldwide.
              </p>
              <Button
                variant="outline"
                className="w-full mt-6"
              >
                <MapPin className="mr-2" /> Connect
              </Button>
            </div>
          </div>
        </div>

        {/* Section 4: Journey Through Experience */}
        <div className="xl:col-span-2 xl:row-span-3 p-6 bg-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-border">
          <div className="flex flex-col justify-center items-start">
            <EvervaultCard
              text="A Path of Discovery"
              className="w-full h-32 md:h-48 lg:h-56"
            />
            <div className="mt-4">
              <p className="text-muted-foreground">
                The journey through the realms of bioinformatics and biotech has
                been marked by significant contributions to projects and
                research that shape the future of healthcare and data analysis.
                Each role undertaken has been a stepping stone in a quest to
                unlock the next big discovery.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Invitation to Connect */}
        <div className="xl:col-span-1 xl:row-span-2 p-6 bg-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-border">
          <div className="flex flex-col items-center">
            <EvervaultCard
              text="Explore the Future Together"
              className="w-full h-32 md:h-48 lg:h-56"
            />
            <div className="space-y-2 mt-4 w-full">
              <p className="text-muted-foreground text-center">
                As the world of bioinformatics and biotech continues to evolve,
                there’s always room for new partnerships and collaborative
                endeavors. Reach out to explore how we can drive innovation and
                make an impact together.
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
                <span>{hasCopied ? 'Copied!' : 'aldntmi@gmail.com'}</span>
              </Button>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="https://linkedin.com/in/imartindav"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <Linkedin size={20} />
                  </Button>
                </a>
                <a
                  href="https://github.com/imartindav"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                  >
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
