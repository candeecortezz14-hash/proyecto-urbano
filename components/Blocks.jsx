import Link from 'next/link';
import { Card, AdCard } from './Cards';

export function FxBox({ effect }) {
  if (effect === 'vhs')
    return (
      <div className="fxbox fx-vhs">
        <b data-t="REC ● 00:42:13">REC ● 00:42:13</b>
      </div>
    );
  if (effect === 'term')
    return (
      <div className="fxbox fx-term">
        <span>
          &gt; proyecto_urbano --play<i />
        </span>
      </div>
    );
  return (
    <div className="fxbox fx-crt">
      <span>SEÑAL OK 1982</span>
    </div>
  );
}

export function DebateCard({ c }) {
  const p = c.kind === 'proyeccion';
  return (
    <article className="card post">
      <div className="row">
        <span className={'kind' + (p ? ' pr' : '')}>{p ? 'Proyección' : 'Debate'}</span>
        {c.when ? <span className="pill m">{c.when}</span> : null}
      </div>
      <h3 className="ctitle">{c.title}</h3>
      <p className="cdesc">{c.descr}</p>
    </article>
  );
}

export function RetroCard({ c }) {
  return (
    <article className="card post">
      <FxBox effect={c.effect} />
      <h3 className="ctitle">{c.title}</h3>
      <p className="cdesc">{c.descr}</p>
    </article>
  );
}

export function Section({ id, title, note, children }) {
  return (
    <>
      <div className="sec" id={id}>
        <h2>{title}</h2>
        {note ? <span>{note}</span> : null}
      </div>
      {children}
    </>
  );
}

export function Listing({ title, intro, cards, empty = 'Todavía no hay nada publicado en esta sección.', ad }) {
  return (
    <main className="wrap">
      <header className="hub">
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <section className="grid" style={{ marginTop: 22 }}>
        {cards.length ? cards.map((c) => <Card key={c.id} c={c} />) : <div className="empty">{empty}</div>}
        {ad ? <AdCard ad={ad} /> : null}
      </section>
    </main>
  );
}

export function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Ruta">
      {items.map(([href, label], i) => (
        <span key={label}>
          {href ? <Link href={href}>{label}</Link> : label}
          {i < items.length - 1 ? ' /' : ''}
        </span>
      ))}
    </nav>
  );
}
