import type { Education } from './types';

// Source: CV + LinkedIn (dates from LinkedIn, consistent with CV "2022 – 2024").
export const education: Education[] = [
  {
    id: 'dam',
    title: 'CFGS Desarrollo de Aplicaciones Multiplataforma',
    school: 'Salesianos San Pedro (Triana)',
    location: 'Sevilla',
    start: { year: 2022, month: 9 },
    end: { year: 2024, month: 5 },
    topics: [
      'Java y Spring Boot, APIs en Python, React y Angular.',
      'Bases de datos SQL (PostgreSQL, Oracle, MariaDB) y entornos con Docker.',
    ],
  },
];
