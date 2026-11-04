'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Icon from './Icon';
import { MODS } from '@/lib/mods';
import { signOut } from '@/app/admin/actions';

export default function AdminShell({ email, children }) {
  const [open, setOpen] = useState(false);
  const path = usePathname() || '/admin';
  const nav = [['/admin', 'Dashboard General', 'grid'], ...Object.entries(MODS).map(([k, m]) => [`/admin/${k}`, m.label, m.icon])];
  const active = (href) => (href === '/admin' ? path === '/admin' : path === href || path.startsWith(href + '/'));
  const current = nav.find(([h]) => active(h));

  return (
    <div id="adm">
      <aside className={'side' + (open ? ' open' : '')} aria-label="Menú del administrador">
        <div className="side-h">
          <Logo sky={false} href="/admin" />
          <span className="admtag">ADMIN</span>
        </div>
        <nav>
          <h4>Módulos divididos por color</h4>
          {nav.map(([href, label, icon]) => (
            <Link key={href} href={href} className={'nv' + (active(href) ? ' on' : '')} aria-current={active(href) ? 'page' : undefined} onClick={() => setOpen(false)}>
              <span className="l">
                <Icon n={icon} s={22} />
                {label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="side-f">
          <div className="mini" style={{ marginBottom: 10 }}>
            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</span>
          </div>
          <form action={signOut}>
            <button className="btn logout" type="submit">
              <Icon n="logout" s={18} />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      {open ? <div className="scrim" onClick={() => setOpen(false)} /> : null}
      <div className="main">
        <div className="atop">
          <div className="wrap">
            <button type="button" className="ib sq" id="admMenu" aria-label="Abrir menú" onClick={() => setOpen(true)}>
              <Icon n="menu" s={22} />
            </button>
            <span className="pillgold">{current ? current[1] : 'Administración'}</span>
            <Link className="btn" href="/" target="_blank">
              Ver sitio <Icon n="ext" s={17} />
            </Link>
          </div>
        </div>
        <div className="wrap abody">{children}</div>
      </div>
    </div>
  );
}
