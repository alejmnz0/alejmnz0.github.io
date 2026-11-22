import { Download, GraduationCap, Languages, MapPin } from 'lucide-react';
import { SectionShell } from '../components/layout/SectionShell';
import { Chips } from '../components/ui/Chips';
import { GithubIcon, LinkedinIcon } from '../components/ui/icons';
import u from '../components/ui/ui.module.css';
import { education } from '../data/education';
import { profile } from '../data/profile';
import { social } from '../data/social';
import { fmtMonth } from '../lib/dates';
import s from './About.module.css';

export default function About() {
  const gh = social.find((x) => x.id === 'github')!;
  const li = social.find((x) => x.id === 'linkedin')!;
  return (
    <SectionShell id="ocean-drive" title="About me" intro={<p>{profile.headline}. Backend, integraciones y despliegue, con frontend cuando el proyecto lo pide.</p>}>
      <div className={s.grid}>
        <aside className={s.pass} aria-label="Ficha personal">
          <div className={s.passTop}>
            <span>OCEAN DRIVE</span>
            <span>RESIDENT PASS</span>
          </div>
          <div className={s.portrait}>
            {profile.photo ? (
              <img src={profile.photo} alt={`Retrato de ${profile.fullName}`} width="220" height="220" loading="lazy" decoding="async" />
            ) : (
              <svg viewBox="0 0 220 220" role="img" aria-label={`Monograma ${profile.monogram}`}>
                <circle cx="110" cy="110" r="100" fill="url(#g-sky)" />
                <g transform="translate(110 150) scale(0.34)">
                  <circle r="200" fill="url(#g-sun)" mask="url(#m-sun-stripes)" />
                </g>
                <circle cx="110" cy="110" r="100" fill="none" stroke="#ff4fd8" strokeWidth="3" />
                <circle cx="110" cy="110" r="92" fill="none" stroke="#00e5ff" strokeWidth="1" opacity="0.6" />
                <text x="110" y="128" textAnchor="middle" className={s.mono}>
                  {profile.monogram}
                </text>
              </svg>
            )}
          </div>
          <h2 className={s.name}>{profile.fullName}</h2>
          <p className={s.role}>{profile.role}</p>
          <dl className={s.facts}>
            <div>
              <dt>
                <MapPin size={15} aria-hidden="true" /> Base
              </dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>
                <Languages size={15} aria-hidden="true" /> Idiomas
              </dt>
              <dd>{profile.spokenLanguages.map((l) => `${l.name} (${l.level})`).join(' · ')}</dd>
            </div>
            {profile.extras.map((e) => (
              <div key={e}>
                <dt className="sr-only">Otros</dt>
                <dd className={s.extra}>{e}</dd>
              </div>
            ))}
          </dl>
          <div className={s.passActions}>
            <a href={profile.cv.href} download={profile.cv.fileName} className={`${u.btn} ${u.primary}`}>
              <Download size={18} aria-hidden="true" /> Descargar CV
            </a>
            <div className={s.socialRow}>
              <a href={gh.href} target="_blank" rel="noopener noreferrer" className={`${u.btn} ${u.ghost}`}>
                <GithubIcon size={18} /> GitHub
              </a>
              <a href={li.href} target="_blank" rel="noopener noreferrer" className={`${u.btn} ${u.ghost}`}>
                <LinkedinIcon size={18} /> LinkedIn
              </a>
            </div>
          </div>
          <div className={s.barcode} aria-hidden="true" />
        </aside>

        <div className={s.main}>
          <div className={s.bio}>
            {profile.bio.map((p, i) => (
              <p key={i} className={i === 0 ? s.lead : undefined}>
                {p}
              </p>
            ))}
          </div>

          <section aria-labelledby="core-stack" className={s.block}>
            <p className={u.kicker}>Stack principal</p>
            <h2 id="core-stack" className={u.h2}>
              Con lo que trabajo a diario
            </h2>
            <div className={s.stack}>
              <Chips items={profile.stackLine} label="Tecnologías principales" />
            </div>
          </section>

          <section aria-labelledby="focus" className={s.block}>
            <p className={u.kicker}>Especialización</p>
            <h2 id="focus" className={u.h2}>
              Problemas que sé resolver
            </h2>
            <ol className={s.focus}>
              {profile.focus.map((f, i) => (
                <li key={f.title}>
                  <span className={s.focusNum}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="edu" className={s.block}>
            <p className={u.kicker}>Formación</p>
            <h2 id="edu" className={u.h2}>
              Dónde aprendí el oficio
            </h2>
            {education.map((e) => (
              <div key={e.id} className={`${u.panel} ${s.edu}`}>
                <GraduationCap className={s.eduIcon} aria-hidden="true" />
                <div>
                  <h3>{e.title}</h3>
                  <p className={s.eduMeta}>
                    {e.school} · {e.location} · {fmtMonth(e.start)} – {fmtMonth(e.end)}
                  </p>
                  <ul className={s.eduTopics}>
                    {e.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </SectionShell>
  );
}
