import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { profile } from '../data/profile';
import s from './Nav.module.css';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav className={s.nav} data-solid={solid || open || undefined} aria-label="Principal">
      <a href="#top" className={s.brand} onClick={() => setOpen(false)}>
        <span className={s.mark}>AJ</span>
        <span className={s.brandText}>{profile.firstName} Jiménez</span>
      </a>

      <ul id="nav-links" className={s.links} data-open={open || undefined}>
        {SECTIONS.map((sec, i) => (
          <li key={sec.id}>
            <a href={`#${sec.id}`} aria-current={active === sec.id ? 'true' : undefined} onClick={() => setOpen(false)}>
              <span className={s.num}>0{i + 1}</span>
              {sec.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={s.actions}>
        <a href={profile.cv.href} download={profile.cv.fileName} className={s.cv}>
          <Download size={16} aria-hidden="true" />
          <span>CV</span>
        </a>
        <button type="button" className={s.menu} aria-expanded={open} aria-controls="nav-links" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
