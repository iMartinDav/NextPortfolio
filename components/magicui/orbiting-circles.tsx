import { cn } from '@/lib/utils';

// Simple, clean orbit path component - one circle per orbit
export function OrbitPath({ radius }: { radius: number }) {
  return (
    <circle
      className='stroke-blue-400/30 dark:stroke-blue-300/40'
      cx='50%'
      cy='50%'
      r={radius}
      fill='none'
      strokeWidth='1'
      strokeDasharray='4 8'
      style={{
        opacity: 0.6,
        filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))'
      }}
    />
  );
}

// Clean OrbitingCircles component with proper circular motion
export default function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 0,
  radius = 50
}: {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
}) {
  return (
    <div
      style={
        {
          '--duration': duration,
          '--radius': radius,
          '--delay': delay
        } as React.CSSProperties
      }
      className={cn(
        'absolute flex h-full w-full transform-gpu animate-orbit items-center justify-center rounded-full border-none bg-none [animation-delay:calc(var(--delay)*1s)] dark:bg-none',
        'hover:scale-110 transition-transform duration-300 ease-out',
        'group cursor-pointer',
        { '[animation-direction:reverse]': reverse },
        className
      )}>

      {/* Clean icon container */}
      <div className="relative transform transition-all duration-300 ease-out group-hover:scale-125">
        {/* Subtle glow background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-md group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-300" />

        {/* Icon container */}
        <div className="relative z-10 rounded-full bg-white/95 dark:bg-gray-800/95 p-2.5 shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-600/40 transition-all duration-300 group-hover:shadow-blue-500/20 group-hover:border-blue-300/50 dark:group-hover:border-blue-500/50">
          <div className="relative z-20 transition-all duration-300 group-hover:scale-110">
            {children}
          </div>
        </div>

        {/* Simple pulse ring */}
        <div className="absolute inset-0 rounded-full border border-blue-400/30 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"
             style={{ animationDuration: '2s' }} />
      </div>
    </div>
  );
}
