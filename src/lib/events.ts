/** Tiny app-wide events so deep components can open global overlays. */
export const TERMINAL_EVENT = 'vice:terminal';

export const openTerminal = () => window.dispatchEvent(new CustomEvent(TERMINAL_EVENT));

/** Safe storage helpers: private mode / blocked storage must never break the UI. */
export const store = {
  get(key: string, kind: 'local' | 'session' = 'local') {
    try {
      return (kind === 'local' ? localStorage : sessionStorage).getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string, kind: 'local' | 'session' = 'local') {
    try {
      (kind === 'local' ? localStorage : sessionStorage).setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};
