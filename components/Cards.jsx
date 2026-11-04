import Link from 'next/link';
import Icon from './Icon';
import TicketButton from './TicketButton';
import { fmtDate } from '@/lib/util';

const tk = (c) => ({ id: c.id, title: c.title || c.text, href: c.href });
const bgStyle = (c) => ({ backgroundImage: c.thumb ? `url("${c.thumb.replace(/"/g, '%22')}")` : c.bg });

export function Stars({ r }) {
  return (
    <span className="stars">
      <Icon n="star" s={16} fill />
      {String(r)}
    </span>
  );
}

function Title({ c, className = 'ctitle' }) {
  return <h3 className={className}>{c.href ? <Link href={c.href}>{c.title}</Link> : c.title}</h3>;
}

export function Card({ c }) {
  if (c.type === 'video') {
    return (
      <article className="card dark">
        <div className="thumb" style={bgStyle(c)}>
          {c.href ? (
            <Link href={c.href} className="playi" aria-label={`Ver ${c.title}`}>
              <span>
                <Icon n="play" s={22} />
              </span>
            </Link>
          ) : (
            <div className="playi">
              <span>
                <Icon n="play" s={22} />
              </span>
            </div>
          )}
          <div className="over">
            <span className="pill">{c.cat || 'Video'}</span>
            <span className="r">
              <TicketButton item={tk(c)} />
              {c.duration ? (
                <span className="pill m">
                  <Icon n="play" s={13} />
                  {c.duration}
                </span>
              ) : null}
            </span>
          </div>
        </div>
        <div className="cbody">
          <Title c={c} />
        </div>
      </article>
    );
  }
  if (c.type === 'post') {
    return (
      <article className="card post">
        <div className="row">
          <span className="pill">{c.cat || 'Análisis'}</span>
          <span className="r2">
            <TicketButton item={tk(c)} />
            {c.date ? <span className="pill m">{fmtDate(c.date)}</span> : null}
          </span>
        </div>
        <Title c={c} />
        <p className="cdesc">{c.excerpt}</p>
      </article>
    );
  }
  if (c.type === 'quote') {
    return (
      <article className="card quote">
        <Icon n="film" s={44} />
        <q>{c.text}</q>
        <hr />
        <cite>{c.source}</cite>
      </article>
    );
  }
  if (c.type === 'review') {
    return (
      <article className="card">
        <div className="rv">
          <div className="sq" style={bgStyle(c)} role="img" aria-label={c.title} />
          <div style={{ minWidth: 0 }}>
            <Title c={c} className="ctitle sm" />
            <p className="cdesc">{c.tagline}</p>
          </div>
        </div>
        <div className="cbody nt">
          {c.snippet ? <p className="cdesc">{c.snippet}…</p> : null}
          <div className="row">
            <span className="pill">Crítica</span>
            <span className="r2">
              {c.rating != null ? <Stars r={c.rating} /> : null}
              <TicketButton item={tk(c)} />
            </span>
          </div>
        </div>
      </article>
    );
  }
  return null;
}

export function AdCard({ ad }) {
  const rel = 'noopener sponsored';
  if (ad.format === 'imagen' && ad.image) {
    const pic = <img className="adpic" src={ad.image} alt={ad.title} loading="lazy" />;
    return (
      <article className="card adimg">
        {ad.url ? (
          <a href={ad.url} target="_blank" rel={rel} aria-label={`Publicidad: ${ad.title}`}>
            {pic}
          </a>
        ) : (
          pic
        )}
        <span className="pill adl adtag">Publicidad</span>
      </article>
    );
  }
  return (
    <article className="card ad adb">
      {ad.image ? <div className="thumb" style={{ backgroundImage: `url("${ad.image.replace(/"/g, '%22')}")` }} /> : null}
      <div className="cbody">
        <span className="pill adl">Publicidad</span>
        <h3 className="ctitle">{ad.title}</h3>
        {ad.text ? <p className="cdesc">{ad.text}</p> : null}
        {ad.url ? (
          <a className="btn btn-sm btn-gold" href={ad.url} target="_blank" rel={rel}>
            {ad.cta || 'Ver más'}
            <Icon n="ext" s={15} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function AdSlot({ ad }) {
  if (!ad) return null;
  return (
    <div className="adslot">
      <AdCard ad={ad} />
    </div>
  );
}
