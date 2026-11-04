import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="wrap foot">
      <span>© {new Date().getFullYear()} Proyecto Urbano · cine, historias y entretenimiento</span>
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
