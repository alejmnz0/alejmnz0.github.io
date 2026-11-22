import type { Project } from '../../data/types';

const initials = (name: string) =>
  (name.match(/[A-Z0-9]/g) ?? [name[0]]).slice(0, 2).join('') || name.slice(0, 2).toUpperCase();

/** Generated cover art for projects without screenshots: synthwave horizon + outlined monogram. */
export function ProjectCover({ project, className }: { project: Project; className?: string }) {
  const h = project.hue;
  const id = `pc-${project.id}`;
  return (
    <svg viewBox="0 0 640 400" className={className} role="img" aria-label={`Portada ilustrada de ${project.name}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${h} 70% 9%)`} />
          <stop offset="0.6" stopColor={`hsl(${(h + 300) % 360} 55% 20%)`} />
          <stop offset="1" stopColor={`hsl(${(h + 330) % 360} 80% 38%)`} />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />
      <g transform="translate(320 250) scale(0.62)">
        <circle r="200" fill="url(#g-sun)" mask="url(#m-sun-stripes)" opacity="0.92" />
      </g>
      <text
        x="320"
        y="215"
        textAnchor="middle"
        style={{ fontFamily: 'var(--f-display)' }}
        fontWeight="900"
        fontSize="190"
        fill="none"
        stroke={`hsl(${h} 100% 70%)`}
        strokeWidth="3"
        opacity="0.9"
      >
        {initials(project.name)}
      </text>
      <rect y="250" width="640" height="150" fill={`hsl(${h} 60% 6%)`} />
      <g stroke={`hsl(${h} 100% 62%)`} strokeWidth="1.2" opacity="0.55">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2="640" y1={250 + i * i * 1.85} y2={250 + i * i * 1.85} />
        ))}
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={320 + (i - 8) * 26} y1="250" x2={320 + (i - 8) * 150} y2="400" />
        ))}
      </g>
      <text x="320" y="300" textAnchor="middle" style={{ fontFamily: 'var(--f-mono)' }} fontSize="16" letterSpacing="5" fill={`hsl(${h} 100% 80%)`}>
        {project.category.toUpperCase()} · {project.year}
      </text>
    </svg>
  );
}
