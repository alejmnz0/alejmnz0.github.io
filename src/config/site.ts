import { profile } from '../data/profile';

export const SITE_URL = 'https://alejmnz0.github.io';

export const site = {
  name: 'VICE.DEV',
  subtitle: 'A Developer After Dark',
  url: SITE_URL,
  locale: 'es_ES',
  lang: 'es',
  ogImage: `${SITE_URL}/og-image.jpg`,
  themeColor: '#080812',
  defaultTitle: `${profile.fullName} — Full Stack Developer · VICE.DEV`,
  defaultDescription: profile.pitch,
};

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

/** One entry per prerendered page. Used by <PageMeta>, prerender, sitemap. */
export const routeMeta: RouteMeta[] = [
  { path: '/', title: site.defaultTitle, description: site.defaultDescription },
  {
    path: '/about/',
    title: `Sobre mí · ${profile.fullName} — VICE.DEV`,
    description: `Quién es ${profile.fullName}: desarrollador Full Stack en Sevilla orientado a backend con Node.js, NestJS, Spring Boot, Angular y Docker.`,
  },
  {
    path: '/experience/',
    title: `Experiencia · ${profile.fullName} — VICE.DEV`,
    description: 'Experiencia profesional en Ayesa y Babel: microservicios NestJS, Spring Boot, Angular, React, Docker, PM2 y automatización.',
  },
  {
    path: '/projects/',
    title: `Proyectos · ${profile.fullName} — VICE.DEV`,
    description: 'Proyectos reales: Gestor de Horas (Electron + React), Fiya, GradesDocker, CineJava y más, con arquitectura y tecnologías.',
  },
  {
    path: '/skills/',
    title: `Skills · ${profile.fullName} — VICE.DEV`,
    description: 'Tecnologías backend, frontend, bases de datos, DevOps y herramientas, con dónde se han usado de verdad.',
  },
  {
    path: '/contact/',
    title: `Contacto · ${profile.fullName} — VICE.DEV`,
    description: `Contacta con ${profile.fullName} para oportunidades como desarrollador Full Stack o Backend.`,
  },
];

export const metaFor = (pathname: string): RouteMeta => {
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return routeMeta.find((r) => r.path === p) ?? routeMeta[0];
};
