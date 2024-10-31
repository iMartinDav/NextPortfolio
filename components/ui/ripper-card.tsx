import Ripple from '@/components/magicui/ripple';

export function RippleCard() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl'>
      <p className='z-10 whitespace-pre-wrap p-5 text-center text-5xl font-medium tracking-tighter text-card-foreground'>
        BioCode
      </p>
      <Ripple />
    </div>
  );
}
