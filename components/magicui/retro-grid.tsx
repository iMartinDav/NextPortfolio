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

            'inset-[0%_0px] ml-[-50%] h-[300vh] w-[600vw] origin-[100%_0_0] bg-size-[60px_60px] bg-repeat',

            // Light Styles
            'bg-[linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]',

            // Dark styles
            'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]'
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className='from-background dark:from-background absolute inset-0 bg-linear-to-t to-transparent to-90%' />
    </div>
  );
}
