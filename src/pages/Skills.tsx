import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FlaskConical, GraduationCap, Globe, X } from 'lucide-react';
import { SectionShell } from '../components/layout/SectionShell';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillCategories, skills } from '../data/skills';
import type { Skill } from '../data/types';
import { evidenceFor, type Evidence } from '../lib/evidence';
import s from './Skills.module.css';

const KIND_ICON: Record<Evidence['kind'], typeof Briefcase> = {
  work: Briefcase,
  project: FlaskConical,
  study: GraduationCap,
  site: Globe,
};
const KIND_LABEL: Record<Evidence['kind'], string> = {
  work: 'Trabajo',
  project: 'Proyecto',
  study: 'Formación',
  site: 'Esta web',
};

function Inspector({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const ev = evidenceFor(skill.name);
  const cat = skillCategories.find((c) => c.id === skill.category)!;
  return (
    <div className={s.inspector} aria-live="polite">
      <div className={s.inspHead}>
        <p className={s.inspKicker}>Player 1 · {cat.label}</p>
        <button type="button" className={s.inspClose} onClick={onClose} aria-label="Cerrar detalle">
          <X size={18} />
        </button>
      </div>
      <h2 className={s.inspName}>{skill.name}</h2>
      {skill.note && <p className={s.inspNote}>{skill.note}</p>}
      <p className={s.inspLabel}>Desbloqueado en</p>
      {ev.length ? (
        <ul className={s.evidence}>
          {ev.map((e) => {
            const Icon = KIND_ICON[e.kind];
            return (
              <li key={e.kind + e.label}>
                <Link to={e.to}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{e.label}</span>
                  <small>{KIND_LABEL[e.kind]}</small>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={s.inspNote}>Incluida en el CV.</p>
      )}
    </div>
  );
}

const experiments = projects.filter((p) => p.status === 'experiment' || p.id === 'pokedamex');

export default function Skills() {
  const [sel, setSel] = useState<Skill | null>(null);
  return (
    <SectionShell
      id="arcade"
      title="Skills"
      intro={<p>Sin barras de porcentaje inventadas. Elige una habilidad y verás dónde la he usado de verdad.</p>}
    >
      <div className={s.layout}>
        <div className={s.boards}>
          {skillCategories.map((c, ci) => (
            <section key={c.id} className={s.board} aria-labelledby={`cat-${c.id}`}>
              <header className={s.boardHead}>
                <span className={s.world}>World {ci + 1}</span>
                <h2 id={`cat-${c.id}`}>{c.label}</h2>
                <p>{c.blurb}</p>
              </header>
              <ul className={s.tiles}>
                {skills
                  .filter((k) => k.category === c.id)
                  .map((k) => (
                    <li key={k.name}>
                      <button type="button" className={s.tile} aria-pressed={sel?.name === k.name} onClick={() => setSel(k)}>
                        <span className={s.tileName}>{k.name}</span>
                        <span className={s.credits}>
                          <span aria-hidden="true">{'●'.repeat(Math.min(evidenceFor(k.name).length, 5))}</span>
                          <span className="sr-only">, </span>
                          {evidenceFor(k.name).length} {evidenceFor(k.name).length === 1 ? 'uso' : 'usos'}
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className={s.side} data-open={sel ? '' : undefined} aria-label="Detalle de la habilidad">
          {sel ? (
            <Inspector skill={sel} onClose={() => setSel(null)} />
          ) : (
            <p className={s.insert}>INSERT COIN · elige una habilidad</p>
          )}

          <div className={s.hiscore}>
            <p className={s.inspLabel}>Hi-score · idiomas</p>
            <table>
              <tbody>
                {profile.spokenLanguages.map((l, i) => (
                  <tr key={l.name}>
                    <td>{i + 1}UP</td>
                    <td>{l.name}</td>
                    <td>{l.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>

      <section className={s.experiments} aria-labelledby="exp-title">
        <p className={s.world}>Bonus stage</p>
        <h2 id="exp-title" className={s.expTitle}>
          Experiments
        </h2>
        <ul className={s.expList}>
          {experiments.map((p) => (
            <li key={p.id}>
              <Link to={`/projects#${p.id}`}>
                <strong>{p.name}</strong>
                <span>{p.tagline}</span>
              </Link>
            </li>
          ))}
          <li>
            <span className={s.expStatic}>
              <strong>Vice Radio</strong>
              <span>Música synthwave generada en directo con Web Audio API. Búscala abajo a la derecha.</span>
            </span>
          </li>
          <li>
            <span className={s.expStatic}>
              <strong>???</strong>
              <span>Hay una terminal escondida en la ciudad. Prueba también ↑ ↑ ↓ ↓ ← → ← → B A.</span>
            </span>
          </li>
        </ul>
      </section>
    </SectionShell>
  );
}
