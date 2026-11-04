import Link from 'next/link';
import Icon from '@/components/Icon';
import { requireAdmin } from '@/lib/auth';
import { MODS } from '@/lib/mods';
import { dmy } from '@/lib/util';
import { Stars } from '@/components/Cards';

export default async function Dashboard() {
  const { sb } = await requireAdmin();
  const [{ data: items }, { data: sugg }] = await Promise.all([
    sb.from('items').select('id,type,title,tagline,rating,image_url,created_at').order('created_at', { ascending: false }),
    sb.from('suggestions').select('*').order('created_at', { ascending: false }),
  ]);
  const all = items || [];
  const sg = sugg || [];
  const count = (k) => (k === 'buzon' ? sg.length : all.filter((i) => MODS[k].types.includes(i.type)).length);
  const pending = sg.filter((s) => s.status === 'pending').length;
  const reviews = all.filter((i) => i.type === 'review').slice(0, 3);

  return (
    <>
      <section className="panel">
        <span className="live">
          <i className="dot" style={{ width: 12, height: 12 }} />
          Panel de control central · Proyecto Urbano
        </span>
        <h2>
          Gestión de Contenido <em>Integral</em>
        </h2>
        <p className="s">
          Administrá cada sección del sitio dividida por colores. Todo lo que guardes se publica en tu sitio en menos de un minuto.
        </p>
        <div className="stat">
          <div className="r">
            <strong>Estado</strong>
            <span className="pill">
              <i className="dot" style={{ width: 10, height: 10 }} />
              Conectado
            </span>
          </div>
          <p>{pending ? `Tenés ${pending} sugerencia${pending === 1 ? '' : 's'} sin revisar.` : 'No tenés sugerencias pendientes.'}</p>
          <Link href="/admin/buzon">
            Ver buzón <Icon n="arrow" s={18} />
          </Link>
        </div>
      </section>

      <div className="sec" style={{ marginTop: 44 }}>
        <h2>Módulos del sistema</h2>
        <span>(dividido por colores)</span>
      </div>
      <div className="modbox" style={{ marginTop: 0 }}>
        {Object.entries(MODS).map(([k, m]) => (
          <article className="mod" key={k} style={{ '--c': `var(${m.color})` }}>
            <div className="t">
              <span className="ib2">
                <Icon n={m.icon} s={32} />
              </span>
              <span className="n">{count(k)}</span>
            </div>
            <h3>{m.label}</h3>
            <p>{k === 'buzon' ? `${pending} sugerencias nuevas recibidas` : m.desc}</p>
            <div className="a">
              <Link className="btn" href={`/admin/${k}`}>
                Administrar <Icon n="arrow" s={18} />
              </Link>
              {m.types.length ? (
                <Link className="btn add" href={m.types.length === 1 ? `/admin/${k}/nuevo?tipo=${m.types[0]}` : `/admin/${k}`} aria-label={`Agregar en ${m.label}`}>
                  <Icon n="plus" s={22} />
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="two">
        <section className="box" style={{ '--c': 'var(--c-rev)' }}>
          <div className="h">
            <h3>
              <i />
              Últimas Críticas
            </h3>
            <Link href="/admin/criticas">Ver todas ({count('criticas')})</Link>
          </div>
          {reviews.length ? (
            reviews.map((r) => (
              <div className="li" key={r.id}>
                <span className="th" style={r.image_url ? { backgroundImage: `url("${r.image_url}")` } : undefined} />
                <div className="tx">
                  <b>{r.title}</b>
                  <small>{r.tagline}</small>
                </div>
                {r.rating != null ? <Stars r={Number(r.rating)} /> : null}
              </div>
            ))
          ) : (
            <div className="empty">Todavía no cargaste críticas.</div>
          )}
        </section>
        <section className="box" style={{ '--c': 'var(--c-buz)' }}>
          <div className="h">
            <h3>
              <i />
              Sugerencias del Público
            </h3>
            <Link href="/admin/buzon">Ver buzón ({sg.length})</Link>
          </div>
          {sg.slice(0, 2).length ? (
            sg.slice(0, 2).map((s) => (
              <div className="li" key={s.id}>
                <div className="tx">
                  <span className={'sp' + (s.status === 'pending' ? ' pe' : '')}>{s.status === 'pending' ? 'Pendiente' : 'Revisada'}</span>
                  <b style={{ marginTop: 8, fontWeight: 600 }}>{s.text}</b>
                  <small>{dmy(s.created_at)}</small>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">Todavía no llegaron sugerencias.</div>
          )}
        </section>
      </div>
    </>
  );
}
