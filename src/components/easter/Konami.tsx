import { useEffect, useState } from 'react';
import s from './Konami.module.css';

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** ↑↑↓↓←→←→BA → "turbo mode": a short neon colour-cycle and a cheat toast. */
export function Konami() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === CODE[pos] ? pos + 1 : k === CODE[0] ? 1 : 0;
      if (pos === CODE.length) {
        pos = 0;
        setActive(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!active) return;
    document.documentElement.dataset.turbo = '';
    const t = window.setTimeout(() => {
      delete document.documentElement.dataset.turbo;
      setActive(false);
    }, 6000);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <div className={s.toast} role="status" aria-live="polite" data-show={active || undefined}>
      {active && (
        <>
          <strong>CHEAT ACTIVATED</strong> TURBO MODE · +30 vidas · el café corre por cuenta de la casa
        </>
      )}
    </div>
  );
}
