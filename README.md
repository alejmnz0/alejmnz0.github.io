# VICE.DEV — Alejandro Jiménez Fernández

Portfolio de **Alejandro Jiménez Fernández**, desarrollador Full Stack en Sevilla.
Una sola página para recorrer con scroll, con estética Miami de los 80: atardecer de rayas, rejilla de neón, palmeras y letreros luminosos.

**🌴 https://alejmnz0.github.io/**

![VICE.DEV](public/og-image.jpg)

## Qué hay dentro

Hero → About → Experience → Projects → Skills → Contact, en una sola página.

- **Tipografía**: [Big Shoulders Display](https://fonts.google.com/specimen/Big+Shoulders+Display) (condensada, estilo rótulo art déco) para los titulares, [Tilt Neon](https://fonts.google.com/specimen/Tilt+Neon) (dibujada como tubos de neón) para los letreros y Manrope para leer. Autoalojadas con Fontsource.
- **Animaciones** (todas en CSS, sin librerías):
  - letras del nombre que caen una a una, apellido que se dibuja en contorno y letrero de neón que parpadea al encenderse;
  - sol que se hunde y texto que sube al hacer scroll, rejilla que avanza sin parar, palmeras que se mecen;
  - cintas inclinadas con tecnologías que se cruzan en direcciones opuestas;
  - títulos que se revelan como un barrido, la frase de presentación se ilumina palabra a palabra, tarjetas y chips que entran escalonados.
- Respeta `prefers-reduced-motion`: sin movimiento, todo visible.
- Navegación fija con la sección activa resaltada; menú desplegable en móvil.

## Stack

React 19 + TypeScript + Vite, CSS Modules y lucide-react. La página se **prerenderiza** a HTML estático en el build (`scripts/prerender.mjs`): buscadores y vistas previas de LinkedIn ven todo el contenido, y React solo hidrata. Pruebas con Playwright.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # TypeScript + ESLint
npm run build      # build + prerender → dist/
npm run preview    # sirve dist/ en http://localhost:4173
npm test           # Playwright (la primera vez: npx playwright install chromium)
```

## Cambiar el contenido

Todo está en **`src/data/`**:

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, titular, bio, especialización, idiomas, CV | `src/data/profile.ts` |
| Experiencia | `src/data/experience.ts` |
| Proyectos | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Formación | `src/data/education.ts` |
| Email, GitHub, LinkedIn | `src/data/social.ts` |
| Título y descripción SEO | `src/config/site.ts` |

**Añadir un proyecto**: copia un objeto en `projects.ts` (con `id` único). Con `featured: true` aparece en grande arriba. Para una captura, guarda un WebP de ~1280 px en `public/projects/` y añádelo a `images`; sin captura se genera una portada con el color `hue`.

**Actualizar el CV**: reemplaza `public/cv/CV_Alejandro_Jimenez_Fernandez.pdf` (mismo nombre) y cambia `cv.updated` en `profile.ts`.

**Imagen para compartir**: con `npm run preview` en marcha, `node scripts/og-image.mjs` regenera `public/og-image.jpg` a partir del hero.

## Publicar

Push a `main`. GitHub Actions comprueba tipos y lint, compila, ejecuta Playwright y, si todo pasa, publica en GitHub Pages. Si algo falla no se publica nada.

Las URLs antiguas (`/about/`, `/projects/`…) redirigen a su sección (`/#about`…).

## Datos

El contenido sale del CV, LinkedIn y los repos públicos; ver [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md). Diseño e ilustraciones originales; no usa recursos de ningún videojuego.
