import OrbitingCircles from '@/components/magicui/orbiting-circles';

import { AiOutlineDocker } from 'react-icons/ai';
import { FaGithub, FaLaptop } from 'react-icons/fa';
import {
  SiFastapi,
  SiJavascript,
  SiNextdotjs,
  SiNginx,
  SiOpenai,
  SiPocketbase,
  SiPython,
  SiReact,
  SiSvelte,
  SiTypescript,
  SiUbuntu,
  SiVercel
} from 'react-icons/si';

export default function Orbit() {
  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-gray-50 via-white to-blue-50/30 md:shadow-xl dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20'>
      {/* Clean background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[24px_24px] opacity-20' />

      {/* Orbit paths - simple dashed circles */}
      <div className='pointer-events-none absolute inset-0'>
        {[50, 100, 150, 200].map((radius) => (
          <div
            key={radius}
            className='absolute top-1/2 left-1/2 rounded-full border border-dashed border-blue-400/30'
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              marginLeft: `-${radius}px`,
              marginTop: `-${radius}px`
            }}
          />
        ))}
      </div>

      {/* Center GitHub icon */}
      <div className='relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800'>
        <Icons.gitHub />
      </div>

      {/* Orbiting icons - PERFECT 180° separation on each orbit */}

      {/* Inner orbit (50px) - React at 0°, Next.js at 180° */}
      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={20}
        delay={0}
        radius={50}>
        <Icons.react />
      </OrbitingCircles>

      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={20}
        delay={-10}
        radius={50}>
        <Icons.nextjs />
      </OrbitingCircles>

      {/* Second orbit (100px) - TypeScript at 0°, Python at 180°, reverse direction */}
      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={30}
        delay={0}
        radius={100}
        reverse>
        <Icons.typescript />
      </OrbitingCircles>

      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={30}
        delay={-15}
        radius={100}
        reverse>
        <Icons.python />
      </OrbitingCircles>

      {/* Third orbit (150px) - Docker at 0°, Vercel at 180° */}
      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={40}
        delay={0}
        radius={150}>
        <Icons.docker />
      </OrbitingCircles>

      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={40}
        delay={-20}
        radius={150}>
        <Icons.vercel />
      </OrbitingCircles>

      {/* Outer orbit (200px) - OpenAI at 0°, FastAPI at 180°, reverse direction */}
      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={50}
        delay={0}
        radius={200}
        reverse>
        <Icons.openai />
      </OrbitingCircles>

      <OrbitingCircles
        className='h-8 w-8 border-none bg-white shadow-lg dark:bg-gray-800'
        duration={50}
        delay={-25}
        radius={200}
        reverse>
        <Icons.fastapi />
      </OrbitingCircles>
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
