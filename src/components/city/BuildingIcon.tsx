import type { LocationId } from '../../config/locations';
import { buildings } from './buildings';

/** Standalone SVG of one building (postcards, section headers). */
export function BuildingIcon({ id, className, title }: { id: LocationId; className?: string; title?: string }) {
  const b = buildings[id];
  const pad = id === 'nightclub' ? 70 : 10;
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${b.w + pad * 2} ${b.h + pad}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      preserveAspectRatio="xMidYMax meet"
    >
      <b.Art />
    </svg>
  );
}
