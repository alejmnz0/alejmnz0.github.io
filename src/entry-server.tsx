import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/** Used only at build time by scripts/prerender.mjs to produce static HTML. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export { site } from './config/site';
export { profile } from './data/profile';
export { experience } from './data/experience';
export { education } from './data/education';
export { social } from './data/social';
