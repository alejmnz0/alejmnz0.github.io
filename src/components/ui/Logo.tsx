import s from './Logo.module.css';

/** VICE.DEV wordmark: chrome-gradient block letters + neon script tag. Original lettering. */
export function Logo({ size = 'sm', tag = true }: { size?: 'sm' | 'lg'; tag?: boolean }) {
  return (
    <span className={`${s.logo} ${size === 'lg' ? s.lg : s.sm}`}>
      <span className={s.word}>
        VICE<span className={s.dot}>.</span>DEV
      </span>
      {tag && <span className={s.tag}>after dark</span>}
    </span>
  );
}
