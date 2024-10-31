'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
      media.addEventListener('change', listener);

      return () => media.removeEventListener('change', listener);
    }
    return undefined;
  }, [query]);

  return matches;
}
