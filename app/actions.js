'use server';

import { publicClient } from '@/lib/data';

// Sugerencias del público (cualquier visitante puede enviar una).
export async function sendSuggestion(prev, formData) {
  // Campo trampa para robots: las personas no lo ven ni lo completan.
  if (String(formData.get('web') || '').trim()) return { ok: true, msg: 'Gracias por tu sugerencia.' };
  const text = String(formData.get('text') || '').trim();
  if (text.length < 3) return { ok: false, msg: 'Escribí al menos unas palabras.' };
  if (text.length > 280) return { ok: false, msg: 'El mensaje es muy largo (máximo 280 caracteres).' };
  const c = publicClient();
  if (!c) return { ok: false, msg: 'El buzón todavía no está conectado.' };
  const { error } = await c.from('suggestions').insert({ text, status: 'pending' });
  if (error) return { ok: false, msg: 'No pudimos guardar tu sugerencia. Probá de nuevo en unos minutos.' };
  return { ok: true, msg: 'Gracias por tu sugerencia. La vamos a leer.' };
}
