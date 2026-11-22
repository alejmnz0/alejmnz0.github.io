import { useCallback, useSyncExternalStore } from 'react';
import { store } from '../lib/events';

export type Scene = 'sunset' | 'night';
const KEY = 'vice:scene';
const listeners = new Set<() => void>();

const read = (): Scene => (document.documentElement.dataset.scene === 'night' ? 'night' : 'sunset');

/** Day/night mode for the city. index.html applies the stored value before paint. */
export function useScene() {
  const scene = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => 'sunset' as Scene,
  );
  const toggle = useCallback(() => {
    const next: Scene = read() === 'night' ? 'sunset' : 'night';
    document.documentElement.dataset.scene = next;
    store.set(KEY, next);
    listeners.forEach((l) => l());
  }, []);
  return { scene, toggle };
}
