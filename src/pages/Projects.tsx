import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Layers, X } from 'lucide-react';
import { SectionShell } from '../components/layout/SectionShell';
import { ProjectCover } from '../components/projects/ProjectCover';
import { Chips } from '../components/ui/Chips';
import { GithubIcon } from '../components/ui/icons';
import u from '../components/ui/ui.module.css';
import { projects } from '../data/projects';
import type { Project, ProjectStatus } from '../data/types';
import s from './Projects.module.css';

const STATUS: Record<ProjectStatus, string> = {
  active: 'En desarrollo activo',
  completed: 'Terminado',
  academic: 'Proyecto académico',
  experiment: 'Experimento',
};

const categories = ['Todos', ...Array.from(new Set(projects.map((p) => p.category)))];
const techCounts = projects.flatMap((p) => p.tech).reduce<Record<string, number>>((acc, t) => ((acc[t] = (acc[t] ?? 0) + 1), acc), {});
const techs = Object.entries(techCounts)
  .filter(([, n]) => n >= 2)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([t]) => t);

function Media({ p, eager }: { p: Project; eager?: boolean }) {
  if (p.images[0])
    return (
      <img
        src={p.images[0].src}
        alt={p.images[0].alt}
        width="1280"
        height="800"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={s.img}
      />
    );
  return <ProjectCover project={p} className={s.img} />;
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    const d = ref.current!;
    if (!d.open) d.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby="pd-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
    >
      <div className={s.sheet} style={{ '--hue': project.hue } as React.CSSProperties}>
        <button type="button" className={s.close} onClick={() => ref.current?.close()} aria-label="Cerrar ficha">
          <X size={22} />
        </button>
        <div className={s.sheetMedia}>
          {project.images.length ? (
            <>
              <img src={project.images[shot].src} alt={project.images[shot].alt} width="1280" height="800" decoding="async" className={s.img} />
              {project.images.length > 1 && (
                <div className={s.thumbs} role="group" aria-label="Capturas">
                  {project.images.map((im, i) => (
                    <button key={im.src} type="button" onClick={() => setShot(i)} aria-pressed={i === shot} aria-label={`Captura ${i + 1}: ${im.alt}`}>
                      <img src={im.src} alt="" width="128" height="80" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <ProjectCover project={project} className={s.img} />
          )}
        </div>

        <div className={s.sheetBody}>
          <p className={s.plateRow}>
            <span className={s.plate}>{project.plate}</span>
            <span className={s.status} data-status={project.status}>
              {STATUS[project.status]}
            </span>
            <span className={s.meta}>
              {project.category} · {project.year}
            </span>
          </p>
          <h2 id="pd-title" className={s.sheetTitle}>
            {project.name}
          </h2>
          <p className={s.sheetTag}>{project.tagline}</p>

          <div className={s.specs}>
            <section>
              <h3>Qué es</h3>
              <p>{project.description}</p>
            </section>
            <section>
              <h3>Problema que resuelve</h3>
              <p>{project.problem}</p>
            </section>
            <section>
              <h3>Mi participación</h3>
              <p>{project.role}</p>
            </section>
          </div>

          <section className={s.block}>
            <h3>Características</h3>
            <ul className={s.features}>
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          {project.architecture && (
            <section className={s.block}>
              <h3>
                <Layers size={16} aria-hidden="true" /> Arquitectura
              </h3>
              <p className={s.archSummary}>{project.architecture.summary}</p>
              <ol className={s.arch}>
                {project.architecture.layers.map((l) => (
                  <li key={l.name}>
                    <strong>{l.name}</strong>
                    <span>{l.detail}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className={s.block}>
            <h3>Tecnologías</h3>
            <Chips items={project.tech} label={`Tecnologías de ${project.name}`} />
          </section>

          <div className={s.links}>
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className={`${u.btn} ${u.secondary}`}>
              <GithubIcon size={18} /> Ver repositorio
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${u.btn} ${u.ghost}`}>
                <ExternalLink size={18} aria-hidden="true" /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Projects() {
  const [cat, setCat] = useState('Todos');
  const [tech, setTech] = useState<string | null>(null);
  const { hash } = useLocation();
  const navigate = useNavigate();

  const list = useMemo(
    () => projects.filter((p) => (cat === 'Todos' || p.category === cat) && (!tech || p.tech.includes(tech))),
    [cat, tech],
  );
  const selected = projects.find((p) => `#${p.id}` === hash);

  return (
    <SectionShell
      id="garage"
      title="Projects"
      intro={<p>El showroom. Proyectos reales de mi GitHub, con su estado tal cual es: lo que está en marcha, lo académico y los experimentos.</p>}
    >
      <div className={s.filters}>
        <div className={s.filterRow} role="group" aria-label="Filtrar por categoría">
          {categories.map((c) => (
            <button key={c} type="button" className={s.filter} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className={s.filterRow} role="group" aria-label="Filtrar por tecnología">
          <span className={s.filterLabel}>Tech</span>
          {techs.map((t) => (
            <button key={t} type="button" className={`${s.filter} ${s.tech}`} aria-pressed={tech === t} onClick={() => setTech(tech === t ? null : t)}>
              {t}
            </button>
          ))}
        </div>
        <p className={s.count} aria-live="polite">
          {list.length} {list.length === 1 ? 'proyecto' : 'proyectos'} en el garaje
        </p>
      </div>

      <ul className={s.grid}>
        {list.map((p, i) => (
          <li key={p.id} id={p.id} className={`${s.bay} ${p.featured && cat === 'Todos' && !tech ? s.featured : ''}`} style={{ '--hue': p.hue } as React.CSSProperties}>
            <Link to={{ hash: p.id }} className={s.card} preventScrollReset>
              <div className={s.media}>
                <Media p={p} eager={i === 0} />
                <span className={s.bayNum} aria-hidden="true">
                  BAY {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className={s.cardBody}>
                <p className={s.plateRow}>
                  <span className={s.plate}>{p.plate}</span>
                  <span className={s.status} data-status={p.status}>
                    {STATUS[p.status]}
                  </span>
                </p>
                <h2 className={s.name}>{p.name}</h2>
                <p className={s.tagline}>{p.tagline}</p>
                <ul className={s.miniTech} aria-label="Tecnologías">
                  {p.tech.slice(0, 5).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                  {p.tech.length > 5 && <li>+{p.tech.length - 5}</li>}
                </ul>
                <span className={s.open}>
                  Ver ficha <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {list.length === 0 && (
        <p className={s.empty}>
          Ningún proyecto con ese filtro.{' '}
          <button type="button" onClick={() => (setCat('Todos'), setTech(null))}>
            Quitar filtros
          </button>
        </p>
      )}

      <aside className={s.more}>
        <p>
          ¿Quieres ver el resto? Todo el código está en{' '}
          <a href="https://github.com/alejmnz0" target="_blank" rel="noopener noreferrer">
            github.com/alejmnz0
          </a>
          . Esta misma web también es un proyecto: React + TypeScript + Vite, prerenderizada y desplegada con GitHub Actions.
        </p>
      </aside>

      {selected && <ProjectDialog key={selected.id} project={selected} onClose={() => navigate({ hash: '' }, { replace: true, preventScrollReset: true })} />}
    </SectionShell>
  );
}
