import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/env';

// Redes sociales de Proyecto Urbano.
// Para cambiar un enlace, editá solo el texto entre comillas de "url".
// Si una red no tiene enlace (queda vacío ''), no se muestra.
export const SOCIAL = [
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/jorgeluiscortezyucanovich/',
    icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    url: '',
    icon: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.1 4.4 5 4.7"/>',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/jorge.luis.cortez.yucanovich',
    icon: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@jorgeluiscortezyucanovich6383',
    icon: '<path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8z"/><polygon points="9.8 15.2 15.5 12 9.8 8.8 9.8 15.2"/>',
  },
];

export const HAS_SOCIAL = SOCIAL.some((s) => /^https?:\/\//i.test(s.url));

export function SocialLinks({ withNames = false }) {
  const list = SOCIAL.filter((s) => /^https?:\/\//i.test(s.url));
  if (!list.length) return null;
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--goldline)', color: 'var(--gold)' };
  const style = withNames
    ? { ...base, gap: 8, padding: '10px 16px', borderRadius: 999, fontWeight: 700 }
    : { ...base, width: 40, height: 40, borderRadius: '50%' };
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Proyecto Urbano',
          url: SITE_URL,
          sameAs: list.map((s) => s.url),
        }}
      />
      <ul aria-label="Redes sociales" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }}>
        {list.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={`${s.label} de Proyecto Urbano`} title={s.label} style={style}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: s.icon }}
              />
              {withNames ? <span>{s.label}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="wrap foot">
      <span>© {new Date().getFullYear()} Proyecto Urbano · cine, historias y entretenimiento</span>
      <SocialLinks />
      <nav className="foot-links" aria-label="Información del sitio">
        <Link href="/nosotros">Quiénes somos</Link>
        <Link href="/contacto">Contacto</Link>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/terminos">Términos</Link>
        <Link href="/cookies">Cookies</Link>
        <Link href="/admin">Administrar</Link>
      </nav>
    </footer>
  );
}
