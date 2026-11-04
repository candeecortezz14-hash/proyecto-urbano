'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem('pu_cookies')) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Aviso de cookies">
      <p>
        Usamos cookies para que el sitio funcione y para mostrar publicidad. Podés leer más en nuestra{' '}
        <Link href="/cookies">política de cookies</Link>.
      </p>
      <button
        type="button"
        className="btn btn-gold btn-sm"
        onClick={() => {
          try {
            localStorage.setItem('pu_cookies', '1');
          } catch {}
          setShow(false);
        }}
      >
        Entendido
      </button>
    </div>
  );
}
