/**
 * A tiny generative synthwave engine built on the Web Audio API.
 * No audio files: every note is synthesised live, so there is nothing to license.
 * Only created after a user gesture (Play) — never autoplays.
 */

import type { Station } from './stations';
import { STATIONS } from './stations';

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

export class SynthRadio {
  private ctx: AudioContext;
  private master: GainNode;
  private bus: GainNode;
  private delay: DelayNode;
  private noise: AudioBuffer;
  private timer = 0;
  private step = 0;
  private nextTime = 0;
  private station: Station = STATIONS[0];
  private _volume = 0.6;
  private _muted = false;
  onBeat?: (step: number) => void;

  constructor() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this._volume * 0.5;
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    this.master.connect(comp).connect(this.ctx.destination);

    this.bus = this.ctx.createGain();
    this.bus.connect(this.master);

    // feedback delay = cheap "space"
    this.delay = this.ctx.createDelay(1);
    const fb = this.ctx.createGain();
    fb.gain.value = 0.32;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.28;
    const tone = this.ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 2400;
    this.delay.connect(tone).connect(fb).connect(this.delay);
    tone.connect(wet).connect(this.master);

    this.noise = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }

  get playing() {
    return this.timer !== 0;
  }

  setStation(st: Station) {
    this.station = st;
    this.delay.delayTime.setValueAtTime((60 / st.bpm) * 0.75, this.ctx.currentTime);
    this.step = 0;
  }

  setVolume(v: number) {
    this._volume = v;
    this.applyGain();
  }
  setMuted(m: boolean) {
    this._muted = m;
    this.applyGain();
  }
  private applyGain() {
    const target = this._muted ? 0 : this._volume * 0.5;
    this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
  }

  async play() {
    if (this.timer) return;
    await this.ctx.resume();
    this.setStation(this.station);
    this.nextTime = this.ctx.currentTime + 0.08;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  pause() {
    window.clearInterval(this.timer);
    this.timer = 0;
    void this.ctx.suspend();
  }

  dispose() {
    this.pause();
    void this.ctx.close();
  }

  private schedule() {
    const sixteenth = 60 / this.station.bpm / 4;
    while (this.nextTime < this.ctx.currentTime + 0.12) {
      const swing = this.step % 2 ? this.station.swing * sixteenth : 0;
      this.playStep(this.step, this.nextTime + swing, sixteenth);
      this.nextTime += sixteenth;
      this.step = (this.step + 1) % 64;
    }
  }

  private playStep(step: number, t: number, len: number) {
    const st = this.station;
    const bar = Math.floor(step / 16);
    const s = step % 16;
    const chord = st.progression[bar % st.progression.length];

    if (s === 0) chord.forEach((n) => this.pad(mtof(st.root + n), t, len * 16));
    if (s % 2 === 0) this.bass(mtof(st.root - 12 + chord[0]), t, len * 1.6, s % 4 === 0 ? 1 : 0.7);
    const a = st.arp[s % st.arp.length];
    const note = chord[a % chord.length] + 12 * (1 + Math.floor(a / chord.length));
    this.pluck(mtof(st.root + note), t, len);
    if (s === 0 || s === 8 || (s === 10 && bar % 2 === 1)) this.kick(t);
    if (s === 4 || s === 12) this.snare(t);
    if (s % 2 === 0) this.hat(t, s % 4 === 2 ? 0.16 : 0.08);

    if (this.onBeat && s % 4 === 0) {
      const delayMs = Math.max(0, (t - this.ctx.currentTime) * 1000);
      window.setTimeout(() => this.onBeat?.(s / 4), delayMs);
    }
  }

  private env(g: GainNode, t: number, a: number, peak: number, d: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  private pad(f: number, t: number, dur: number) {
    const g = this.ctx.createGain();
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(700, t);
    lp.frequency.linearRampToValueAtTime(1500, t + dur * 0.5);
    lp.connect(g).connect(this.bus);
    g.connect(this.delay);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.6);
    g.gain.setValueAtTime(0.05, t + dur - 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.2);
    for (const det of [-9, 0, 8]) {
      const o = this.ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      o.detune.value = det;
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.3);
    }
  }

  private bass(f: number, t: number, dur: number, vel: number) {
    const o = this.ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 6;
    lp.frequency.setValueAtTime(900, t);
    lp.frequency.exponentialRampToValueAtTime(160, t + dur);
    const g = this.ctx.createGain();
    this.env(g, t, 0.005, 0.22 * vel, dur);
    o.connect(lp).connect(g).connect(this.bus);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private pluck(f: number, t: number, len: number) {
    const o = this.ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = f;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, t);
    lp.frequency.exponentialRampToValueAtTime(600, t + len * 1.5);
    const g = this.ctx.createGain();
    this.env(g, t, 0.004, 0.05, len * 1.6);
    o.connect(lp).connect(g);
    g.connect(this.bus);
    g.connect(this.delay);
    o.start(t);
    o.stop(t + len * 2);
  }

  private kick(t: number) {
    const o = this.ctx.createOscillator();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    const g = this.ctx.createGain();
    this.env(g, t, 0.002, 0.9, 0.32);
    o.connect(g).connect(this.bus);
    o.start(t);
    o.stop(t + 0.4);
  }

  private snare(t: number) {
    const n = this.ctx.createBufferSource();
    n.buffer = this.noise;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1800;
    bp.Q.value = 0.7;
    const g = this.ctx.createGain();
    this.env(g, t, 0.002, 0.35, 0.22);
    n.connect(bp).connect(g);
    g.connect(this.bus);
    g.connect(this.delay);
    n.start(t);
    n.stop(t + 0.3);
    const o = this.ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(220, t);
    const og = this.ctx.createGain();
    this.env(og, t, 0.002, 0.18, 0.09);
    o.connect(og).connect(this.bus);
    o.start(t);
    o.stop(t + 0.12);
  }

  private hat(t: number, vel: number) {
    const n = this.ctx.createBufferSource();
    n.buffer = this.noise;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7500;
    const g = this.ctx.createGain();
    this.env(g, t, 0.001, vel, 0.045);
    n.connect(hp).connect(g).connect(this.bus);
    n.start(t);
    n.stop(t + 0.07);
  }
}
