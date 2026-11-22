import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../../config/locations';
import { experience } from '../../data/experience';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { skillCategories, skills } from '../../data/skills';
import { EMAIL, social } from '../../data/social';
import { TERMINAL_EVENT } from '../../lib/events';
import { fmtRange } from '../../lib/dates';
import s from './Terminal.module.css';

type Line = { kind: 'in' | 'out'; text: ReactNode };

const BANNER = [
  'VICE.DEV OS v1.986 — (c) a developer after dark',
  "Escribe 'help' para ver los comandos.",
];

/** Hidden CRT terminal. Opens from the city billboard, the footer link, or the ` key. */
export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER.map((t) => ({ kind: 'out', text: t })));
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, [contenteditable]')) return;
      if (e.key === '`' || e.key === 'º') {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener(TERMINAL_EVENT, show);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(TERMINAL_EVENT, show);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => endRef.current?.scrollIntoView({ block: 'end' }), [lines]);

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus?.();
  };

  const run = (raw: string): ReactNode[] | 'clear' | 'exit' => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(' ').toLowerCase();
    switch ((cmd ?? '').toLowerCase()) {
      case '':
        return [];
      case 'help':
        return [
          'Comandos disponibles:',
          '  whoami        quién soy',
          '  experience    trayectoria profesional',
          '  projects      proyectos del garaje',
          '  skills        stack por categorías',
          '  contact       cómo contactarme',
          '  goto <lugar>  ir a ocean | downtown | garage | arcade | club',
          '  cv            descargar currículum',
          '  clear / exit',
        ];
      case 'whoami':
        return [`${profile.fullName} — ${profile.role}`, profile.location, '', profile.pitch];
      case 'experience':
      case 'xp':
        return experience.flatMap((e) => [`▸ ${e.role} @ ${e.company} (${fmtRange(e.start, e.end)})`, `  ${e.tech.join(', ')}`]);
      case 'projects':
      case 'ls':
        return projects.map((p) => `▸ ${p.plate}  ${p.name.padEnd(16)} ${p.tagline}`);
      case 'skills':
        return skillCategories.map((c) => `${c.label.padEnd(10)} ${skills.filter((k) => k.category === c.id).map((k) => k.name).join(' · ')}`);
      case 'contact':
        return [`email     ${EMAIL}`, ...social.filter((x) => x.id !== 'email').map((x) => `${x.label.toLowerCase().padEnd(9)} ${x.href}`)];
      case 'cv': {
        const a = document.createElement('a');
        a.href = profile.cv.href;
        a.download = profile.cv.fileName;
        a.click();
        return ['Descargando currículum…'];
      }
      case 'goto':
      case 'cd': {
        const map: Record<string, string> = { ocean: '/about', about: '/about', downtown: '/experience', garage: '/projects', arcade: '/skills', club: '/contact', home: '/', map: '/' };
        const to = map[arg] ?? locations.find((l) => l.place.toLowerCase().includes(arg))?.path;
        if (!to) return [`goto: lugar desconocido '${arg}'. Prueba: ocean, downtown, garage, arcade, club.`];
        window.setTimeout(() => {
          close();
          navigate(to);
        }, 350);
        return [`Conduciendo hacia ${to} …`];
      }
      case 'sudo':
        return arg.includes('hire') ? ['[sudo] contraseña para recruiter: ********', 'Acceso concedido. Abre un email a ' + EMAIL + ' ;)'] : ['Buen intento.'];
      case 'hire':
      case 'hire-me':
        return [`Excelente decisión. ${EMAIL}`];
      case 'cat':
        return arg === 'secret.txt' ? ['El atardecer de esta ciudad se calcula con SVG puro. Ni una imagen de fondo.'] : [`cat: ${arg || '?'}: no existe el archivo (prueba secret.txt)`];
      case 'clear':
        return 'clear';
      case 'exit':
      case 'quit':
        return 'exit';
      default:
        return [`${cmd}: comando no encontrado. Escribe 'help'.`];
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const out = run(value);
    if (out === 'clear') setLines([]);
    else if (out === 'exit') close();
    else setLines((l) => [...l, { kind: 'in', text: value }, ...out.map((t) => ({ kind: 'out' as const, text: t }))]);
    if (value.trim()) setHistory((h) => [value, ...h].slice(0, 30));
    setHIdx(-1);
    setValue('');
  };

  if (!open) return null;

  return (
    <div className={s.overlay} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        className={s.crt}
        role="dialog"
        aria-modal="true"
        aria-label="Terminal secreta"
        onKeyDown={(e) => {
          if (e.key === 'Escape') close();
          if (e.key === 'Tab') {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        <div className={s.titlebar}>
          <span>vice.dev — tty1</span>
          <button type="button" onClick={close} aria-label="Cerrar terminal">
            ×
          </button>
        </div>
        <div className={s.screen} onClick={() => inputRef.current?.focus()}>
          <div role="log" aria-live="polite">
            {lines.map((l, i) => (
              <pre key={i} className={l.kind === 'in' ? s.in : s.out}>
                {l.kind === 'in' ? `guest@vice:~$ ${l.text}` : l.text}
              </pre>
            ))}
          </div>
          <form onSubmit={submit} className={s.prompt}>
            <label htmlFor="term-in">guest@vice:~$</label>
            <input
              id="term-in"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' && history.length) {
                  e.preventDefault();
                  const i = Math.min(hIdx + 1, history.length - 1);
                  setHIdx(i);
                  setValue(history[i]);
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  const i = hIdx - 1;
                  setHIdx(i);
                  setValue(i >= 0 ? history[i] : '');
                }
              }}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
