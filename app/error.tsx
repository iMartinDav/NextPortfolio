'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('Global Error Caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-sm max-w-md w-full">
        <div className="rounded-full bg-red-500/20 p-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-red-500 dark:text-red-400">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground text-sm">
            We encountered an unexpected error while rendering this page.
          </p>
        </div>

        <Button
          onClick={() => reset()}
          variant="outline"
          className="w-full gap-2 border-red-500/20 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
