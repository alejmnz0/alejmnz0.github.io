import type { CSSProperties } from 'react';
import { rng } from '../../lib/rng';
import s from './art.module.css';

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ───────────────────────── Palm ───────────────────────── */

interface PalmProps {
  x: number;
  y: number; // base
  h: number;
  lean?: number;
  fill?: string;
  sway?: boolean;
  delay?: number;
}

const FROND_ANGLES = [-168, -140, -112, -80, -48, -18, 12];

export function Palm({ x, y, h, lean = 20, fill = '#0b0618', sway = true, delay = 0 }: PalmProps) {
  const tx = lean;
  const ty = -h;
  const L = h * 0.44;
  const w = Math.max(3, h * 0.045);
  const fronds = FROND_ANGLES.map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const len = L * (i % 2 ? 0.9 : 1);
    const droop = len * 0.42 * Math.abs(Math.cos(a));
    const ex = Math.cos(a) * len;
    const ey = Math.sin(a) * len + droop;
    const c1x = Math.cos(a) * len * 0.5;
    const c1y = Math.sin(a) * len * 0.5 - len * 0.22;
    const c2x = Math.cos(a) * len * 0.55;
    const c2y = Math.sin(a) * len * 0.55 - len * 0.02;
    return `M0 0Q${c1x.toFixed(1)} ${c1y.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}Q${c2x.toFixed(1)} ${c2y.toFixed(1)} 0 0Z`;
  });
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={sway ? s.sway : undefined} style={vars({ '--d': `${delay}s` })}>
        <path d={`M${-w / 2} 0Q${tx * 0.5} ${ty * 0.55} ${tx} ${ty}L${tx + w * 0.5} ${ty}Q${tx * 0.5 + w} ${ty * 0.55} ${w / 2} 0Z`} fill={fill} />
        <g transform={`translate(${tx + w * 0.2} ${ty})`} fill={fill}>
          {fronds.map((d, i) => (
            <path key={i} d={d} />
          ))}
          <circle r={w * 0.9} />
        </g>
      </g>
    </g>
  );
}

/* ───────────────────────── Car (original 80s wedge coupé) ───────────────────────── */

export function Car({ color = '#ff4fd8', lights = true }: { color?: string; lights?: boolean }) {
  return (
    <g>
      {lights && <path d="M118 16 L260 4 L260 40 L118 24Z" fill="url(#g-headlight)" />}
      <ellipse cx="60" cy="33" rx="58" ry="4" fill={color} opacity="0.45" />
      <path d="M0 26 L5 18 L40 13 L58 4 L84 4 L104 13 L119 16 L121 26 Z" fill="#0d0a1c" />
      <path d="M5 18 L40 13 L58 4 L84 4 L104 13 L119 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M45 12.5 L60 6.5 L82 6.5 L95 12.5 Z" fill="#1d2a5c" stroke="#00e5ff" strokeWidth="0.8" />
      <rect x="0" y="18" width="6" height="3" fill="#ff2a4f" />
      <rect x="115" y="17" width="5" height="3" fill="#fff3c4" />
      <circle cx="25" cy="27" r="6.5" fill="#05040b" stroke="#2c2650" strokeWidth="2" />
      <circle cx="97" cy="27" r="6.5" fill="#05040b" stroke="#2c2650" strokeWidth="2" />
    </g>
  );
}

/* ───────────────────────── Sky pieces ───────────────────────── */

export function Stars({ count = 46, maxY = 380, seed = 7, width = 1600 }: { count?: number; maxY?: number; seed?: number; width?: number }) {
  const r = rng(seed);
  return (
    <g className={s.stars}>
      {Array.from({ length: count }, (_, i) => {
        const cx = r() * width;
        const cy = r() * maxY;
        const rad = r() * 1.3 + 0.4;
        const tw = i % 4 === 0;
        return (
          <circle
            key={i}
            cx={cx.toFixed(1)}
            cy={cy.toFixed(1)}
            r={rad.toFixed(2)}
            fill="#fff"
            opacity={(0.35 + r() * 0.5).toFixed(2)}
            className={tw ? s.twinkle : undefined}
            style={tw ? vars({ '--d': `${(r() * 4).toFixed(2)}s` }) : undefined}
          />
        );
      })}
    </g>
  );
}

