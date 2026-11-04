import Link from 'next/link';

export default function Logo({ sky = true, href = '/' }) {
  return (
    <Link className="logo" href={href} aria-label="Proyecto Urbano, inicio">
      <span className="lg">
        <span className="lg1">Proyecto</span>
        <span className="lg2">URBANO</span>
      </span>
      {sky && (
        <svg className="sky" viewBox="0 0 34 30" fill="currentColor" aria-hidden="true">
          <rect x="1" y="16" width="5" height="14" />
          <rect x="8" y="8" width="6" height="22" />
          <rect x="16" y="2" width="5" height="28" />
          <rect x="23" y="12" width="5" height="18" />
          <rect x="29" y="19" width="4" height="11" />
        </svg>
      )}
    </Link>
  );
}
