import dynamic from 'next/dynamic';

const IconCloud = dynamic(() => import('@/components/magicui/icon-cloud'), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-full bg-slate-200/20 dark:bg-slate-800/20" />
});

const slugs = [
  'amazonwebservices',
  'apache',
  'apple',
  'archlinux',
  'astro',
  'nextflow',
  'bitcoin',
  'digitalocean',
  'django',
  'docker',
  'drizzle',
  'ethereum',
  'firebase',
  'freebsd',
  'git',
  'github',
  'gitlab',
  'graphql',
  'huggingface',
  'jira',
  'javascript',
  'kalilinux',
  'linux',
  'akamai',
  'mongodb',
  'mysql',
  'nextdotjs',
  'nginx',
  'nodedotjs',
  'numpy',
  'openai',
  'pandas',
  'pocketbase',
  'postgresql',
  'prisma',
  'python',
  'pytorch',
  'react',
  'redis',
  'solana',
  'square',
  'stripe',
  'svelte',
  'tailwindcss',
  'tensorflow',
  'typescript',
  'ubuntu',
  'vercel',
  'zod'
];

interface TechnologiesProps {
  liveLinks?: boolean;
}

export default function Technologies({ liveLinks = false }: TechnologiesProps) {
  return (
    <div className=''>
      <IconCloud
        iconSlugs={slugs}
        liveLinks={liveLinks}
      />
    </div>
  );
}
