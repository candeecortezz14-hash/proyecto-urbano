'use client';

import { useRef, useState } from 'react';

// Achica la foto en el celular antes de subirla para que cargue rápido.
async function shrink(file) {
  if (file.type === 'image/gif') return null;
  try {
    const url = URL.createObjectURL(file);
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    URL.revokeObjectURL(url);
    const k = Math.min(1, 1600 / img.width);
    if (k === 1 && file.size < 900 * 1024) return null;
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(img.width * k));
    c.height = Math.max(1, Math.round(img.height * k));
    const g = c.getContext('2d');
    g.fillStyle = '#0a0a0a';
    g.fillRect(0, 0, c.width, c.height);
    g.drawImage(img, 0, 0, c.width, c.height);
    const blob = await new Promise((res) => c.toBlob(res, 'image/jpeg', 0.85));
    if (!blob) return null;
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return null;
  }
}

export default function ImageField({ field, current }) {
  const [preview, setPreview] = useState(current || '');
  const [removed, setRemoved] = useState(false);
  const input = useRef(null);

  async function onChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setRemoved(false);
    const small = await shrink(f);
    if (small) {
      try {
        const dt = new DataTransfer();
        dt.items.add(small);
        input.current.files = dt.files;
      } catch {}
    }
    setPreview(URL.createObjectURL(small || f));
  }

  function clear() {
    setPreview('');
    setRemoved(true);
    if (input.current) input.current.value = '';
  }

  return (
    <div className="fld">
      <label htmlFor="f-image_file">{field.label}</label>
      <div className="imgprev" style={preview ? { backgroundImage: `url("${preview.replace(/"/g, '%22')}")` } : undefined}>
        {preview ? '' : 'Sin imagen'}
      </div>
      <div className="r2">
        <input ref={input} className="inp" id="f-image_file" name="image_file" type="file" accept="image/*" onChange={onChange} style={{ flex: 1, minWidth: 0 }} />
        {preview ? (
          <button type="button" className="btn btn-sm" onClick={clear}>
            Quitar
          </button>
        ) : null}
      </div>
      <input type="hidden" name="image_remove" value={removed ? '1' : ''} />
      {field.hint ? <small style={{ color: 'var(--muted)' }}>{field.hint}</small> : null}
    </div>
  );
}
