import type { Experience } from './types';

// Source: CV. Titles and dates confirmed by Alejandro (CV wins over LinkedIn).
export const experience: Experience[] = [
  {
    id: 'ayesa',
    company: 'Ayesa',
    role: 'Desarrollador Full Stack',
    location: 'Sevilla',
    start: { year: 2026, month: 2 },
    end: null,
    context: 'Sistemas empresariales para clientes como Endesa, Redexis y la Región de Murcia.',
    groups: [
      {
        title: 'Backend y frontend',
        items: [
          'Desarrollo y mantenimiento de microservicios con Node.js y NestJS.',
          'Integración y consumo de APIs REST, incluidas APIs externas y de terceros.',
          'Mantenimiento y evolución de aplicaciones web en Angular.',
        ],
      },
      {
        title: 'Infraestructura y operación',
        items: [
          'Despliegue de aplicaciones con Docker y Docker Compose en servidores Linux.',
          'Supervisión de procesos con PM2 y configuración de servicios en varios entornos.',
          'Análisis de logs, diagnóstico de errores y resolución de incidencias.',
        ],
      },
      {
        title: 'Automatización y datos',
        items: [
          'Scripts y tareas programadas (cron) para automatizar procesos.',
          'Integración y automatización de procesos entre plataformas empresariales.',
          'Consultas SQL complejas sobre MariaDB e informes automatizados con Python y Excel.',
        ],
      },
      {
        title: 'Análisis y preventa',
        items: [
          'Análisis de requisitos, estimaciones técnicas y cotizaciones para clientes.',
          'Documentación técnica y propuestas de solución.',
        ],
      },
    ],
    highlights: ['Automatizaciones con scripts y cron que ahorran 1–2 horas diarias de trabajo manual en algunos procesos.'],
    tech: ['Node.js', 'NestJS', 'TypeScript', 'Angular', 'Docker', 'Linux', 'PM2', 'MariaDB', 'Python'],
  },
  {
    id: 'babel',
    company: 'Babel',
    role: 'Ingeniero de Software (Full Stack)',
    location: 'Sevilla',
    start: { year: 2024, month: 4 },
    end: { year: 2025, month: 8 },
    context: 'Clientes Unicaja (banca) y AXA (seguros).',
    note: 'Incluye las prácticas del ciclo formativo (abr. – jun. 2024).',
    groups: [
      {
        title: 'Desarrollo',
        items: [
          'Desarrollo de backend con Java y Spring Boot.',
          'Desarrollo de interfaces con React, TypeScript, HTML y CSS; prototipado en Figma.',
          'Refactorización de código legacy para mejorar rendimiento y mantenibilidad.',
        ],
      },
      {
        title: 'Equipo',
        items: ['Trabajo en equipos multidisciplinares con metodologías ágiles y Git.'],
      },
    ],
    highlights: [],
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript', 'HTML', 'CSS', 'Git', 'Figma'],
  },
];
