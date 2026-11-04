'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase';
import { FIELDS } from '@/lib/fields';
import { MODS } from '@/lib/mods';
import { isAdminEmail, SUPABASE_URL } from '@/lib/env';
import { safeUrl, slugify, todayISO } from '@/lib/util';

const MAX_IMG = 6 * 1024 * 1024;
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' };

function refresh() {
  revalidatePath('/', 'layout');
}

export async function signIn(formData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const sb = await supabaseServer();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error || !data || !data.user) redirect('/admin/login?error=1');
  if (!isAdminEmail(data.user.email)) {
    await sb.auth.signOut();
    redirect('/admin/login?error=2');
  }
  redirect('/admin');
}

export async function signOut() {
  const sb = await supabaseServer();
  await sb.auth.signOut();
  redirect('/admin/login');
}

// Guarda una crítica, video, análisis, cita, debate, efecto o anuncio.
export async function saveItem(prev, formData) {
  const { sb } = await requireAdmin();
  const type = String(formData.get('type') || '');
  const mod = String(formData.get('mod') || '');
  const id = String(formData.get('id') || '');
  const fields = FIELDS[type];
  if (!fields || !MODS[mod] || !MODS[mod].types.includes(type)) return { error: 'Tipo de contenido no válido.' };

  const values = {};
  fields.forEach((f) => {
    if (f.kind !== 'image') values[f.key] = String(formData.get(f.key) ?? '');
  });

  let existing = null;
  if (id) {
    const { data } = await sb.from('items').select('*').eq('id', id).maybeSingle();
    existing = data;
    if (!existing) return { error: 'No encontramos ese contenido. Puede que ya lo hayas borrado.', values };
  }

  const rec = { type };
  for (const f of fields) {
    if (f.kind === 'image') continue;
    let v = values[f.key].trim();
    if (f.required && !v) return { error: `Falta completar: ${f.label}.`, values };
    if (f.kind === 'url' || f.kind === 'videourl') {
      if (v && !safeUrl(v)) return { error: 'El enlace tiene que empezar con https://', values };
      rec[f.key] = v || null;
    } else if (f.kind === 'rating') {
      const n = Math.max(1, Math.min(5, Math.round(parseFloat(v || '5') * 2) / 2));
      rec[f.key] = Number.isFinite(n) ? n : 5;
    } else if (f.kind === 'date') {
      rec[f.key] = /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
    } else if (f.key === 'active') {
      rec.active = v !== 'false';
    } else {
      rec[f.key] = v || null;
    }
  }
  if (type === 'post' && !rec.pub_date) rec.pub_date = todayISO();
  if (type === 'quote') rec.title = String(rec.text || '').slice(0, 80);

  // Imagen: subir una nueva, quitar la actual o dejarla como está.
  const imageField = fields.find((f) => f.kind === 'image');
  if (imageField) {
    const file = formData.get('image_file');
    if (file && typeof file === 'object' && file.size > 0) {
      if (!String(file.type).startsWith('image/')) return { error: 'El archivo tiene que ser una imagen.', values };
      if (file.size > MAX_IMG) return { error: 'La imagen pesa más de 6 MB. Probá con una más liviana.', values };
      const ext = EXT[file.type] || 'jpg';
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await sb.storage.from('media').upload(path, file, { contentType: file.type, cacheControl: '31536000' });
      if (upErr) return { error: `No se pudo subir la imagen: ${upErr.message}`, values };
      rec.image_url = `${SUPABASE_URL}/storage/v1/object/public/media/${path}`;
    } else if (formData.get('image_remove') === '1') {
      rec.image_url = null;
    }
  }
  const finalImage = rec.image_url !== undefined ? rec.image_url : existing && existing.image_url;
  if (type === 'ad' && rec.format === 'imagen' && !finalImage) {
    return { error: 'Subí la imagen de tu banner.', values };
  }

  let error;
  if (existing) {
    ({ error } = await sb.from('items').update(rec).eq('id', id));
  } else {
    rec.slug = `${slugify(rec.title || rec.text)}-${Math.random().toString(36).slice(2, 6)}`;
    ({ error } = await sb.from('items').insert(rec));
  }
  if (error) return { error: `No se pudo guardar: ${error.message}`, values };

  refresh();
  redirect(`/admin/${mod}?ok=1`);
}

// Prepara la subida directa de un video a Supabase (los videos pesan demasiado para pasar por el servidor).
export async function prepareVideoUpload(ext) {
  const { sb } = await requireAdmin();
  const e = ['mp4', 'webm', 'mov', 'm4v'].includes(String(ext).toLowerCase()) ? String(ext).toLowerCase() : 'mp4';
  const path = `videos/${crypto.randomUUID()}.${e}`;
  const { data, error } = await sb.storage.from('media').createSignedUploadUrl(path);
  if (error || !data) return { error: `No se pudo preparar la subida: ${error ? error.message : 'sin respuesta'}` };
  return { path, token: data.token, publicUrl: `${SUPABASE_URL}/storage/v1/object/public/media/${path}` };
}

export async function deleteItem(formData) {
  const { sb } = await requireAdmin();
  const id = String(formData.get('id') || '');
  const mod = String(formData.get('mod') || 'criticas');
  if (id) await sb.from('items').delete().eq('id', id);
  refresh();
  redirect(`/admin/${MODS[mod] ? mod : 'criticas'}?ok=2`);
}

export async function toggleSuggestion(formData) {
  const { sb } = await requireAdmin();
  const id = String(formData.get('id') || '');
  const next = String(formData.get('next') || '') === 'reviewed' ? 'reviewed' : 'pending';
  if (id) await sb.from('suggestions').update({ status: next }).eq('id', id);
  revalidatePath('/admin', 'layout');
  redirect('/admin/buzon');
}

export async function deleteSuggestion(formData) {
  const { sb } = await requireAdmin();
  const id = String(formData.get('id') || '');
  if (id) await sb.from('suggestions').delete().eq('id', id);
  revalidatePath('/admin', 'layout');
  redirect('/admin/buzon?ok=2');
}
