import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-lightBackground dark:bg-darkBackground transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600 dark:text-purple-400" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading content...
        </p>
      </div>
    </div>
  );
}
