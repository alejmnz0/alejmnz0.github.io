import { profile } from '../../data/profile';
import { social } from '../../data/social';
import { openTerminal } from '../../lib/events';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <p className={s.name}>
          {profile.fullName} <span>·</span> {profile.role} <span>·</span> {profile.location}
        </p>
        <ul className={s.links}>
          {social.map((l) => (
            <li key={l.id}>
              <a href={l.href} {...(l.id !== 'email' && { target: '_blank', rel: 'noopener noreferrer' })}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="https://github.com/alejmnz0/alejmnz0.github.io" target="_blank" rel="noopener noreferrer">
              Código de esta web
            </a>
          </li>
        </ul>
        <p className={s.meta}>
          Diseñado y desarrollado con React, TypeScript y Vite · ilustraciones SVG originales ·{' '}
          <button type="button" className={s.secret} onClick={openTerminal}>
            ¿terminal?
          </button>
        </p>
      </div>
    </footer>
  );
}
