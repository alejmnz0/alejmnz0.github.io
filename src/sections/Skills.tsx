import { SectionHead } from '../components/SectionHead';
import { skillCategories, skills } from '../data/skills';
import s from './Skills.module.css';

const COLORS = ['var(--pink)', 'var(--cyan)', 'var(--gold)', 'var(--mint)', 'var(--orange)', '#c9a8ff'];

export function Skills() {
  return (
    <section className={s.section} aria-labelledby="skills-title" id="skills">
      <div className={s.inner}>
        <SectionHead index="04 · Arcade" title="Skills" id="skills-title" accent="var(--mint)">
          <p>Lo que uso en el trabajo y en mis proyectos. Sin barras de porcentaje inventadas.</p>
        </SectionHead>

        <div className={s.grid}>
          {skillCategories.map((c, ci) => (
            <section key={c.id} className={s.group} aria-labelledby={`sk-${c.id}`} style={{ '--c': COLORS[ci] } as React.CSSProperties} data-reveal="up">
              <h3 id={`sk-${c.id}`} className={s.label}>
                {c.label}
              </h3>
              <p className={s.blurb}>{c.blurb}</p>
              <ul className={s.chips}>
                {skills
                  .filter((k) => k.category === c.id)
                  .map((k, i) => (
                    <li key={k.name} style={{ '--i': i } as React.CSSProperties} title={k.note}>
                      {k.name}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
