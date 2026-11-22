import { useSyncExternalStore } from 'react';

/** SSR-safe media query hook. `serverValue` is what prerendered HTML assumes. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
