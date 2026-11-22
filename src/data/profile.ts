import type { Profile } from './types';

// Source: CV (Nov 2026) + LinkedIn export. Phone intentionally not shown on the web.
export const profile: Profile = {
  firstName: 'Alejandro',
  lastName: 'Jiménez Fernández',
  fullName: 'Alejandro Jiménez Fernández',
  role: 'Full Stack Developer',
  headline: 'Desarrollador Full Stack · orientado a backend',
  stackLine: ['Node.js', 'NestJS', 'Java / Spring Boot', 'Angular', 'Docker', 'Linux'],
  location: 'Sevilla, España',
  photo: null,
  monogram: 'AJ',
  tagline: 'Software engineering meets the 80s.',
  pitch:
    'Desarrollador Full Stack en Sevilla, orientado a backend: microservicios y APIs REST con Node.js/NestJS y Java/Spring Boot, frontend con Angular y React, y despliegue y operación de servicios con Docker y PM2 en servidores Linux.',
  bio: [
    'Soy desarrollador Full Stack en Sevilla y el backend es mi terreno natural. En Ayesa desarrollo y mantengo microservicios con Node.js y NestJS, integro APIs externas y de terceros, y despliego con Docker y PM2 en servidores Linux, en sistemas empresariales para clientes como Endesa, Redexis o la Región de Murcia.',
    'Antes, en Babel, trabajé con Java y Spring Boot y construí interfaces en React y TypeScript para clientes de banca (Unicaja) y seguros (AXA), además de refactorizar código legacy para hacerlo más rápido y fácil de mantener.',
    'Me gusta cubrir el ciclo completo: entender el requisito, estimarlo, programarlo, desplegarlo y seguirlo en los logs hasta que todo funciona. Y cuando un proceso manual se repite, lo automatizo: algunos de mis scripts y tareas programadas ahorran entre una y dos horas diarias de trabajo.',
  ],
  focus: [
    { title: 'Microservicios y APIs', text: 'Servicios REST con NestJS y Spring Boot, pensados para mantenerse y evolucionar.' },
    { title: 'Integraciones', text: 'Consumo de APIs de terceros y automatización de procesos entre plataformas empresariales.' },
    { title: 'Despliegue y operación', text: 'Docker, Docker Compose y PM2 en Linux; análisis de logs y resolución de incidencias.' },
    { title: 'Automatización y datos', text: 'Scripts, cron, SQL complejo sobre MariaDB e informes automatizados con Python.' },
    { title: 'Interfaces web', text: 'Aplicaciones en Angular y React con TypeScript; prototipado en Figma.' },
    { title: 'Análisis técnico', text: 'Requisitos, estimaciones, cotizaciones y documentación de propuestas de solución.' },
  ],
  spokenLanguages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio (B1–B2)' },
  ],
  extras: ['Carné de conducir B · vehículo propio'],
  cv: {
    href: '/cv/CV_Alejandro_Jimenez_Fernandez.pdf',
    fileName: 'CV_Alejandro_Jimenez_Fernandez.pdf',
    updated: '2026-11',
  },
  openTo:
    'Abierto a oportunidades como desarrollador Full Stack o Backend y a colaboraciones en proyectos con buen criterio técnico.',
};
