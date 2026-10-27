'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * `false` on the server and during hydration, `true` afterwards.
 * Replaces the `useState(false)` + `useEffect(() => setMounted(true))` pattern
 * without the extra cascading render.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
