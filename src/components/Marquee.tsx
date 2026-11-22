import s from './Marquee.module.css';

/** Two crossing, tilted ticker bands. Purely decorative: the same words are listed in Skills. */
export function Marquee({ top, bottom }: { top: string[]; bottom: string[] }) {
  const row = (items: string[]) => (
    <div className={s.track}>
      {[0, 1].map((k) => (
        <span key={k} className={s.group}>
          {items.map((t) => (
            <span key={t} className={s.item}>
              {t}
              <span className={s.star}>✦</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
  return (
    <div className={s.wrap} aria-hidden="true">
      <div className={`${s.band} ${s.pink}`}>{row(top)}</div>
      <div className={`${s.band} ${s.cyan}`}>{row(bottom)}</div>
    </div>
  );
}
