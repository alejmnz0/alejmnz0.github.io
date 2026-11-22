import { ArrowUpRight } from 'lucide-react';
import { GithubIcon, StripedSun } from '../components/Art';
import { SectionHead } from '../components/SectionHead';
import { projects } from '../data/projects';
import type { Project, ProjectStatus } from '../data/types';
import s from './Projects.module.css';

const STATUS: Record<ProjectStatus, string> = {
  active: 'En desarrollo',
  completed: 'Terminado',
  academic: 'Académico',
  experiment: 'Experimento',
};

const initials = (name: string) => (name.match(/[A-Z0-9]/g) ?? [name[0]]).slice(0, 2).join('');

function Cover({ p }: { p: Project }) {
  return (
    <div className={s.cover} style={{ '--h': p.hue } as React.CSSProperties} aria-hidden="true">
      <StripedSun className={s.coverSun} id={`sun-${p.id}`} />
      <span className={s.coverInitials}>{initials(p.name)}</span>
      <span className={s.coverGrid} />
    </div>
  );
}

export function Projects() {
  const [featured, ...rest] = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <section className={s.section} aria-labelledby="proj-title" id="projects">
      <div className={s.inner}>
        <SectionHead index="03 · Software Garage" title="Projects" id="proj-title" accent="var(--orange)">
          <p>Proyectos reales de mi GitHub, con su estado tal cual: lo que está en marcha, lo académico y los experimentos.</p>
        </SectionHead>

        <article className={s.featured}>
          <a href={featured.repo} target="_blank" rel="noopener noreferrer" className={s.shot} data-reveal="tilt">
            {featured.images[0] ? (
              <img src={featured.images[0].src} alt={featured.images[0].alt} width="1280" height="800" loading="lazy" decoding="async" />
            ) : (
              <Cover p={featured} />
            )}
          </a>
          <div className={s.featuredText} data-reveal="right">
            <p className={s.meta}>
              <span className={s.status} data-status={featured.status}>
                {STATUS[featured.status]}
              </span>
              {featured.category} · {featured.year}
            </p>
            <h3 className={s.featuredName}>{featured.name}</h3>
            <p className={s.tagline}>{featured.tagline}</p>
            <p className={s.desc}>{featured.problem}</p>
            <ul className={s.features}>
              {featured.features.slice(0, 4).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <ul className={s.tech} aria-label="Tecnologías">
              {featured.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a href={featured.repo} target="_blank" rel="noopener noreferrer" className={s.repo}>
              <GithubIcon size={18} /> Ver repositorio <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </article>

        <ul className={s.grid}>
          {rest.map((p, i) => (
            <li key={p.id} data-reveal="up" style={{ '--d': i % 3 } as React.CSSProperties}>
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className={s.card}>
                {p.images[0] ? <img src={p.images[0].src} alt="" className={s.cardImg} loading="lazy" /> : <Cover p={p} />}
                <div className={s.cardBody}>
                  <p className={s.meta}>
                    <span className={s.status} data-status={p.status}>
                      {STATUS[p.status]}
                    </span>
                    {p.year}
                  </p>
                  <h3 className={s.cardName}>
                    {p.name}
                    <ArrowUpRight className={s.arrow} aria-hidden="true" />
                  </h3>
                  <p className={s.cardText}>{p.tagline}</p>
                  <p className={s.cardTech}>{p.tech.slice(0, 5).join(' · ')}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
