/* eslint-disable react-refresh/only-export-components -- registry of drawing components keyed by location */
import type { CSSProperties, ReactElement } from 'react';
import type { LocationId } from '../../config/locations';
import type { PoolColor } from './SvgDefs';
import { rng } from '../../lib/rng';
import { Car } from './art';
import s from './buildings.module.css';

/**
 * Five original buildings, each drawn in its own local box (0,0)–(w,h) with the
 * ground at y = h. The same drawings are used in the desktop scene, the mobile
 * postcards and the section headers.
 */

const vars = (v: Record<string, string | number>) => v as CSSProperties;

function Windows({ x, y, cols, rows, dx, dy, w = 12, h = 14, seed, litRatio = 0.45 }: { x: number; y: number; cols: number; rows: number; dx: number; dy: number; w?: number; h?: number; seed: number; litRatio?: number }) {
  const r = rng(seed);
  const out: ReactElement[] = [];
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const lit = r() < litRatio;
      out.push(
        <rect
          key={`${i}-${j}`}
          x={x + i * dx}
          y={y + j * dy}
          width={w}
          height={h}
          rx="1.5"
          fill={lit ? '#ffd88a' : '#2a2260'}
          className={lit ? s.lit : undefined}
          style={lit ? vars({ '--d': `${(r() * 6).toFixed(2)}s` }) : undefined}
        />,
      );
    }
  return <g>{out}</g>;
}

