import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages are prerendered at build time; in dev the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

if (import.meta.env.PROD) {
  console.log(
    '%cVICE.DEV%c  ¿Curioseando el código? Pulsa la tecla ` para abrir la terminal.',
    'font:900 16px sans-serif;color:#ff4fd8',
    'color:#00e5ff',
  );
}
