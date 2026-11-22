import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';

/** Used only at build time by scripts/prerender.mjs to produce static HTML per route. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export { routeMeta, site } from './config/site';
export { profile } from './data/profile';
export { experience } from './data/experience';
export { education } from './data/education';
export { social } from './data/social';
