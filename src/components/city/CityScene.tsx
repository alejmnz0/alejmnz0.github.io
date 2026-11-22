import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations, type CityLocation } from '../../config/locations';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { openTerminal } from '../../lib/events';
import { Car, Moon, Ocean, Palm, Skyline, Stars, StreetLamp, Sun } from './art';
import { buildings } from './buildings';
import s from './CityScene.module.css';

const VB_W = 1600;
const VB_H = 900;
const BASE = 765; // building baseline
const ROAD_Y = 782;

function Pin({ loc, x, y, onSelect }: { loc: CityLocation; x: number; y: number; onSelect: (e: MouseEvent<SVGGElement>) => void }) {
  const place = loc.place.toUpperCase();
  const section = loc.section.toUpperCase();
  const w = Math.max(place.length * 11.6, section.length * 7.4) + 66;
  return (
    <g transform={`translate(${x} ${y})`} className={s.pinWrap} data-pin={loc.id} onClick={onSelect} style={{ '--accent': loc.accent } as CSSProperties}>
      <circle cy="10" r="5" className={s.pulse} style={{ stroke: loc.accent }} />
      <circle cy="10" r="3" style={{ fill: loc.accent }} />
      <g className={s.pin}>
        <rect x={-w / 2} y={-54} width={w} height={46} rx="12" className={s.pinBg} style={{ stroke: loc.accent }} />
        <text x={-w / 2 + 16} y={-26} className={s.pinIndex} style={{ fill: loc.accent }}>
          {loc.index}
        </text>
        <text x={-w / 2 + 46} y={-31} className={s.pinPlace}>
          {place}
        </text>
        <text x={-w / 2 + 46} y={-16} className={s.pinSection}>
          {section}
        </text>
        <path d="M-7 -8 L0 2 L7 -8Z" style={{ fill: loc.accent }} />
      </g>
    </g>
  );
}

