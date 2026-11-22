import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Download, Map, Menu, Moon, Sun, X } from 'lucide-react';
import { locations } from '../../config/locations';
import { profile } from '../../data/profile';
import { social } from '../../data/social';
import { useScene } from '../../hooks/useScene';
import { GithubIcon, LinkedinIcon } from '../ui/icons';
import { Logo } from '../ui/Logo';
import s from './Nav.module.css';

const items = [
  { to: '/', label: 'Map', end: true },
  ...locations.map((l) => ({ to: l.path, label: l.section === 'Skills & Experiments' ? 'Skills' : l.section === 'About me' ? 'About' : l.section, end: false })),
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scene, toggle } = useScene();
  const { pathname } = useLocation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // close the sheet on route change (adjusting state during render, per React docs)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    sheetRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const github = social.find((x) => x.id === 'github')!;
  const linkedin = social.find((x) => x.id === 'linkedin')!;

  return (
    <header className={s.bar}>
      <div className={s.inner}>
        <Link to="/" className={s.brand} aria-label="VICE.DEV — volver al mapa">
          <Logo />
        </Link>

        <nav aria-label="Principal" className={s.desktop}>
          <ul>
            {items.map((it) => (
              <li key={it.to}>
                <NavLink to={it.to} end={it.end} className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
                  {it.label === 'Map' && <Map size={15} aria-hidden="true" />}
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <button type="button" className={s.icon} onClick={toggle} aria-label={scene === 'night' ? 'Cambiar la ciudad a atardecer' : 'Cambiar la ciudad a medianoche'} title={scene === 'night' ? 'Sunset' : 'Midnight'}>
            {scene === 'night' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className={s.cv} href={profile.cv.href} download={profile.cv.fileName}>
            <Download size={16} aria-hidden="true" />
            <span>CV</span>
          </a>
          <button
            ref={btnRef}
            type="button"
            className={`${s.icon} ${s.menuBtn}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={sheetRef} className={s.sheet} data-open={open || undefined} hidden={!open}>
        <nav aria-label="Menú móvil">
          <ul className={s.sheetList}>
            <li>
              <NavLink to="/" end className={s.sheetLink}>
                <span className={s.num}>00</span>
                <span>
                  <strong>City Map</strong>
                  <small>Home</small>
                </span>
              </NavLink>
            </li>
            {locations.map((l) => (
              <li key={l.id} style={{ '--accent': l.accent } as React.CSSProperties}>
                <NavLink to={l.path} className={s.sheetLink}>
                  <span className={s.num}>{l.index}</span>
                  <span>
                    <strong>{l.section}</strong>
                    <small>{l.place}</small>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.sheetFoot}>
          <a href={profile.cv.href} download={profile.cv.fileName} className={s.sheetCv}>
            <Download size={18} aria-hidden="true" /> Descargar CV
          </a>
          <a href={github.href} target="_blank" rel="noopener noreferrer" className={s.icon} aria-label="GitHub (se abre en una pestaña nueva)">
            <GithubIcon />
          </a>
          <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className={s.icon} aria-label="LinkedIn (se abre en una pestaña nueva)">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
