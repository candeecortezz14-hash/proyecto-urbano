import { CONTACT_EMAIL } from '@/lib/env';

export const metadata = { title: 'Política de privacidad', description: 'Qué datos usa Proyecto Urbano y cómo los cuida.', alternates: { canonical: '/privacidad' } };

export default function Page() {
  return (
    <main className="wrap">
      <div className="page">
        <h1>Política de privacidad</h1>
        <p>Última actualización: noviembre de 2026.</p>
        <p>En Proyecto Urbano respetamos tu privacidad. Esta página explica qué información se usa cuando visitás el sitio.</p>

        <h2>Qué datos recibimos</h2>
        <ul>
          <li>
            <strong>Sugerencias:</strong> si usás el buzón, guardamos el texto que escribís. No te pedimos nombre, email ni teléfono, así que no
            escribas datos personales en ese mensaje.
          </li>
          <li>
            <strong>Tu lista de tickets:</strong> se guarda solo en tu navegador, en tu dispositivo. No la recibimos.
          </li>
          <li>
            <strong>Datos técnicos:</strong> como casi cualquier sitio, el servidor puede registrar la dirección IP y el tipo de navegador para
            mantener la seguridad y el funcionamiento.
          </li>
        </ul>

        <h2>Publicidad y terceros</h2>
        <p>
          Mostramos anuncios de marcas que se contactan con nosotros y, cuando esté activo, anuncios de Google AdSense. Google y sus socios
          pueden usar cookies para mostrar anuncios según tus visitas a este y a otros sitios. Podés administrar o desactivar los anuncios
          personalizados en{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener">
            adssettings.google.com
          </a>
          .
        </p>
        <p>
          Algunos videos se reproducen desde YouTube. Al reproducirlos, YouTube puede recibir datos de tu visita según su propia política de
          privacidad.
        </p>

        <h2>Dónde se guardan los datos</h2>
        <p>El contenido y las sugerencias se guardan en servicios de alojamiento y base de datos de terceros (Supabase y el proveedor de hosting del sitio).</p>

        <h2>Tus derechos</h2>
        <p>
          Podés pedirnos que borremos una sugerencia o que te informemos qué datos tenemos sobre vos. Escribinos
          {CONTACT_EMAIL ? (
            <>
              {' '}
              a <strong>{CONTACT_EMAIL}</strong>
            </>
          ) : (
            <> desde la página de contacto</>
          )}
          .
        </p>

        <h2>Cambios</h2>
        <p>Si esta política cambia, publicaremos la versión nueva en esta misma página.</p>
      </div>
    </main>
  );
}