export function CityScene() {
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [wide, setWide] = useState(true);
  const [zoom, setZoom] = useState<{ x: number; y: number; accent: string } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-aspect-ratio: 16/9)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const el = wrapRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', (((clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty('--py', (((clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
  };

  /** Highlights the floating label of the building under the pointer / focus. */
  const mark = (id: string, on: boolean) => {
    const pin = wrapRef.current?.querySelector(`[data-pin="${id}"]`);
    if (on) pin?.setAttribute('data-on', '');
    else pin?.removeAttribute('data-on');
  };

  const select = (e: MouseEvent<Element>, loc: CityLocation) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (zoom) return;
    if (reduced) {
      navigate(loc.path);
      return;
    }
    const wrap = wrapRef.current!.getBoundingClientRect();
    const art = (wrapRef.current!.querySelector(`[data-id="${loc.id}"] [data-art]`) as SVGGElement).getBoundingClientRect();
    setZoom({ x: art.left + art.width / 2 - wrap.left, y: art.top + art.height / 2 - wrap.top, accent: loc.accent });
    window.setTimeout(() => navigate(loc.path), 620);
  };

  return (
    <div
      ref={wrapRef}
      className={s.wrap}
      onPointerMove={onPointerMove}
      data-zooming={zoom ? '' : undefined}
      style={zoom ? ({ '--zx': `${zoom.x}px`, '--zy': `${zoom.y}px`, '--zc': zoom.accent } as CSSProperties) : undefined}
    >
      <svg
        className={s.scene}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio={wide ? 'xMidYMax slice' : 'xMidYMax meet'}
        role="group"
        aria-label="Mapa de la ciudad: cinco edificios, uno por sección del portfolio"
      >
        <g className={s.far}>
          <rect x="-300" y="-600" width={VB_W + 600} height="1300" fill="url(#g-sky)" />
          <Stars width={VB_W} />
          <Moon cx={1260} cy={170} />
          <Sun cx={800} cy={600} r={210} />
          <Skyline baseline={600} x0={-120} width={VB_W + 240} />
          <g
            className={s.secret}
            role="button"
            tabIndex={0}
            aria-label="Terminal secreta"
            onClick={openTerminal}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openTerminal())}
          >
            <g className={s.blimp}>
              <ellipse cx="1040" cy="170" rx="74" ry="24" fill="#120a26" stroke="#2c1a55" strokeWidth="2" />
              <path d="M966 170 l-22 -18 v36z" fill="#120a26" />
              <rect x="1022" y="192" width="30" height="9" rx="3" fill="#1d1240" />
              <rect x="996" y="160" width="84" height="20" rx="3" fill="#050c05" stroke="#c6ff5e" strokeWidth="1" />
              <text x="1004" y="175" className={s.secretText}>
                &gt;_ ?
              </text>
              <rect x="1046" y="164" width="6" height="11" fill="#c6ff5e" className={s.cursor} />
              <circle cx="1112" cy="170" r="2.5" fill="#ff2a4f" className={s.cursor} />
            </g>
          </g>
        </g>

        <g className={s.mid}>
          <Ocean y={600} h={100} cx={800} width={VB_W} />
          <rect x="-300" y="700" width={VB_W + 600} height="400" fill="var(--ground)" />
          <line x1="-300" x2={VB_W + 300} y1="700" y2="700" stroke="#00e5ff" strokeWidth="2" opacity="0.55" />
          <rect x="-300" y="703" width={VB_W + 600} height="10" fill="#140f2c" />
          <Palm x={392} y={BASE} h={200} lean={-14} fill="#160c2c" delay={-2} />
          <Palm x={612} y={BASE} h={240} lean={18} fill="#160c2c" delay={-4} />
          <Palm x={985} y={BASE} h={180} lean={-10} fill="#160c2c" delay={-1} />
          <Palm x={1272} y={BASE} h={220} lean={14} fill="#160c2c" delay={-3} />

          {locations.map((loc) => {
            const b = buildings[loc.id];
            const top = BASE - b.h;
            return (
              <a
                key={loc.id}
                href={loc.path}
                className={s.building}
                onClick={(e) => select(e, loc)}
                onPointerEnter={() => mark(loc.id, true)}
                onPointerLeave={() => mark(loc.id, false)}
                onFocus={() => mark(loc.id, true)}
                onBlur={() => mark(loc.id, false)}
                data-id={loc.id}
                aria-label={`${loc.index} ${loc.place}: ${loc.section}`}
                style={{ '--accent': loc.accent } as CSSProperties}
              >
                <ellipse cx={b.x + b.w / 2} cy={ROAD_Y + 26} rx={b.w * 0.62} ry="34" fill={`url(#g-pool-${b.pool})`} className={s.pool} />
                <rect x={b.x + b.w / 2 - 26} y={ROAD_Y} width="52" height="96" fill={`url(#g-streak-${b.pool})`} className={s.pool} />
                <g transform={`translate(${b.x} ${top})`}>
                  <g className={s.art} data-art>
                    <rect className={s.ring} x="-14" y="-14" width={b.w + 28} height={b.h + 28} rx="16" />
                    <b.Art />
                  </g>
                </g>
              </a>
            );
          })}

          <StreetLamp x={30} y={BASE + 14} />
          <StreetLamp x={600} y={BASE + 14} h={110} flip />
          <StreetLamp x={1000} y={BASE + 14} h={110} />
          <StreetLamp x={1560} y={BASE + 14} flip />
        </g>

        <g className={s.road}>
          <rect x="-300" y={ROAD_Y} width={VB_W + 600} height="80" fill="#07060e" opacity="0.92" />
          <line x1="-300" x2={VB_W + 300} y1={ROAD_Y} y2={ROAD_Y} stroke="#ff4fd8" strokeWidth="2" opacity="0.6" />
          <line x1="-300" x2={VB_W + 300} y1={ROAD_Y + 40} y2={ROAD_Y + 40} stroke="#ffd36b" strokeWidth="3" strokeDasharray="34 26" opacity="0.7" />
          <line x1="-300" x2={VB_W + 300} y1={ROAD_Y + 80} y2={ROAD_Y + 80} stroke="#00e5ff" strokeWidth="2" opacity="0.4" />
          <g className={s.carA}>
            <g transform={`translate(0 ${ROAD_Y + 46})`}>
              <Car color="#ff4fd8" />
            </g>
          </g>
          <g className={s.carB}>
            <g transform={`translate(0 ${ROAD_Y + 6}) scale(-0.86 0.86)`}>
              <Car color="#00e5ff" />
            </g>
          </g>
        </g>

        <g className={s.fore}>
          <rect x="-300" y={ROAD_Y + 82} width={VB_W + 600} height="200" fill="#05040b" />
          <Palm x={-10} y={VB_H + 10} h={520} lean={60} fill="#05030c" delay={-5} />
          <Palm x={1630} y={VB_H + 10} h={480} lean={-70} fill="#05030c" delay={-2.5} />
        </g>

        {/* labels live on top of every layer so foreground palms never cover them */}
        <g className={s.mid} aria-hidden="true">
          {locations.map((loc) => {
            const b = buildings[loc.id];
            const top = BASE - b.h;
            return <Pin key={loc.id} loc={loc} x={b.x + b.w / 2} y={top - (loc.id === 'nightclub' ? 74 : 18)} onSelect={(e) => select(e, loc)} />;
          })}
        </g>
      </svg>
      <div className={s.flash} aria-hidden="true" />
    </div>
  );
}
