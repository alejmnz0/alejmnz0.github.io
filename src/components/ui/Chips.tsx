import u from './ui.module.css';

export function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className={u.chips} aria-label={label}>
      {items.map((t) => (
        <li key={t} className={u.chip}>
          {t}
        </li>
      ))}
    </ul>
  );
}
