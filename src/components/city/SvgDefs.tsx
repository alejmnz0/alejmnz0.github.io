/**
 * Gradients and patterns shared by every SVG in the site (city scene, mobile
 * postcards, section headers, intro). Rendered once, visually hidden but not
 * display:none — Chrome does not resolve gradients inside display:none SVGs.
 */
const POOL_COLORS = { pink: '#ff4fd8', cyan: '#00e5ff', orange: '#ff8a4c', lime: '#c6ff5e', violet: '#a77bff' } as const;
export type PoolColor = keyof typeof POOL_COLORS;

export function SvgDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--sky-0)' }} />
          <stop offset="0.42" style={{ stopColor: 'var(--sky-1)' }} />
          <stop offset="0.72" style={{ stopColor: 'var(--sky-2)' }} />
          <stop offset="1" style={{ stopColor: 'var(--sky-3)' }} />
        </linearGradient>
        <linearGradient id="g-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe28a" />
          <stop offset="0.45" stopColor="#ff8a4c" />
          <stop offset="1" stopColor="#ff3fa4" />
        </linearGradient>
        <radialGradient id="g-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff9a5c" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#ff4fd8" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ff4fd8" stopOpacity="0" />
        </radialGradient>
        <mask id="m-sun-stripes" maskUnits="userSpaceOnUse" x="-300" y="-300" width="600" height="600">
          <rect x="-300" y="-300" width="600" height="600" fill="#fff" />
          {[18, 46, 70, 92, 112, 130, 146, 160, 172, 183].map((y, i) => (
            <rect key={y} x="-300" y={y} width="600" height={3 + i * 1.15} fill="#000" />
          ))}
        </mask>
        <linearGradient id="g-ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--sea-0)' }} />
          <stop offset="1" style={{ stopColor: 'var(--sea-1)' }} />
        </linearGradient>
        <linearGradient id="g-reflect" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff4fd8" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffb36b" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ff4fd8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g-bld-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a2380" />
          <stop offset="1" stopColor="#1a0e38" />
        </linearGradient>
        <linearGradient id="g-bld-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c2569a" />
          <stop offset="1" stopColor="#3d1a5c" />
        </linearGradient>
        <linearGradient id="g-bld-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23336b" />
          <stop offset="1" stopColor="#120f30" />
        </linearGradient>
        <linearGradient id="g-bld-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f1d62" />
          <stop offset="1" stopColor="#140b2e" />
        </linearGradient>
        <linearGradient id="g-bld-d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a1458" />
          <stop offset="1" stopColor="#170a2c" />
        </linearGradient>
        <linearGradient id="g-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c3f8f" />
          <stop offset="0.5" stopColor="#1b1d55" />
          <stop offset="1" stopColor="#120d33" />
        </linearGradient>
        <linearGradient id="g-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff8a4c" stopOpacity="0" />
          <stop offset="1" stopColor="#ff8a4c" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="g-rim-l" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#ff8a4c" stopOpacity="0" />
          <stop offset="1" stopColor="#ff8a4c" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="g-garage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffcf8a" />
          <stop offset="1" stopColor="#ff6aa8" />
        </linearGradient>
        <linearGradient id="g-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00e5ff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ff4fd8" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="g-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g-headlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="g-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd36b" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffd36b" stopOpacity="0" />
        </radialGradient>
        {Object.entries(POOL_COLORS).map(([k, c]) => (
          <g key={k}>
            <radialGradient id={`g-pool-${k}`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={c} stopOpacity="0.5" />
              <stop offset="1" stopColor={c} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`g-streak-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={c} stopOpacity="0.5" />
              <stop offset="1" stopColor={c} stopOpacity="0" />
            </linearGradient>
          </g>
        ))}
        <pattern id="p-windows" width="16" height="20" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="9" height="11" fill="#33408a" opacity="0.55" />
        </pattern>
      </defs>
    </svg>
  );
}
