/** Station presets for Vice Radio (kept apart so the UI does not pull in the audio engine). */
export interface Station {
  id: string;
  freq: string;
  name: string;
  bpm: number;
  root: number; // MIDI note of the key centre
  progression: number[][]; // chords as semitone offsets from root
  arp: number[]; // indexes into the chord (with octave wrap)
  swing: number;
}

export const STATIONS: Station[] = [
  {
    id: 'night-drive',
    freq: '88.1',
    name: 'VICE FM · Night Drive',
    bpm: 96,
    root: 57, // A3
    progression: [
      [0, 3, 7],
      [-4, 0, 3],
      [3, 7, 10],
      [-2, 2, 5],
    ], // Am F C G
    arp: [0, 1, 2, 3, 2, 1, 0, 2],
    swing: 0,
  },
  {
    id: 'neon-coast',
    freq: '101.5',
    name: 'NEON COAST · Sunset Mix',
    bpm: 108,
    root: 52, // E3
    progression: [
      [0, 4, 7, 11],
      [5, 9, 12, 16],
      [-3, 0, 4, 7],
      [2, 5, 9, 12],
    ], // Emaj7 Amaj7 C#m F#m-ish
    arp: [0, 2, 1, 3, 2, 0, 3, 1],
    swing: 0.08,
  },
];