export function Sun({ cx, cy, r = 200 }: { cx: number; cy: number; r?: number }) {
  return (
    <g className={s.sun}>
      <circle cx={cx} cy={cy} r={r * 2.3} fill="url(#g-halo)" />
      <g transform={`translate(${cx} ${cy}) scale(${r / 200})`}>
        <circle r="200" fill="url(#g-sun)" mask="url(#m-sun-stripes)" className={s.sunDisc} />
      </g>
    </g>
  );
}

export function Moon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className={s.moon}>
      <circle cx={cx} cy={cy} r="120" fill="url(#g-halo)" opacity="0.5" />
      <circle cx={cx} cy={cy} r="42" fill="#f6e9ff" />
      <circle cx={cx + 16} cy={cy - 10} r="38" fill="var(--sky-1)" />
    </g>
  );
}

/** Two layers of distant skyline silhouettes along a baseline. */
export function Skyline({ baseline, width = 1600, seed = 3, x0 = 0 }: { baseline: number; width?: number; seed?: number; x0?: number }) {
  const r = rng(seed);
  const far: string[] = [];
  const near: { x: number; w: number; h: number }[] = [];
  for (let x = x0; x < x0 + width; ) {
    const w = 24 + r() * 46;
    const h = 30 + r() * 110;
    far.push(`M${x.toFixed(0)} ${baseline}V${(baseline - h).toFixed(0)}H${(x + w).toFixed(0)}V${baseline}Z`);
    x += w + r() * 6;
  }
  for (let x = x0 + 10; x < x0 + width; ) {
    const w = 30 + r() * 54;
    const h = 40 + r() * 150;
    near.push({ x, w, h });
    x += w + 8 + r() * 30;
  }
  const lit = rng(seed + 11);
  return (
    <g>
      <path d={far.join('')} fill="var(--sky-far)" />
      {near.map((b, i) => (
        <g key={i}>
          <rect x={b.x.toFixed(0)} y={(baseline - b.h).toFixed(0)} width={b.w.toFixed(0)} height={b.h.toFixed(0)} fill="var(--sky-near)" />
          {i % 3 === 1 && <rect x={(b.x + b.w / 2 - 1).toFixed(0)} y={(baseline - b.h - 14).toFixed(0)} width="2" height="14" fill="var(--sky-near)" />}
          {Array.from({ length: Math.floor(b.h / 22) }, (_, j) =>
            lit() > 0.62 ? (
              <rect
                key={j}
                x={(b.x + 6 + lit() * (b.w - 14)).toFixed(0)}
                y={(baseline - b.h + 10 + j * 22).toFixed(0)}
                width="4"
                height="5"
                fill="#ffd36b"
                className={s.farWindow}
              />
            ) : null,
          )}
        </g>
      ))}
    </g>
  );
}

export function Ocean({ y, h, cx, width = 1600 }: { y: number; h: number; cx: number; width?: number }) {
  const lines = Array.from({ length: 11 }, (_, i) => i);
  return (
    <g>
      <rect x="-200" y={y} width={width + 400} height={h} fill="url(#g-ocean)" />
      <g className={s.reflection}>
        {lines.map((i) => {
          const w = 320 - i * 25;
          return (
            <rect
              key={i}
              x={cx - w / 2}
              y={y + 5 + i * 8.5}
              width={w}
              height={2.2 + (i % 3) * 0.6}
              rx="1.2"
              fill="url(#g-reflect)"
              className={s.shimmer}
              style={vars({ '--d': `${(i * 0.37).toFixed(2)}s` })}
            />
          );
        })}
      </g>
      {[120, 360, 1180, 1430].map((x, i) => (
        <rect key={x} x={x} y={y + 18 + i * 14} width={70 + i * 12} height="1.5" fill="#00e5ff" opacity="0.25" className={s.shimmer} style={vars({ '--d': `${i}s` })} />
      ))}
    </g>
  );
}

export function StreetLamp({ x, y, h = 120, flip = false }: { x: number; y: number; h?: number; flip?: boolean }) {
  const dir = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={dir * 22} cy={-h + 8} r="34" fill="url(#g-lamp)" />
      <path d={`M0 0V${-h}q0 -6 ${dir * 6} -6h${dir * 14}`} fill="none" stroke="#1a1433" strokeWidth="4" />
      <rect x={dir > 0 ? 16 : -26} y={-h - 4} width="10" height="5" rx="2" fill="#ffe7a8" />
    </g>
  );
}
