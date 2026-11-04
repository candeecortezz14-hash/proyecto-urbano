'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Borrar en dos toques: el primero pide confirmar, el segundo borra.
export default function ConfirmButton() {
  const [armed, setArmed] = useState(false);
  const t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  return (
    <button
      type={armed ? 'submit' : 'button'}
      className={'sbtn del' + (armed ? ' arm' : '')}
      aria-label={armed ? 'Confirmar borrado' : 'Borrar'}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          t.current = setTimeout(() => setArmed(false), 3500);
        }
      }}
    >
      {armed ? '¿Borrar?' : <Icon n="trash" s={17} />}
    </button>
  );
}
