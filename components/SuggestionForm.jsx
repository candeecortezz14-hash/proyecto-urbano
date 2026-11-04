'use client';

import { useActionState } from 'react';
import { sendSuggestion } from '@/app/actions';

export default function SuggestionForm() {
  const [state, action, pending] = useActionState(sendSuggestion, null);
  return (
    <form className="sugform" action={action}>
      <div className="fld">
        <label htmlFor="sug">Tu sugerencia</label>
        <textarea className="ta" id="sug" name="text" maxLength={280} placeholder="Por favor suban un análisis de…" required />
      </div>
      <input type="text" name="web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <div className="r2">
        <button className="btn btn-gold" type="submit" disabled={pending}>
          {pending ? 'Enviando…' : 'Enviar sugerencia'}
        </button>
        {state ? (
          <span role="status" style={{ color: state.ok ? 'var(--c-rev)' : 'var(--c-buz)', fontWeight: 600 }}>
            {state.msg}
          </span>
        ) : null}
      </div>
    </form>
  );
}
