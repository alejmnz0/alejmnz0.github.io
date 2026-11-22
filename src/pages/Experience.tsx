import { Building2, GraduationCap, Sparkles } from 'lucide-react';
import { SectionShell } from '../components/layout/SectionShell';
import { Chips } from '../components/ui/Chips';
import { education } from '../data/education';
import { experience } from '../data/experience';
import { duration, fmtMonth, fmtRange, isoMonth } from '../lib/dates';
import s from './Experience.module.css';

export default function Experience() {
  const floors = experience.length;
  return (
    <SectionShell
      id="downtown"
      title="Experience"
      intro={<p>Cada planta de la torre es una etapa. Arriba, lo que hago ahora; abajo, donde empecé.</p>}
    >
      <ol className={s.tower}>
        {experience.map((job, i) => {
          const floor = floors - i;
          const current = job.end === null;
          return (
            <li key={job.id} className={s.floor} data-current={current || undefined}>
              <div className={s.rail} aria-hidden="true">
                <span className={s.node} />
              </div>
              <div className={s.level}>
                <span className={s.levelLabel}>Planta</span>
                <span className={s.levelNum}>{String(floor).padStart(2, '0')}</span>
              </div>
              <article className={s.file} aria-labelledby={`job-${job.id}`}>
                <header className={s.fileHead}>
                  <div>
                    <p className={s.company}>
                      <Building2 size={16} aria-hidden="true" /> {job.company} · {job.location}
                      {current && <span className={s.now}>Now</span>}
                    </p>
                    <h2 id={`job-${job.id}`} className={s.role}>
                      {job.role}
                    </h2>
                  </div>
                  <p className={s.when}>
                    <span>
                      <time dateTime={isoMonth(job.start)}>{fmtMonth(job.start)}</time>
                      {' – '}
                      {job.end ? <time dateTime={isoMonth(job.end)}>{fmtMonth(job.end)}</time> : 'actualidad'}
                    </span>
                    <span className={s.dur}>{duration(job.start, job.end)}</span>
                  </p>
                </header>
                <p className={s.context}>{job.context}</p>
                {job.note && <p className={s.note}>{job.note}</p>}

                <div className={s.groups}>
                  {job.groups.map((g) => (
                    <section key={g.title} className={s.group}>
                      <h3>{g.title}</h3>
                      <ul>
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

                {job.highlights.length > 0 && (
                  <ul className={s.highlights} aria-label="Logros">
                    {job.highlights.map((h) => (
                      <li key={h}>
                        <Sparkles size={18} aria-hidden="true" /> {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={s.tech}>
                  <Chips items={job.tech} label={`Tecnologías en ${job.company}`} />
                </div>
              </article>
            </li>
          );
        })}

        {education.map((e) => (
          <li key={e.id} className={`${s.floor} ${s.ground}`}>
            <div className={s.rail} aria-hidden="true">
              <span className={s.node} />
            </div>
            <div className={s.level}>
              <span className={s.levelLabel}>Planta</span>
              <span className={s.levelNum}>PB</span>
            </div>
            <article className={`${s.file} ${s.eduFile}`} aria-labelledby={`edu-${e.id}`}>
              <p className={s.company}>
                <GraduationCap size={16} aria-hidden="true" /> {e.school} · {e.location}
              </p>
              <h2 id={`edu-${e.id}`} className={s.role}>
                {e.title}
              </h2>
              <p className={s.when}>{fmtRange(e.start, e.end)}</p>
              <ul className={s.eduList}>
                {e.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
