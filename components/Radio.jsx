'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const CH = [
  [110, 164.81, 196, 261.63, 329.63],
  [87.31, 130.81, 174.61, 261.63, 329.63],
  [130.81, 196, 246.94, 329.63, 392],
  [98, 146.83, 196, 246.94, 293.66],
];

// Música ambiental generada en el navegador: no usa archivos ni derechos de autor.
export default function Radio() {
  const [on, setOn] = useState(false);
  const r = useRef({ ac: null, fx: null, timer: 0, step: 0 });

  function tone(f, t, d, atk, type, vol) {
    const { ac, fx } = r.current;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + atk);
    g.gain.linearRampToValueAtTime(0.0001, t + d);
    o.connect(g);
    g.connect(fx);
    o.start(t);
    o.stop(t + d + 0.05);
  }

  function tick() {
    const s = r.current;
    const t = s.ac.currentTime + 0.05;
    const i = s.step++;
    const ch = CH[Math.floor(i / 8) % CH.length];
    if (i % 8 === 0) ch.slice(0, 4).forEach((f, k) => tone(f, t, 4.4, 1.3, 'triangle', k === 0 ? 0.07 : 0.045));
    if (Math.random() < 0.65) tone(ch[Math.floor(Math.random() * ch.length)] * 2, t, 0.9, 0.02, 'sine', 0.06);
  }

  function start() {
    const s = r.current;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      if (!s.ac) {
        s.ac = new AC();
        const master = s.ac.createGain();
        master.gain.value = 0.5;
        master.connect(s.ac.destination);
        const lp = s.ac.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 1100;
        const dl = s.ac.createDelay(1);
        dl.delayTime.value = 0.42;
        const fb = s.ac.createGain();
        fb.gain.value = 0.38;
        lp.connect(master);
        lp.connect(dl);
        dl.connect(fb);
        fb.connect(dl);
        dl.connect(master);
        s.fx = lp;
      }
      s.ac.resume();
      s.step = 0;
      s.timer = setInterval(tick, 500);
      tick();
      return true;
    } catch {
      return false;
    }
  }

  function stop() {
    const s = r.current;
    clearInterval(s.timer);
    if (s.ac) {
      try {
        s.ac.suspend();
      } catch {}
    }
  }

  useEffect(() => () => stop(), []);

  function toggle() {
    if (on) {
      stop();
      setOn(false);
    } else {
      setOn(start());
    }
  }

  return (
    <aside className={'radio' + (on ? ' playing' : '')} aria-label="Radio Noir">
      <span className="vinyl">
        <i className="dot" />
      </span>
      <div>
        <small>RADIO NOIR</small>
        <b>Neon Noir 1982</b>
      </div>
      <span className="eq" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <button type="button" className="go" onClick={toggle} aria-label={on ? 'Pausar Radio Noir' : 'Reproducir Radio Noir'}>
        <Icon n={on ? 'pause' : 'play'} s={18} />
      </button>
    </aside>
  );
}
