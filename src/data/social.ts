import type { SocialLink } from './types';

export const EMAIL = 'desarrolladorjimenez@gmail.com';
export const GITHUB_USER = 'alejmnz0';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/alejandro-jim%C3%A9nez-fern%C3%A1ndez-877555256/';

export const social: SocialLink[] = [
  { id: 'email', label: 'Email', href: `mailto:${EMAIL}`, display: EMAIL },
  { id: 'github', label: 'GitHub', href: `https://github.com/${GITHUB_USER}`, display: `github.com/${GITHUB_USER}` },
  { id: 'linkedin', label: 'LinkedIn', href: LINKEDIN_URL, display: 'in/alejandro-jiménez-fernández' },
];
