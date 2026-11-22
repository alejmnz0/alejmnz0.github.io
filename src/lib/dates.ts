import type { MonthYear } from '../data/types';


const MONTHS = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.'];

/** Build-time "today" so prerendered HTML and hydrated client always agree. */
export const NOW: MonthYear = (() => {
  const d = new Date(typeof __BUILD_DATE__ === 'string' ? __BUILD_DATE__ : Date.now());
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
})();

export const fmtMonth = (m: MonthYear) => `${MONTHS[m.month - 1]} ${m.year}`;

export const fmtRange = (start: MonthYear, end: MonthYear | null) => `${fmtMonth(start)} – ${end ? fmtMonth(end) : 'actualidad'}`;

export function duration(start: MonthYear, end: MonthYear | null) {
  const e = end ?? NOW;
  const months = (e.year - start.year) * 12 + (e.month - start.month) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} ${y === 1 ? 'año' : 'años'}`);
  if (m) parts.push(`${m} ${m === 1 ? 'mes' : 'meses'}`);
  return parts.join(' y ');
}

export const isoMonth = (m: MonthYear) => `${m.year}-${String(m.month).padStart(2, '0')}`;
