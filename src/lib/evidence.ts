import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { education } from '../data/education';

export interface Evidence {
  kind: 'work' | 'project' | 'study' | 'site';
  label: string;
  to: string;
}

/** Aliases so a skill matches tech tags written slightly differently. */
const ALIASES: Record<string, string[]> = {
  'APIs REST': ['APIs REST', 'Spring Boot', 'NestJS', 'Express'],
  Microservicios: ['NestJS'],
  SQL: ['MariaDB', 'PostgreSQL', 'Oracle', 'H2', 'SQLite'],
  GitHub: ['GitHub'],
  'GitHub Actions': [],
};

/** Skills confirmed by the CV even when no single job/project lists them as a tag. */
const CV_ONLY: Record<string, Evidence[]> = {
  Express: [{ kind: 'work', label: 'CV · Backend', to: '/about' }],
  Oracle: [{ kind: 'study', label: 'CFGS DAM', to: '/about' }],
  MongoDB: [{ kind: 'work', label: 'CV · Bases de datos', to: '/about' }],
  'Docker Compose': [{ kind: 'work', label: 'Ayesa', to: '/experience' }],
  cron: [{ kind: 'work', label: 'Ayesa', to: '/experience' }],
  Microservicios: [],
  Bitbucket: [{ kind: 'work', label: 'CV · Herramientas', to: '/about' }],
  Jira: [{ kind: 'work', label: 'CV · Herramientas', to: '/about' }],
  DBeaver: [{ kind: 'work', label: 'CV · Herramientas', to: '/about' }],
  JUnit: [{ kind: 'work', label: 'CV · Herramientas', to: '/about' }],
  GitHub: [{ kind: 'work', label: 'CV · Herramientas', to: '/about' }],
  'GitHub Actions': [{ kind: 'site', label: 'Este portfolio', to: '/' }],
  SQL: [],
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]/g, '');

export function evidenceFor(skill: string): Evidence[] {
  const keys = new Set([skill, ...(ALIASES[skill] ?? [])].map(norm));
  const hit = (tags: string[]) => tags.some((t) => keys.has(norm(t)));
  const out: Evidence[] = [];

  for (const e of experience) if (hit(e.tech)) out.push({ kind: 'work', label: e.company, to: '/experience' });
  for (const ed of education) {
    if (ed.topics.some((t) => [...keys].some((k) => norm(t).includes(k)))) out.push({ kind: 'study', label: 'CFGS DAM', to: '/about' });
  }
  for (const p of projects) if (hit(p.tech)) out.push({ kind: 'project', label: p.name, to: `/projects#${p.id}` });
  for (const extra of CV_ONLY[skill] ?? []) if (!out.some((o) => o.label === extra.label)) out.push(extra);

  return out;
}
