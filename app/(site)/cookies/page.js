export const metadata = { title: 'Política de cookies', description: 'Qué cookies y almacenamiento usa Proyecto Urbano.', alternates: { canonical: '/cookies' } };

export default function Page() {
  return (
    <main className="wrap">
      <div className="page">
        <h1>Política de cookies</h1>
        <p>Última actualización: noviembre de 2026.</p>
        <p>Las cookies son pequeños archivos que el sitio guarda en tu navegador. Usamos estos tipos:</p>

        <h2>Necesarias</h2>
        <p>
          Guardan tu lista de tickets y que ya viste el aviso de cookies. Funcionan en tu dispositivo y no se envían a ningún tercero.
        </p>

        <h2>Publicidad</h2>
        <p>
          Cuando está activo Google AdSense, Google y sus socios pueden usar cookies para mostrar y medir anuncios. Podés elegir qué anuncios
          ver en{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener">
            adssettings.google.com
          </a>{' '}
          y leer cómo los usa Google en{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">
            policies.google.com/technologies/ads
          </a>
          .
        </p>

        <h2>Videos de YouTube</h2>
        <p>Los videos incrustados usan el modo de privacidad ampliada de YouTube, que limita las cookies hasta que reproducís el video.</p>

        <h2>Cómo borrarlas</h2>
        <p>Podés borrar o bloquear las cookies desde la configuración de tu navegador. Si lo hacés, algunas funciones, como tu lista de tickets, pueden dejar de funcionar.</p>
      </div>
    </main>
  );
}
