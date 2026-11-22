import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, SkipForward } from 'lucide-react';
import { profile } from '../../data/profile';
import { store } from '../../lib/events';
import { Ocean, Palm, Skyline, Stars, Sun } from '../city/art';
import { Logo } from '../ui/Logo';
import s from './Intro.module.css';

const INTRO_KEY = 'vice:intro-seen'; // also read by the pre-paint script in index.html

/**
 * Cinematic opening. Only shown on the first visit of a session that lands on "/"
 * (index.html decides before paint and sets html[data-intro="pending"]).
 */
export function Intro() {
  const [phase, setPhase] = useState<'off' | 'on' | 'leaving'>('off');
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== 'pending') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- decided by the pre-paint script, client only
    setPhase('on');
  }, []);

  const finish = useCallback(() => {
    store.set(INTRO_KEY, '1', 'session');
    setPhase('leaving');
    document.body.style.overflow = '';
    window.setTimeout(() => {
      setPhase('off');
      (document.querySelector('#main') as HTMLElement | null)?.focus({ preventScroll: true });
    }, 750);
  }, []);

  useEffect(() => {
    if (phase !== 'on') return;
    delete document.documentElement.dataset.intro; // the static cover is no longer needed
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => enterRef.current?.focus({ preventScroll: true }), 3100);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
    };
  }, [phase, finish]);

  if (phase === 'off') return null;

  return (
    <div className={s.intro} data-leaving={phase === 'leaving' || undefined} role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className={s.loader} aria-hidden="true">
        <p>TUNING INTO THE CITY</p>
        <span className={s.bar}>
          <i />
        </span>
      </div>

      <svg className={s.scene} viewBox="200 160 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <rect x="0" y="0" width="1600" height="900" fill="url(#g-sky)" className={s.sky} />
        <g className={s.stars}>
          <Stars width={1600} count={70} maxY={420} seed={21} />
        </g>
        <g className={s.sun}>
          <Sun cx={800} cy={600} r={230} />
        </g>
        <g className={s.skyline}>
          <Skyline baseline={600} seed={9} />
        </g>
        <g className={s.sea}>
          <Ocean y={600} h={300} cx={800} />
          <g stroke="#ff4fd8" strokeWidth="1.4" opacity="0.5">
            {Array.from({ length: 21 }, (_, i) => (
              <line key={i} x1={800 + (i - 10) * 40} y1="700" x2={800 + (i - 10) * 260} y2="900" />
            ))}
            {[704, 716, 734, 760, 796, 842].map((y) => (
              <line key={y} x1="0" x2="1600" y1={y} y2={y} />
            ))}
          </g>
          <rect x="0" y="698" width="1600" height="4" fill="#00e5ff" opacity="0.6" />
        </g>
        <g className={s.palms}>
          <Palm x={280} y={880} h={520} lean={70} fill="#06030e" />
          <Palm x={380} y={880} h={380} lean={30} fill="#0a0518" delay={-2} />
          <Palm x={1330} y={880} h={480} lean={-60} fill="#06030e" delay={-3} />
        </g>
      </svg>
      <div className={s.vignette} aria-hidden="true" />

      <div className={s.copy}>
        <h2 id="intro-title" className={s.logo}>
          <Logo size="lg" />
        </h2>
        <p className={s.name}>{profile.fullName}</p>
        <p className={s.role}>FULL STACK DEVELOPER</p>
        <p className={s.tagline}>“{profile.tagline}”</p>
        <button ref={enterRef} type="button" className={s.enter} onClick={finish}>
          Enter the city <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>

      <button type="button" className={s.skip} onClick={finish}>
        Saltar intro <SkipForward size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