/* 01 — Ocean Drive: art-deco hotel with "eyebrow" ledges and a vertical blade sign */
function OceanDrive() {
  return (
    <g>
      <path d="M0 330V170A36 36 0 0 1 72 170V330Z" fill="url(#g-bld-pink)" />
      {[196, 236, 276].map((y) => (
        <g key={y}>
          <rect x="-4" y={y} width="80" height="5" fill="#2d1450" />
          <line x1="-2" x2="74" y1={y + 6} y2={y + 6} stroke="#ff4fd8" strokeWidth="1.6" className={s.neon} />
        </g>
      ))}
      <Windows x={12} y={206} cols={3} rows={3} dx={19} dy={40} w={10} h={18} seed={11} />
      <rect x="54" y="150" width="246" height="180" fill="url(#g-bld-a)" />
      <rect x="140" y="62" width="92" height="92" fill="url(#g-bld-pink)" />
      <rect x="155" y="38" width="62" height="28" fill="url(#g-bld-pink)" />
      <rect x="172" y="16" width="28" height="26" fill="#a2468a" />
      <rect x="184" y="0" width="4" height="18" fill="#ff4fd8" className={s.neon} />
      <circle cx="186" cy="88" r="9" fill="#ffd88a" className={s.lit} />
      <circle cx="186" cy="122" r="9" fill="#2a2260" />
      <path d="M150 62h72M162 38h48" stroke="#00e5ff" strokeWidth="1.6" className={s.neon} />
      {[186, 226, 266].map((y) => (
        <g key={y}>
          <rect x="54" y={y} width="250" height="7" fill="#2a1450" />
          <line x1="54" x2="304" y1={y + 8} y2={y + 8} stroke="#ff4fd8" strokeWidth="1.8" className={s.neon} />
        </g>
      ))}
      <Windows x={70} y={160} cols={8} rows={4} dx={27} dy={40} w={13} h={16} seed={21} />
      <rect x="296" y="150" width="6" height="180" fill="url(#g-rim)" />
      {/* blade sign */}
      <rect x="244" y="64" width="34" height="156" rx="5" fill="#0f0822" stroke="#00e5ff" strokeWidth="2" className={s.neon} />
      {'OCEAN'.split('').map((ch, i) => (
        <text key={i} x="261" y={92 + i * 28} textAnchor="middle" className={`${s.sign} ${s.cyanText}`} fontSize="21">
          {ch}
        </text>
      ))}
      {/* lobby + striped awning */}
      <rect x="148" y="292" width="78" height="38" fill="#ffcf8a" opacity="0.9" />
      <path d="M140 292h94l-8 -14h-78z" fill="#ff4fd8" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${152 + i * 14} 278h7l2 14h-7z`} fill="#f5f5fa" opacity="0.85" />
      ))}
      <rect x="54" y="326" width="250" height="4" fill="#ff8a4c" opacity="0.6" />
    </g>
  );
}

/* 02 — Downtown: stepped glass tower with a lit crown */
function Downtown() {
  return (
    <g>
      <rect x="88" y="0" width="4" height="26" fill="#3a2a70" />
      <circle cx="90" cy="2" r="4" fill="#ff2a4f" className={s.blink} />
      <rect x="62" y="22" width="56" height="44" fill="url(#g-glass)" />
      <rect x="42" y="62" width="96" height="46" fill="url(#g-glass)" />
      <rect x="22" y="104" width="136" height="54" fill="url(#g-glass)" />
      <rect x="10" y="154" width="160" height="406" fill="url(#g-glass)" />
      <rect x="10" y="154" width="160" height="406" fill="url(#p-windows)" />
      <Windows x={17} y={196} cols={10} rows={17} dx={16} dy={20} w={9} h={11} seed={42} litRatio={0.3} />
      <path d="M62 22h56M42 62h96M22 104h136M10 154h160" stroke="#00e5ff" strokeWidth="2" className={s.neon} />
      <path d="M70 52l20 -14 20 14M54 94l36 -20 36 20M34 142l56 -24 56 24" fill="none" stroke="#ff4fd8" strokeWidth="2" className={s.neon} />
      <line x1="11" x2="11" y1="154" y2="560" stroke="#00e5ff" strokeWidth="2" opacity="0.7" className={s.neon} />
      <line x1="169" x2="169" y1="154" y2="560" stroke="#00e5ff" strokeWidth="2" opacity="0.7" className={s.neon} />
      <rect x="28" y="166" width="124" height="22" rx="3" fill="#0b0920" stroke="#00e5ff" strokeWidth="1" />
      <text x="90" y="182" textAnchor="middle" className={`${s.sign} ${s.cyanText}`} fontSize="12" letterSpacing="3">
        DOWNTOWN
      </text>
      <rect x="164" y="154" width="6" height="406" fill="url(#g-rim-l)" />
      <rect x="66" y="520" width="48" height="40" fill="#bff6ff" opacity="0.75" />
    </g>
  );
}

/* 03 — Software Garage: low showroom with roof sign and an open, lit bay */
function Garage() {
  return (
    <g>
      <rect x="58" y="88" width="8" height="18" fill="#2c1a55" />
      <rect x="264" y="88" width="8" height="18" fill="#2c1a55" />
      <rect x="30" y="8" width="270" height="82" rx="10" fill="#0d0920" stroke="#ff8a4c" strokeWidth="2.2" className={s.neon} />
      <text x="165" y="50" textAnchor="middle" className={`${s.script} ${s.pinkText}`} fontSize="36">
        Software
      </text>
      <text x="165" y="78" textAnchor="middle" className={`${s.sign} ${s.orangeText}`} fontSize="19" letterSpacing="7">
        GARAGE
      </text>
      <rect x="-8" y="104" width="346" height="14" fill="#2c1a55" />
      <line x1="-8" x2="338" y1="119" y2="119" stroke="#ff8a4c" strokeWidth="2" className={s.neon} />
      <rect x="0" y="118" width="330" height="112" fill="url(#g-bld-b)" />
      {[18, 222].map((x) => (
        <g key={x}>
          <rect x={x} y="138" width="90" height="92" fill="#221c48" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={x} x2={x + 90} y1={146 + i * 9.5} y2={146 + i * 9.5} stroke="#3b3270" strokeWidth="2" />
          ))}
          <rect x={x} y="136" width="90" height="4" fill="#00e5ff" opacity="0.6" />
        </g>
      ))}
      <rect x="120" y="138" width="90" height="92" fill="url(#g-garage)" />
      <rect x="120" y="138" width="90" height="10" fill="#ff8a4c" />
      <g transform="translate(126 198) scale(0.64)">
        <Car color="#00e5ff" lights={false} />
      </g>
      <rect x="120" y="224" width="90" height="6" fill="#ffffff" opacity="0.3" />
      <rect x="0" y="118" width="6" height="112" fill="url(#g-rim-l)" />
    </g>
  );
}

/* 04 — Arcade: marquee with chasing bulbs and glowing cabinets */
function Arcade() {
  const px = [
    '..XX..',
    '.XXXX.',
    'XX..XX',
    'XXXXXX',
    '.X..X.',
    'X.XX.X',
  ];
  return (
    <g>
      <path d="M0 290V78h20l10 -14h40l10 -14h80l10 14h40l10 14h20V290Z" fill="url(#g-bld-c)" />
      <path d="M0 78h20l10 -14h40l10 -14h80l10 14h40l10 14h20" fill="none" stroke="#c6ff5e" strokeWidth="2" className={s.neon} />
      <g transform="translate(102 14)">
        {px.flatMap((row, j) =>
          row.split('').map((c, i) => (c === 'X' ? <rect key={`${i}${j}`} x={i * 6} y={j * 6} width="5.4" height="5.4" fill="#ff4fd8" className={s.neonFill} /> : null)),
        )}
      </g>
      <rect x="18" y="92" width="204" height="64" rx="12" fill="#0b0920" />
      <rect x="18" y="92" width="204" height="64" rx="12" fill="none" stroke="#ffd36b" strokeWidth="4" strokeDasharray="0.1 13" strokeLinecap="round" className={s.chase} />
      <text x="120" y="135" textAnchor="middle" className={`${s.sign} ${s.limeText}`} fontSize="30" letterSpacing="2">
        ARCADE
      </text>
      <rect x="18" y="178" width="48" height="60" rx="4" fill="#ff4fd8" opacity="0.35" className={s.lit} />
      <rect x="174" y="178" width="48" height="60" rx="4" fill="#00e5ff" opacity="0.35" className={s.lit} style={vars({ '--d': '2s' })} />
      <rect x="78" y="200" width="84" height="90" fill="url(#g-screen)" opacity="0.9" />
      {[90, 128].map((x) => (
        <g key={x}>
          <rect x={x} y="228" width="22" height="62" fill="#120a26" />
          <rect x={x + 3} y="234" width="16" height="12" fill="#c6ff5e" className={s.screen} />
        </g>
      ))}
      <rect x="236" y="78" width="4" height="212" fill="url(#g-rim-l)" />
    </g>
  );
}

/* 05 — Night Club: fin tower, script neon, spotlights and velvet rope */
function NightClub() {
  return (
    <g>
      <g className={s.beams}>
        <path d="M40 150 L-30 -60 L30 -60Z" fill="url(#g-beam)" className={s.beamL} />
        <path d="M200 150 L210 -60 L270 -60Z" fill="url(#g-beam)" className={s.beamR} />
      </g>
      <path d="M96 160V44A24 24 0 0 1 144 44V160Z" fill="#2e1758" />
      <path d="M96 160V44A24 24 0 0 1 144 44V160" fill="none" stroke="#a77bff" strokeWidth="2" className={s.neon} />
      {'OPEN'.split('').map((ch, i) => (
        <text key={i} x="120" y={68 + i * 24} textAnchor="middle" className={`${s.sign} ${s.cyanText} ${s.flicker}`} fontSize="18">
          {ch}
        </text>
      ))}
      <rect x="0" y="150" width="240" height="210" fill="url(#g-bld-d)" />
      {[150, 250].map((y) => (
        <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="#a77bff" strokeWidth="2" className={s.neon} />
      ))}
      <text x="120" y="212" textAnchor="middle" transform="rotate(-6 120 205)" className={`${s.script} ${s.pinkText}`} fontSize="46">
        Night Club
      </text>
      <path d="M186 268h34l-17 20v18m-9 0h18" fill="none" stroke="#00e5ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={s.neon} />
      <circle cx="210" cy="272" r="3" fill="#c6ff5e" />
      <Windows x={16} y={266} cols={3} rows={1} dx={22} dy={0} w={14} h={26} seed={77} litRatio={0.7} />
      <rect x="86" y="292" width="68" height="68" fill="#ff4fd8" opacity="0.28" />
      <rect x="86" y="292" width="68" height="68" fill="none" stroke="#ff4fd8" strokeWidth="2" className={s.neon} />
      <rect x="58" y="330" width="5" height="30" fill="#ffd36b" />
      <rect x="177" y="330" width="5" height="30" fill="#ffd36b" />
      <path d="M60 334 Q120 360 180 334" fill="none" stroke="#e0245e" strokeWidth="4" />
      <rect x="0" y="150" width="5" height="210" fill="url(#g-rim)" />
    </g>
  );
}

export interface BuildingDef {
  id: LocationId;
  w: number;
  h: number;
  x: number; // position in the desktop scene
  pool: PoolColor;
  Art: () => ReactElement;
}

export const buildings: Record<LocationId, BuildingDef> = {
  'ocean-drive': { id: 'ocean-drive', w: 304, h: 330, x: 66, pool: 'pink', Art: OceanDrive },
  downtown: { id: 'downtown', w: 180, h: 560, x: 408, pool: 'cyan', Art: Downtown },
  garage: { id: 'garage', w: 330, h: 230, x: 635, pool: 'orange', Art: Garage },
  arcade: { id: 'arcade', w: 240, h: 290, x: 1010, pool: 'lime', Art: Arcade },
  nightclub: { id: 'nightclub', w: 240, h: 360, x: 1292, pool: 'violet', Art: NightClub },
};

