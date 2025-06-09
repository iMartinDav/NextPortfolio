import Ripple from '@/components/magicui/ripple';

export function RippleCard() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl'>
      <div className='relative z-10 flex flex-col items-center justify-center'>
        <p className='whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-card-foreground'>
          BioCode
        </p>
      </div>
      <Ripple />
    </div>
  );
}
