import { ArrowDown, Download } from 'lucide-react';
import { profile } from '../data/profile';
import { Palm, StripedSun } from './Art';
import s from './Hero.module.css';

/** Splits a word into letters that drop in one after another on load. */
function Letters({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <span className={s.word} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className={s.letter} style={{ '--i': start + i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const [first] = profile.firstName.split(' ');
  const [last1, last2] = profile.lastName.split(' ');
  return (
    <header className={s.hero} id="top">
      <div className={s.sky} aria-hidden="true" />
      <div className={s.stars} aria-hidden="true" />
      <StripedSun className={s.sun} id="hero-sun" />
      <div className={s.horizon} aria-hidden="true" />
      <div className={s.grid} aria-hidden="true" />
      <Palm className={`${s.palm} ${s.palmL}`} lean={70} />
      <Palm className={`${s.palm} ${s.palmR}`} lean={-60} height={460} />

      <div className={s.content}>
        <p className={s.hello}>
          <span>Hola, soy</span>
        </p>
        <h1 className={s.name}>
          <span className="sr-only">{profile.fullName}</span>
          <Letters text={first} />
          <Letters text={last1} start={first.length} />
          <span className={s.outline} aria-hidden="true">
            {last2}
          </span>
        </h1>
        <p className={s.neon}>
          <span>{profile.role}</span>
        </p>
        <p className={s.tagline}>
          {profile.headline} · {profile.location}
          <br />
          <em>{profile.tagline}</em>
        </p>
        <div className={s.ctas}>
          <a href="#projects" className={s.primary}>
            Ver proyectos
          </a>
          <a href={profile.cv.href} download={profile.cv.fileName} className={s.ghost}>
            <Download size={18} aria-hidden="true" /> Descargar CV
          </a>
        </div>
      </div>

      <a href="#about" className={s.scroll} aria-label="Bajar a la siguiente sección">
        <span>scroll</span>
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </header>
  );
}
