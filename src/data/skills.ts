import type { Skill, SkillCategory } from './types';

/**
 * Skills shown in the Arcade. No percentages: each skill's "used in" list is
 * computed from experience.ts and projects.ts (see src/lib/evidence.ts), so the
 * evidence stays in sync with the real data.
 */
export const skillCategories: { id: SkillCategory; label: string; blurb: string }[] = [
  { id: 'Backend', label: 'Backend', blurb: 'Servicios, APIs y lógica de negocio.' },
  { id: 'Frontend', label: 'Frontend', blurb: 'Interfaces web, escritorio y móvil.' },
  { id: 'Databases', label: 'Databases', blurb: 'Modelado y consultas SQL / NoSQL.' },
  { id: 'DevOps', label: 'DevOps', blurb: 'Contenedores, servidores y automatización.' },
  { id: 'Tools', label: 'Tools', blurb: 'Control de versiones, gestión y testing.' },
  { id: 'Languages', label: 'Languages', blurb: 'Lenguajes de programación y marcado.' },
];

export const skills: Skill[] = [
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'NestJS', category: 'Backend', note: 'Microservicios en producción.' },
  { name: 'Express', category: 'Backend' },
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'Spring Security', category: 'Backend', note: 'Roles y autenticación JWT.' },
  { name: 'APIs REST', category: 'Backend' },
  { name: 'Microservicios', category: 'Backend' },
  // Frontend
  { name: 'Angular', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Electron', category: 'Frontend', note: 'App de escritorio para Windows y Linux.' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Thymeleaf', category: 'Frontend' },
  { name: 'Flutter', category: 'Frontend', note: 'App móvil con BLoC.' },
  // Databases
  { name: 'MariaDB', category: 'Databases', note: 'Consultas SQL complejas e informes.' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'Oracle', category: 'Databases' },
  { name: 'MongoDB', category: 'Databases' },
  { name: 'SQLite', category: 'Databases' },
  // DevOps
  { name: 'Docker', category: 'DevOps' },
  { name: 'Docker Compose', category: 'DevOps' },
  { name: 'Linux', category: 'DevOps' },
  { name: 'PM2', category: 'DevOps' },
  { name: 'cron', category: 'DevOps', note: 'Tareas programadas que ahorran 1–2 h diarias.' },
  { name: 'GitHub Actions', category: 'DevOps', note: 'CI/CD de este portfolio.' },
  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'Bitbucket', category: 'Tools' },
  { name: 'Jira', category: 'Tools' },
  { name: 'DBeaver', category: 'Tools' },
  { name: 'JUnit', category: 'Tools' },
  { name: 'Vitest', category: 'Tools' },
  { name: 'Playwright', category: 'Tools' },
  { name: 'Figma', category: 'Tools' },
  // Languages
  { name: 'Java', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'HTML', category: 'Languages' },
  { name: 'CSS', category: 'Languages' },
  { name: 'Dart', category: 'Languages' },
];
