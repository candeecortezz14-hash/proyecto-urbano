import Link from 'next/link';

export const metadata = { title: 'Página no encontrada', robots: { index: false } };

export default function NotFound() {
  return (
    <main className="login">
      <div className="dlg" style={{ textAlign: 'center' }}>
        <p className="eyebrow">Error 404</p>
        <h3>No encontramos esa página</h3>
        <p style={{ color: 'var(--muted)' }}>Puede que el enlace esté mal o que el contenido ya no exista.</p>
        <Link className="btn btn-gold" href="/">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
