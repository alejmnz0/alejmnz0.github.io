/** Small original illustrations shared by the page: palm silhouette, striped sun, brand icons. */

const FRONDS = [-168, -140, -112, -80, -48, -18, 12];

export function Palm({ className, height = 520, lean = 60, color = '#07030f' }: { className?: string; height?: number; lean?: number; color?: string }) {
  const L = height * 0.44;
  const w = height * 0.045;
  const fronds = FRONDS.map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const len = L * (i % 2 ? 0.9 : 1);
    const ex = Math.cos(a) * len;
    const ey = Math.sin(a) * len + len * 0.42 * Math.abs(Math.cos(a));
    const c1 = [Math.cos(a) * len * 0.5, Math.sin(a) * len * 0.5 - len * 0.22];
    const c2 = [Math.cos(a) * len * 0.55, Math.sin(a) * len * 0.55 - len * 0.02];
    return `M0 0Q${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}Q${c2[0].toFixed(1)} ${c2[1].toFixed(1)} 0 0Z`;
  });
  const pad = L * 1.1;
  return (
    <svg className={className} viewBox={`${-pad + Math.min(0, lean)} ${-height - L * 0.7} ${pad * 2 + Math.abs(lean)} ${height + L * 0.7}`} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <path d={`M${-w / 2} 0Q${lean * 0.5} ${-height * 0.55} ${lean} ${-height}L${lean + w * 0.5} ${-height}Q${lean * 0.5 + w} ${-height * 0.55} ${w / 2} 0Z`} fill={color} />
      <g transform={`translate(${lean} ${-height})`} fill={color}>
        {fronds.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <circle r={w * 0.9} />
      </g>
    </svg>
  );
}

/** Retro sun with horizontal cut stripes in its lower half. */
export function StripedSun({ className, id = 'sun' }: { className?: string; id?: string }) {
  const stripes = [104, 122, 138, 152, 165, 176, 186];
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.45" stopColor="#ff9a5c" />
          <stop offset="0.75" stopColor="#ff6b8b" />
          <stop offset="1" stopColor="#ff4fd8" />
        </linearGradient>
        <mask id={`${id}-m`}>
          <rect width="200" height="200" fill="#fff" />
          {stripes.map((y, i) => (
            <rect key={y} y={y} width="200" height={2 + i * 1.3} fill="#000" />
          ))}
        </mask>
      </defs>
      <circle cx="100" cy="100" r="100" fill={`url(#${id}-g)`} mask={`url(#${id}-m)`} />
    </svg>
  );
}

type IconProps = { size?: number };

export function GithubIcon({ size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
