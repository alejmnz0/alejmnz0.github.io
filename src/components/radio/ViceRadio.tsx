import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Radio, SkipForward, Volume2, VolumeX, X } from 'lucide-react';
import { STATIONS } from './stations';
import type { SynthRadio } from './synth';
import s from './ViceRadio.module.css';

/** Fictional 80s radio. Off by default; audio engine is lazy-loaded on first Play. */
export function ViceRadio() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [stationIdx, setStationIdx] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [beat, setBeat] = useState(0);
  const engine = useRef<SynthRadio | null>(null);
  const station = STATIONS[stationIdx];

  useEffect(() => () => engine.current?.dispose(), []);

  const toggle = async () => {
    if (playing) {
      engine.current?.pause();
      setPlaying(false);
      return;
    }
    if (!engine.current) {
      const { SynthRadio } = await import('./synth');
      engine.current = new SynthRadio();
      engine.current.onBeat = (b) => setBeat(b);
    }
    engine.current.setStation(station);
    engine.current.setVolume(volume);
    engine.current.setMuted(muted);
    await engine.current.play();
    setPlaying(true);
  };

  const nextStation = () => {
    const i = (stationIdx + 1) % STATIONS.length;
    setStationIdx(i);
    engine.current?.setStation(STATIONS[i]);
  };

  return (
    <div className={s.root} data-open={open || undefined} data-playing={playing || undefined}>
      {open && (
        <section className={s.panel} aria-label="Vice Radio">
          <header className={s.head}>
            <span className={s.brand}>
              <Radio size={14} aria-hidden="true" /> Vice Radio
            </span>
            <button type="button" className={s.iconBtn} onClick={() => setOpen(false)} aria-label="Cerrar radio">
              <X size={16} />
            </button>
          </header>
          <div className={s.display}>
            <span className={s.freq}>{station.freq}</span>
            <span className={s.fm}>FM</span>
            <div className={s.marquee}>
              <span>{station.name} · synthwave generativo, hecho en tu navegador · </span>
            </div>
            <div className={s.eq} aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i} style={{ '--h': playing ? `${20 + (((i * 37 + beat * 53) % 80) | 0)}%` : '12%' } as React.CSSProperties} />
              ))}
            </div>
          </div>
          <div className={s.controls}>
            <button type="button" className={s.play} onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'} aria-pressed={playing}>
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button type="button" className={s.iconBtn} onClick={nextStation} aria-label="Siguiente emisora">
              <SkipForward size={18} />
            </button>
            <button
              type="button"
              className={s.iconBtn}
              onClick={() => {
                setMuted(!muted);
                engine.current?.setMuted(!muted);
              }}
              aria-label={muted ? 'Activar sonido' : 'Silenciar'}
              aria-pressed={muted}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              className={s.volume}
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              aria-label="Volumen"
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                engine.current?.setVolume(v);
              }}
            />
          </div>
        </section>
      )}
      <button type="button" className={s.fab} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Ocultar Vice Radio' : 'Abrir Vice Radio'}>
        <Radio size={20} aria-hidden="true" />
        <span className={s.fabText}>{playing ? `${station.freq} FM` : 'Radio'}</span>
      </button>
    </div>
  );
}
