'use client';

import { useRef, useState } from 'react';
import { OpenRouletteButton } from './Roulette';

export default function Hero() {
  const [lit, setLit] = useState(false);
  const [dy, setDy] = useState(0);
  const [drag, setDrag] = useState(false);
  const startY = useRef(0);
  const moved = useRef(0);

  const down = (e) => {
    setDrag(true);
    startY.current = e.clientY;
    moved.current = 0;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
  };
  const move = (e) => {
    if (!drag) return;
    const v = Math.max(0, Math.min(72, e.clientY - startY.current));
    moved.current = v;
    setDy(v);
  };
  const end = () => {
    if (!drag) return;
    setDrag(false);
    if (moved.current > 38 || moved.current < 6) setLit((v) => !v);
    moved.current = 0;
    setDy(0);
  };
  const key = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setLit((v) => !v);
    }
  };

  return (
    <div className={lit ? 'lit' : ''}>
      <section className="hero">
        <span className="live">
          <i className="dot" />
          En vivo · Entretenimiento dorado
        </span>
        <div className="hero-top">
          <h1 className="big">Cine, historias &amp; entretenimiento.</h1>
          <div className="chain">
            <div className="bulb">
              <i />
            </div>
            <div className="cline" style={{ '--len': `${118 + dy}px` }} />
            <button
              type="button"
              className={'pull' + (drag ? ' drag' : '')}
              style={{ transform: dy ? `translateY(${dy}px)` : undefined }}
              aria-label="Tirar de la cadenita para prender la luz"
              aria-pressed={lit}
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={end}
              onPointerCancel={end}
              onKeyDown={key}
            >
              <span />
            </button>
            <span className="tip" style={{ opacity: lit ? 0 : 1 }}>
              ¡Estirá la cadenita!
            </span>
            <span className="cstate">TIRAR: {lit ? 'ON' : 'OFF'}</span>
          </div>
        </div>
        <p className="lede">
          La plataforma definitiva para los amantes del buen cine, clásicos de culto y las mejores historias para todo
          público. Bienvenido al archivo de <b>Proyecto Urbano</b>.
        </p>
        <OpenRouletteButton />
      </section>
    </div>
  );
}
