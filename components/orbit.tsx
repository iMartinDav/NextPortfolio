import OrbitingCircles from '@/components/magicui/orbiting-circles';

import { motion } from 'framer-motion';
import { AiOutlineDocker } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';
import { SiUbuntu } from 'react-icons/si';
import { SiNginx } from 'react-icons/si';
import { SiSvelte } from 'react-icons/si';
import { SiPython } from 'react-icons/si';
import { SiNextdotjs } from 'react-icons/si';
import { SiReact } from 'react-icons/si';
import { SiFastapi } from 'react-icons/si';
import { SiPocketbase } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiOpenai } from 'react-icons/si';

export default function Orbit() {
  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl'>
      {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"> */}
      {/* Circles */}
      {/* </span> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}>
        {/* Center Circles */}
        <OrbitingCircles
          className='h-[20px] w-[20px] border-none bg-transparent'
          duration={3}
          delay={10}
          radius={10}>
          <Icons.gitHub />
        </OrbitingCircles>

        {/* Inner Circles */}
        <OrbitingCircles
          className='h-[20px] w-[20px] border-none bg-transparent'
          duration={20}
          radius={50}
          delay={66}>
          <Icons.python />
        </OrbitingCircles>

        <OrbitingCircles
          className='h-[20px] w-[20px] border-none bg-transparent'
          duration={20}
          radius={50}
          delay={132}>
          <Icons.svelte />
        </OrbitingCircles>

        <OrbitingCircles
          className='h-[20px] w-[20px] border-none bg-transparent'
          duration={20}
          radius={50}
          delay={198}>
          <Icons.typescript />
        </OrbitingCircles>

        {/* Outer Circles (reverse) */}
        <OrbitingCircles
          className='h-[30px] w-[40px] border-none bg-transparent'
          reverse
          radius={100}
          delay={20}
          duration={20}>
          <Icons.vercel />
        </OrbitingCircles>

        <OrbitingCircles
          className='h-[30px] w-[40px] border-none bg-transparent'
          reverse
          radius={100}
          delay={25}
          duration={20}>
          <Icons.ubuntu />
        </OrbitingCircles>

        <OrbitingCircles
          className='h-[30px] w-[40px] border-none bg-transparent'
          reverse
          radius={100}
          delay={30}
          duration={20}>
          <Icons.docker />
        </OrbitingCircles>
        <OrbitingCircles
          className='h-[30px] w-[40px] border-none bg-transparent'
          reverse
          radius={100}
          delay={35}
          duration={20}>
          <Icons.nginx />
        </OrbitingCircles>

        {/* Most Outer Circles (reverse) */}
        <OrbitingCircles
          className='h-[40px] w-[40px] border-none bg-transparent'
          radius={150}
          duration={40}
          delay={0}>
          <Icons.fastapi />
        </OrbitingCircles>

        <OrbitingCircles
          className='h-[40px] w-[40px] border-none bg-transparent'
          radius={150}
          duration={40}
          delay={50}>
          <Icons.openai />
        </OrbitingCircles>

        <OrbitingCircles
          className='h-[40px] w-[40px] border-none bg-transparent'
          radius={150}
          duration={40}
          delay={100}>
          <Icons.pocketbase />
        </OrbitingCircles>

        <OrbitingCircles
          className='h-[40px] w-[40px] border-none bg-transparent'
          radius={150}
          duration={40}
          delay={150}>
          <Icons.laptop />
        </OrbitingCircles>
      </motion.div>
    </div>
  );
}

const Icons = {
  gitHub: () => <FaGithub className='h-full w-full' />,
  docker: () => <AiOutlineDocker className='h-full w-full' />,
  ubuntu: () => <SiUbuntu className='h-full w-full' />,
  vercel: () => <SiVercel className='h-full w-full' />,
  nginx: () => <SiNginx className='h-full w-full' />,
  react: () => <SiReact className='h-full w-full' />,
  nextjs: () => <SiNextdotjs className='h-full w-full' />,
  pocketbase: () => <SiPocketbase className='h-full w-full' />,
  python: () => <SiPython className='h-full w-full' />,
  svelte: () => <SiSvelte className='h-full w-full' />,
  typescript: () => <SiTypescript className='h-full w-full' />,
  javascript: () => <SiJavascript className='h-full w-full' />,
  fastapi: () => <SiFastapi className='h-full w-full' />,
  openai: () => <SiOpenai className='h-full w-full' />,
  laptop: () => <FaLaptop className='h-full w-full' />
};
