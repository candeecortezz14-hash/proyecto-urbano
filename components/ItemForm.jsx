'use client';

import { startTransition, useActionState, useState } from 'react';
import Link from 'next/link';
import { saveItem } from '@/app/admin/actions';
import { FIELDS, TYPE_LABEL } from '@/lib/fields';
import ImageField from './ImageField';
import VideoField from './VideoField';

function initial(f, item, today) {
  if (item) {
    const v = item[f.key];
    if (f.key === 'active') return String(v !== false);
    return v == null ? '' : String(v);
  }
  if (f.key === 'pub_date') return today;
  return f.def == null ? '' : String(f.def);
}

export default function ItemForm({ type, mod, item, today }) {
  const [state, formAction, pending] = useActionState(saveItem, {});
  const fields = FIELDS[type];
  const [busy, setBusy] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  }

  return (
    <form className="formcard" onSubmit={onSubmit} autoComplete="off">
      {state && state.error ? (
        <div className="note err" role="alert">
          {state.error}
        </div>
      ) : null}
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="mod" value={mod} />
      <input type="hidden" name="id" value={item ? item.id : ''} />
      {fields.map((f) => {
        const id = `f-${f.key}`;
        if (f.kind === 'image') return <ImageField key={f.key} field={f} current={item ? item.image_url : ''} />;
        const dv = initial(f, item, today);
        if (f.kind === 'videourl') return <VideoField key={f.key} name={f.key} initial={dv} onBusy={setBusy} />;
        return (
          <div className="fld" key={f.key}>
            <label htmlFor={id}>
              {f.label}
              {f.required ? ' *' : ''}
            </label>
            {f.kind === 'textarea' ? (
              <textarea className="ta" id={id} name={f.key} rows={f.rows || 4} defaultValue={dv} />
            ) : f.kind === 'select' ? (
              <select className="sel inp" id={id} name={f.key} defaultValue={dv}>
                {f.options.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="inp"
                id={id}
                name={f.key}
                type={f.kind === 'rating' ? 'number' : f.kind === 'url' ? 'url' : f.kind === 'date' ? 'date' : 'text'}
                {...(f.kind === 'rating' ? { min: 1, max: 5, step: 0.5 } : {})}
                {...(f.kind === 'url' ? { placeholder: 'https://' } : {})}
                defaultValue={dv}
              />
            )}
            {f.hint ? <small style={{ color: 'var(--muted)' }}>{f.hint}</small> : null}
          </div>
        );
      })}
      <div className="acts">
        <button className="btn btn-gold" type="submit" disabled={pending || busy}>
          {busy ? 'Subiendo video…' : pending ? 'Guardando…' : `Guardar ${TYPE_LABEL[type].toLowerCase()}`}
        </button>
        <Link className="btn" href={`/admin/${mod}`}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
