import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import ConfirmButton from '@/components/ConfirmButton';
import { requireAdmin } from '@/lib/auth';
import { MODS } from '@/lib/mods';
import { TYPE_LABEL } from '@/lib/fields';
import { deleteItem, toggleSuggestion, deleteSuggestion } from '../../actions';
import { dmy, fmtDate } from '@/lib/util';

function meta(it) {
  if (it.type === 'review') return `${it.rating ?? ''} de 5`;
  if (it.type === 'video') return [it.cat, it.duration, it.url ? 'con enlace' : 'sin enlace'].filter(Boolean).join(' · ');
  if (it.type === 'post') return [it.cat, fmtDate(it.pub_date)].filter(Boolean).join(' · ');
  if (it.type === 'quote') return it.source || '';
  if (it.type === 'debate') return [it.kind === 'proyeccion' ? 'Proyección' : 'Debate activo', it.when_text].filter(Boolean).join(' · ');
  if (it.type === 'retro') return { crt: 'Scanlines CRT', vhs: 'Glitch VHS', term: 'Terminal verde' }[it.effect] || '';
  if (it.type === 'ad')
    return [
      it.format === 'imagen' ? 'Banner de imagen' : 'Tarjeta',
      it.placement === 'feed' ? 'Entre las tarjetas' : 'Entre secciones',
      it.active === false ? 'Pausado' : 'Activo',
      it.until ? `hasta ${dmy(it.until)}` : '',
    ]
      .filter(Boolean)
      .join(' · ');
  return '';
}

export default async function ModPage({ params, searchParams }) {
  const { mod } = await params;
  const sp = await searchParams;
  const m = MODS[mod];
  if (!m) notFound();
  const { sb } = await requireAdmin();
  const ok = sp && sp.ok;

  const banner = ok ? (
    <div className="note okmsg" role="status">
      {ok === '2' ? 'Borrado.' : 'Guardado. Ya está publicado en tu sitio.'}
    </div>
  ) : null;

  if (mod === 'buzon') {
    const { data } = await sb.from('suggestions').select('*').order('created_at', { ascending: false });
    const list = data || [];
    return (
      <>
        <div className="mtit">
          <h2>{m.label}</h2>
        </div>
        {banner}
        {list.length ? (
          list.map((s) => (
            <div className="li" key={s.id}>
              <div className="tx">
                <span className={'sp' + (s.status === 'pending' ? ' pe' : '')}>{s.status === 'pending' ? 'Pendiente' : 'Revisada'}</span>
                <b style={{ marginTop: 8, fontWeight: 600 }}>{s.text}</b>
                <small>{dmy(s.created_at)}</small>
              </div>
              <div className="ac">
                <form action={toggleSuggestion} className="rowform">
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="next" value={s.status === 'pending' ? 'reviewed' : 'pending'} />
                  <button className="sbtn" type="submit" aria-label={s.status === 'pending' ? 'Marcar como revisada' : 'Marcar como pendiente'}>
                    <Icon n="check" s={17} />
                  </button>
                </form>
                <form action={deleteSuggestion} className="rowform">
                  <input type="hidden" name="id" value={s.id} />
                  <ConfirmButton />
                </form>
              </div>
            </div>
          ))
        ) : (
          <div className="empty">Todavía no llegaron sugerencias.</div>
        )}
      </>
    );
  }

  const { data } = await sb
    .from('items')
    .select('*')
    .in('type', m.types)
    .order('pos', { ascending: true })
    .order('created_at', { ascending: false });
  const list = data || [];

  return (
    <>
      <div className="mtit">
        <h2>{m.label}</h2>
        <div className="r2">
          {m.types.map((t) => (
            <Link key={t} className="btn btn-sm btn-gold" href={`/admin/${mod}/nuevo?tipo=${t}`}>
              <Icon n="plus" s={16} />
              {m.types.length > 1 ? TYPE_LABEL[t] : 'Agregar'}
            </Link>
          ))}
        </div>
      </div>
      {banner}
      {list.length ? (
        list.map((it) => (
          <div className="li" key={it.id}>
            {it.type === 'review' || it.type === 'video' || it.type === 'ad' ? (
              <span className="th" style={it.image_url ? { backgroundImage: `url("${it.image_url}")` } : undefined} />
            ) : null}
            <div className="tx">
              <b>{it.title || it.text}</b>
              <small>
                {TYPE_LABEL[it.type]} · {meta(it)}
              </small>
            </div>
            <div className="ac">
              <Link className="sbtn" href={`/admin/${mod}/${it.id}`} aria-label="Editar">
                <Icon n="edit" s={17} />
              </Link>
              <form action={deleteItem} className="rowform">
                <input type="hidden" name="id" value={it.id} />
                <input type="hidden" name="mod" value={mod} />
                <ConfirmButton />
              </form>
            </div>
          </div>
        ))
      ) : (
        <div className="empty">Todavía no hay nada acá. Usá el botón dorado para cargar lo primero.</div>
      )}
    </>
  );
}
