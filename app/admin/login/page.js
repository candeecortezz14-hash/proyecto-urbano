import { redirect } from 'next/navigation';
import Logo from '@/components/Logo';
import { getAdmin } from '@/lib/auth';
import { hasDb } from '@/lib/env';
import { signIn } from '../actions';

export const metadata = { title: 'Entrar al panel', robots: { index: false, follow: false } };

export default async function Login({ searchParams }) {
  const sp = await searchParams;
  if (await getAdmin()) redirect('/admin');
  const err = sp && sp.error;
  return (
    <main className="login">
      <div className="dlg">
        <Logo sky={false} />
        <p className="eyebrow">Panel de administración</p>
        <h3>Entrar</h3>
        {!hasDb ? (
          <div className="note err">
            Falta conectar Supabase. Cargá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY (mirá el archivo LEEME.md).
          </div>
        ) : null}
        {err ? (
          <div className="note err" role="alert">
            {err === '2' ? 'Esa cuenta no tiene permiso para administrar el sitio.' : 'Email o contraseña incorrectos.'}
          </div>
        ) : null}
        <form action={signIn}>
          <div className="fld">
            <label htmlFor="email">Email</label>
            <input className="inp" id="email" name="email" type="email" required autoComplete="username" />
          </div>
          <div className="fld">
            <label htmlFor="password">Contraseña</label>
            <input className="inp" id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          <button className="btn btn-gold" type="submit" style={{ width: '100%' }}>
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
