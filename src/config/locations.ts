export type LocationId = 'ocean-drive' | 'downtown' | 'garage' | 'arcade' | 'nightclub';

export interface CityLocation {
  id: LocationId;
  index: string;
  place: string; // name of the place in the city
  section: string; // professional section
  path: string;
  teaser: string;
  accent: string; // CSS color token
}

/** The five places of the city. Order = map order = menu order. */
export const locations: CityLocation[] = [
  { id: 'ocean-drive', index: '01', place: 'Ocean Drive', section: 'About me', path: '/about', teaser: 'Quién soy y qué tipo de desarrollador soy.', accent: 'var(--c-pink)' },
  { id: 'downtown', index: '02', place: 'Downtown', section: 'Experience', path: '/experience', teaser: 'Ayesa, Babel y lo que hago cada día.', accent: 'var(--c-cyan)' },
  { id: 'garage', index: '03', place: 'Software Garage', section: 'Projects', path: '/projects', teaser: 'Proyectos reales expuestos como en un showroom.', accent: 'var(--c-orange)' },
  { id: 'arcade', index: '04', place: 'Arcade', section: 'Skills & Experiments', path: '/skills', teaser: 'Habilidades desbloqueadas, sin porcentajes inventados.', accent: 'var(--c-lime)' },
  { id: 'nightclub', index: '05', place: 'Night Club', section: 'Contact', path: '/contact', teaser: 'Abierto hasta tarde para nuevas oportunidades.', accent: 'var(--c-violet)' },
];

export const locationByPath = (pathname: string) =>
  locations.find((l) => pathname === l.path || pathname.startsWith(`${l.path}/`));
