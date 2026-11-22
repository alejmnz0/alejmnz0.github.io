import { SectionHead } from '../components/SectionHead';
import { experience } from '../data/experience';
import { duration, fmtMonth, isoMonth } from '../lib/dates';
import s from './Experience.module.css';

export function Experience() {
  return (
    <section className={s.section} aria-labelledby="exp-title" id="experience">
      <div className={s.inner}>
        <SectionHead index="02 · Downtown" title="Experience" id="exp-title" accent="var(--cyan)">
          <p>Dónde he trabajado y qué hago de verdad en el día a día.</p>
        </SectionHead>

        <ol className={s.list}>
          {experience.map((job) => {
            const items = job.groups.flatMap((g) => g.items);
            return (
              <li key={job.id} className={s.job}>
                <div className={s.when} data-reveal="left">
                  <span className={s.year}>{job.end ? job.end.year : 'Hoy'}</span>
                  <span className={s.range}>
                    <time dateTime={isoMonth(job.start)}>{fmtMonth(job.start)}</time> –{' '}
                    {job.end ? <time dateTime={isoMonth(job.end)}>{fmtMonth(job.end)}</time> : 'actualidad'}
                  </span>
                  <span className={s.dur}>{duration(job.start, job.end)}</span>
                </div>

                <article className={s.card} data-reveal="up">
                  <p className={s.company}>
                    {job.company}
                    {!job.end && <span className={s.now}>Now</span>}
                  </p>
                  <h3 className={s.role}>{job.role}</h3>
                  <p className={s.context}>{job.context}</p>
                  {job.note && <p className={s.note}>{job.note}</p>}

                  {job.highlights.map((h) => (
                    <p key={h} className={s.highlight}>
                      ★ {h}
                    </p>
                  ))}

                  <ul className={s.items}>
                    {items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>

                  <ul className={s.tech} aria-label={`Tecnologías en ${job.company}`}>
                    {job.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
