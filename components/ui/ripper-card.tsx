import Ripple from '@/components/magicui/ripple';

export function RippleCard() {
  return (
    <div className='bg-background relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl'>
      <div className='relative z-10 flex flex-col items-center justify-center'>
        <p className='text-card-foreground text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap'>
          BioCode
        </p>
      </div>
      <Ripple />
    </div>
  );
}
