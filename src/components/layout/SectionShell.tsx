import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { locations, type LocationId } from '../../config/locations';
import { BuildingIcon } from '../city/BuildingIcon';
import { Stars, Sun } from '../city/art';
import s from './SectionShell.module.css';

/** Shared frame for every section: chapter header with the location's building, content, next-stop footer. */
export function SectionShell({ id, title, intro, children }: { id: LocationId; title: string; intro?: ReactNode; children: ReactNode }) {
  const i = locations.findIndex((l) => l.id === id);
  const loc = locations[i];
  const next = locations[(i + 1) % locations.length];
  return (
    <article className={s.shell} style={{ '--accent': loc.accent } as React.CSSProperties} aria-labelledby={`${id}-title`}>
      <header className={s.header}>
        <svg className={s.sky} viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <rect width="1600" height="420" fill="url(#g-sky)" />
          <Stars width={1600} maxY={260} seed={i + 3} count={30} />
          <Sun cx={1180} cy={430} r={170} />
          <rect y="410" width="1600" height="10" fill="#080812" />
        </svg>
        <div className={s.headerInner}>
          <div className={s.titles}>
            <Link to="/" className={s.back}>
              <ArrowLeft size={16} aria-hidden="true" /> Volver al mapa
            </Link>
            <p className={s.eyebrow}>
              <span>{loc.index}</span> — {loc.place}
            </p>
            <h1 id={`${id}-title`} className={s.title}>
              {title}
            </h1>
            {intro && <div className={s.intro}>{intro}</div>}
          </div>
          <BuildingIcon id={id} className={s.building} />
        </div>
      </header>

      <div className={s.body}>{children}</div>

      <footer className={s.next}>
        <Link to={next.path} className={s.nextLink} style={{ '--accent': next.accent } as React.CSSProperties}>
          <span className={s.nextLabel}>Siguiente parada</span>
          <span className={s.nextName}>
            {next.index} · {next.place} <small>{next.section}</small>
          </span>
          <ArrowRight className={s.nextArrow} aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}
