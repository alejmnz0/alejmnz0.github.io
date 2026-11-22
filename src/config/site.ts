import { profile } from '../data/profile';

export const SITE_URL = 'https://alejmnz0.github.io';

export const site = {
  name: 'VICE.DEV',
  url: SITE_URL,
  locale: 'es_ES',
  ogImage: `${SITE_URL}/og-image.jpg`,
  title: `${profile.fullName} — Full Stack Developer`,
  description: profile.pitch,
};
