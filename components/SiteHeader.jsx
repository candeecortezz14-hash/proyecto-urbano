'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Icon from './Icon';
import { useTickets, toggleTicket } from '@/lib/tickets';

const NAV = [
  ['/', 'Inicio', 'film'],
  ['/criticas', 'Críticas & Reseñas', 'star'],
  ['/videos', 'Videos', 'video'],
  ['/analisis', 'Análisis', 'edit'],
  ['/#comunidad', 'Comunidad & Debates', 'chat'],
  ['/#retro', 'Retro Lab', 'term'],
  ['/#buzon', 'Buzón de sugerencias', 'inbox'],
];

export default function SiteHeader() {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const tickets = useTickets();

  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  return (
    <>
      <header className="top">
        <div className="wrap bar">
          <Logo />
          <div className="bar-r">
            <button type="button" className="ib" aria-label="Buscar" aria-expanded={search} onClick={() => setSearch((v) => !v)}>
              <Icon n="search" s={20} />
            </button>
            <button type="button" className="ib sq" aria-label="Menú y tickets" onClick={() => setMenu(true)}>
              <Icon n="menu" s={22} />
              {tickets.length ? <span className="badge">{tickets.length}</span> : null}
            </button>
          </div>
        </div>
        {search ? (
          <form className="wrap" id="searchRow" action="/buscar" method="get" role="search">
            <input className="inp" name="q" type="search" placeholder="Buscar películas, escenas o análisis" autoComplete="off" autoFocus />
          </form>
        ) : null}
      </header>

      {menu ? (
        <>
          <div className="scrim" onClick={() => setMenu(false)} />
          <aside className="drawer" role="dialog" aria-label="Menú">
            <button type="button" className="xbtn" onClick={() => setMenu(false)} aria-label="Cerrar">
              <Icon n="x" s={18} />
            </button>
            <h4>Secciones</h4>
            {NAV.map(([href, label, icon]) => (
              <Link key={href} href={href} className="nv" onClick={() => setMenu(false)}>
                <span className="l">
                  <Icon n={icon} s={20} />
                  {label}
                </span>
              </Link>
            ))}
            <h4>Mis tickets</h4>
            {tickets.length ? (
              tickets.map((t) => (
                <div key={t.id} className="tkrow">
                  {t.href ? (
                    <Link href={t.href} onClick={() => setMenu(false)}>
                      {t.title}
                    </Link>
                  ) : (
                    <span>{t.title}</span>
                  )}
                  <button type="button" className="sbtn" aria-label="Quitar de mi lista" onClick={() => toggleTicket(t)}>
                    <Icon n="x" s={16} />
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--muted)', margin: 0 }}>Tocá +TICKET en una película para guardarla acá.</p>
            )}
          </aside>
        </>
      ) : null}
    </>
  );
}
