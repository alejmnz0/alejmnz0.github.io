import { Download } from 'lucide-react';
import { SectionHead } from '../components/SectionHead';
import { StripedSun } from '../components/Art';
import { education } from '../data/education';
import { profile } from '../data/profile';
import { fmtMonth } from '../lib/dates';
import s from './About.module.css';

/** The opening statement lights up word by word as it scrolls through the viewport. */
function Statement({ text }: { text: string }) {
  return (
    <p className={s.statement}>
      {text.split(' ').map((w, i) => (
        <span key={i} className={s.w}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}

export function About() {
  const edu = education[0];
  return (
    <section className={s.section} aria-labelledby="about-title" id="about">
      <div className={s.inner}>
        <SectionHead index="01 · Ocean Drive" title="About" id="about-title" />

        <div className={s.grid}>
          <div className={s.text}>
            <Statement text={profile.bio[0]} />
            {profile.bio.slice(1).map((p, i) => (
              <p key={i} className={s.para} data-reveal="up" style={{ '--d': i } as React.CSSProperties}>
                {p}
              </p>
            ))}
          </div>

          <aside className={s.card} data-reveal="tilt" aria-label="Datos rápidos">
            <StripedSun className={s.cardSun} id="about-sun" />
            <p className={s.cardKicker}>Resident card</p>
            <dl className={s.facts}>
              <div>
                <dt>Base</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Rol</dt>
                <dd>{profile.headline}</dd>
              </div>
              <div>
                <dt>Idiomas</dt>
                <dd>{profile.spokenLanguages.map((l) => `${l.name} · ${l.level}`).join(' / ')}</dd>
              </div>
              <div>
                <dt>Formación</dt>
                <dd>
                  {edu.title}
                  <small>
                    {edu.school} · {fmtMonth(edu.start)} – {fmtMonth(edu.end)}
                  </small>
                </dd>
              </div>
            </dl>
            <a href={profile.cv.href} download={profile.cv.fileName} className={s.cv}>
              <Download size={18} aria-hidden="true" /> Descargar CV
            </a>
          </aside>
        </div>

        <ol className={s.focus}>
          {profile.focus.map((f, i) => (
            <li key={f.title} data-reveal="up" style={{ '--d': i % 3 } as React.CSSProperties}>
              <span className={s.focusNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
