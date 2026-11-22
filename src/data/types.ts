/**
 * Shared types for every piece of professional data rendered by the site.
 * Edit the data files next to this one — components only read from them.
 */

export type MonthYear = { year: number; month: number }; // month: 1–12

export interface Profile {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string; // short role, used in the intro + SEO
  headline: string; // role line shown in About
  stackLine: string[]; // core stack shown under the headline
  location: string;
  /** Optional portrait. Put the file in /public and set e.g. '/img/me.webp'. null = neon monogram. */
  photo: string | null;
  monogram: string;
  tagline: string;
  pitch: string; // one-paragraph summary (SEO description + Contact)
  bio: string[]; // About paragraphs
  focus: { title: string; text: string }[]; // what problems I solve
  spokenLanguages: { name: string; level: string }[];
  extras: string[];
  cv: { href: string; fileName: string; updated: string };
  openTo: string;
}

export interface ExperienceGroup {
  title: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  start: MonthYear;
  end: MonthYear | null; // null = present
  context: string; // clients / domain
  note?: string;
  groups: ExperienceGroup[];
  highlights: string[]; // confirmed achievements only
  tech: string[];
}

export type ProjectStatus = 'active' | 'completed' | 'academic' | 'experiment';
export type ProjectCategory = 'Desktop' | 'Full Stack' | 'Mobile' | 'Web' | 'Game';

export interface Project {
  id: string;
  name: string;
  plate: string; // licence-plate code shown in the garage
  year: number;
  category: ProjectCategory;
  status: ProjectStatus;
  featured?: boolean;
  tagline: string;
  description: string;
  problem: string;
  role: string;
  features: string[];
  architecture?: { summary: string; layers: { name: string; detail: string }[] };
  tech: string[];
  repo: string;
  demo?: string;
  images: { src: string; alt: string }[];
  hue: number; // accent hue for generated cover art
}

export type SkillCategory = 'Backend' | 'Frontend' | 'Databases' | 'DevOps' | 'Tools' | 'Languages';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Short, honest note on how it has been used. */
  note?: string;
}

export interface Education {
  id: string;
  title: string;
  school: string;
  location: string;
  start: MonthYear;
  end: MonthYear;
  topics: string[];
}

export interface SocialLink {
  id: 'email' | 'github' | 'linkedin';
  label: string;
  href: string;
  display: string;
}
