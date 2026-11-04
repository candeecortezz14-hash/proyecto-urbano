import Link from 'next/link';

export default function Logo({ href = '/' }) {
  return (
    <Link className="logo" href={href} aria-label="Proyecto Urbano, inicio">
      <img
        src="/logo-nuevo.png"
        alt="Proyecto Urbano"
        style={{ height: '44px', width: 'auto', display: 'block' }}
      />
    </Link>
  );
}
