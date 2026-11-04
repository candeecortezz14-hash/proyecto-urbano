export const metadata = { title: 'Quiénes somos', description: 'Proyecto Urbano, el archivo de cine, historias y entretenimiento.', alternates: { canonical: '/nosotros' } };

export default function Page() {
  return (
    <main className="wrap">
      <div className="page">
        <h1>Quiénes somos</h1>
        <p>
          Proyecto Urbano es una plataforma para los amantes del buen cine, los clásicos de culto y las mejores historias para todo público.
        </p>
        <p>
          Publicamos críticas con calificación de 1 a 5 estrellas, análisis sobre estética e historia del cine, videos seleccionados y debates
          abiertos para que la comunidad participe.
        </p>
        <h2>Cómo trabajamos</h2>
        <p>Escribimos nuestras propias reseñas y análisis. Cuando mostramos una escena o un tráiler, lo hacemos desde YouTube y citamos siempre la obra original.</p>
        <h2>Participá</h2>
        <p>
          Podés dejarnos tus ideas en el <a href="/#buzon">buzón de sugerencias</a>. Leemos todo lo que llega.
        </p>
      </div>
    </main>
  );
}
