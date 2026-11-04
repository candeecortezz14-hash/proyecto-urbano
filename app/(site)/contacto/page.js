import { CONTACT_EMAIL } from '@/lib/env';
import { SocialLinks, HAS_SOCIAL } from '@/components/Footer';

export const metadata = { title: 'Contacto', description: 'Escribinos para anunciar, colaborar o consultar.', alternates: { canonical: '/contacto' } };

export default function Page() {
  return (
    <main className="wrap">
      <div className="page">
        <h1>Contacto</h1>
        <p>¿Querés anunciar tu marca, proponer una colaboración o consultarnos algo? Escribinos.</p>
        {CONTACT_EMAIL ? (
          <p>
            Email: <strong>{CONTACT_EMAIL}</strong>
          </p>
        ) : (
          <p>
            Por ahora, la forma más directa de escribirnos es el <a href="/#buzon">buzón de sugerencias</a> de la página principal.
          </p>
        )}
        {HAS_SOCIAL ? (
          <>
            <h2>Seguinos</h2>
            <SocialLinks withNames />
          </>
        ) : null}
        <h2>Para anunciantes</h2>
        <p>Ofrecemos banners entre las secciones y entre las tarjetas del inicio, siempre marcados como publicidad. Contanos qué querés comunicar y te respondemos con las opciones.</p>
      </div>
    </main>
  );
}
