import { cn } from '@/lib/utils';

export default function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute h-full w-full overflow-hidden opacity-50 perspective-[200px]',
        className
      )}>
      {/* Grid */}
      <div className='absolute inset-0 [transform:rotateX(75deg)]'>
        <div
          className={cn(
            'animate-grid',

            'bg-repeat bg-size-[60px_60px] h-[300vh] inset-[0%_0px] ml-[-50%] origin-[100%_0_0] w-[600vw]',

            // Light Styles
            'bg-[linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]',

            // Dark styles
            'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]'
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className='absolute inset-0 bg-linear-to-t from-background to-transparent to-90% dark:from-background' />
    </div>
  );
}
