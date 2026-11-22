import type { ReactNode } from 'react';
import s from './SectionHead.module.css';

/** Section opener: neon index + giant deco title that wipes in + optional lede. */
export function SectionHead({ index, title, id, children, accent = 'var(--pink)' }: { index: string; title: string; id: string; children?: ReactNode; accent?: string }) {
  return (
    <header className={s.head} style={{ '--accent': accent } as React.CSSProperties}>
      <p className={s.index} data-reveal="up">
        <span>{index}</span>
      </p>
      <h2 id={id} className={s.title} data-reveal="wipe">
        {title}
      </h2>
      {children && (
        <div className={s.lede} data-reveal="up" style={{ '--d': 2 } as React.CSSProperties}>
          {children}
        </div>
      )}
    </header>
  );
}
