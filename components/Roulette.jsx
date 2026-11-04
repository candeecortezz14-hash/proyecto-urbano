'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import TicketButton from './TicketButton';

export function OpenRouletteButton() {
  return (
    <button type="button" className="roulette" onClick={() => window.dispatchEvent(new Event('pu-roulette'))}>
      <svg className="dice" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#fffaf0" stroke="#1a1200" strokeWidth="2.5" />
        <circle cx="15" cy="15" r="3.6" fill="#1a1200" />
        <circle cx="24" cy="24" r="3.6" fill="#c8102e" />
        <circle cx="33" cy="33" r="3.6" fill="#1a1200" />
        <circle cx="33" cy="15" r="3.6" fill="#1a1200" />
        <circle cx="15" cy="33" r="3.6" fill="#1a1200" />
      </svg>
      <strong>¿Qué veo hoy? • Ruleta de celuloide</strong>
      <span className="tag">INTERACTIVO</span>
    </button>
  );
}

export default function RouletteHost({ pool }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Tirá los dados');
  const [pick, setPick] = useState(null);
  const [done, setDone] = useState(false);
  const timer = useRef(0);

  const spin = useCallback(() => {
    clearTimeout(timer.current);
    if (!pool.length) return;
    setPick(null);
    setDone(false);
    const final = pool[Math.floor(Math.random() * pool.length)];
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setTitle(final.title);
      setPick(final);
      setDone(true);
      return;
    }
    let n = 0;
    const total = 20 + Math.floor(Math.random() * 8);
    let delay = 45;
    const step = () => {
      if (n >= total) {
        setTitle(final.title);
        setPick(final);
        setDone(true);
        return;
      }
      setTitle(pool[Math.floor(Math.random() * pool.length)].title);
      n++;
      delay += n > total - 8 ? 38 : 4;
      timer.current = setTimeout(step, delay);
    };
    step();
  }, [pool]);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      spin();
    };
    window.addEventListener('pu-roulette', onOpen);
    return () => {
      window.removeEventListener('pu-roulette', onOpen);
      clearTimeout(timer.current);
    };
  }, [spin]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function close() {
    clearTimeout(timer.current);
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div className="ov" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="dlg" role="dialog" aria-modal="true" aria-label="Ruleta de celuloide">
        <button type="button" className="xbtn" onClick={close} aria-label="Cerrar">
          <Icon n="x" s={18} />
        </button>
        <p className="eyebrow">Ruleta de celuloide</p>
        <h3>¿Qué veo hoy?</h3>
        <div className={'reel' + (done ? ' stop' : '')} aria-live="polite">
          {pool.length ? title : 'Todavía no hay películas para sortear'}
        </div>
        {pick ? (
          <div className="card dark" style={{ marginBottom: 16 }}>
            <div className="cbody">
              <span className="pill" style={{ alignSelf: 'flex-start' }}>
                {pick.cat}
              </span>
              <h3 className="ctitle">{pick.title}</h3>
              {pick.tagline || pick.excerpt ? <p className="cdesc">{pick.tagline || pick.excerpt}</p> : null}
              <div className="r2">
                {pick.href ? (
                  <Link className="btn btn-sm btn-gold" href={pick.href} onClick={close}>
                    Ver ahora <Icon n="arrow" s={15} />
                  </Link>
                ) : null}
                <TicketButton item={{ id: pick.id, title: pick.title, href: pick.href }} />
              </div>
            </div>
          </div>
        ) : null}
        <button type="button" className="btn btn-gold" onClick={spin}>
          <Icon n="film" s={18} />
          Girar de nuevo
        </button>
      </div>
    </div>
  );
}
