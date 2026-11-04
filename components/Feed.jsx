'use client';

import { Fragment, useState } from 'react';
import Icon from './Icon';
import { Card, AdCard } from './Cards';
import { openRoulette } from '@/lib/tickets';

export default function Feed({ cards, ads }) {
  const [cat, setCat] = useState('TODO');
  const cats = [...new Map(cards.filter((c) => c.cat).map((c) => [c.cat.toLowerCase(), c.cat])).values()];
  const list = cat === 'TODO' ? cards : cards.filter((c) => c.cat.toLowerCase() === cat.toLowerCase());
  let used = 0;
  return (
    <>
      <nav className="chips" aria-label="Filtrar por categoría">
        <button type="button" className="chip rl" onClick={openRoulette}>
          <Icon n="film" s={18} />
          Ruleta
        </button>
        <button type="button" className={'chip' + (cat === 'TODO' ? ' on' : '')} onClick={() => setCat('TODO')}>
          Todo
        </button>
        {cats.map((c) => (
          <button key={c} type="button" className={'chip' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </nav>
      <section className="grid" aria-live="polite">
        {list.length === 0 ? <div className="empty">Todavía no hay contenido en esta categoría.</div> : null}
        {list.map((c, i) => {
          const showAd = (i + 1) % 4 === 0 && used < ads.length;
          const ad = showAd ? ads[used++] : null;
          return (
            <Fragment key={c.id}>
              <Card c={c} />
              {ad ? <AdCard ad={ad} /> : null}
            </Fragment>
          );
        })}
      </section>
    </>
  );
}
