import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY, hasDb } from './env';
import { DEMO } from './demo';
import { safeUrl, ytId, bgFor, todayISO } from './util';

// Cliente anónimo: solo lectura pública y envío de sugerencias.
export function publicClient() {
  if (!hasDb) return null;
  return createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
}

export const getItems = cache(async () => {
  const c = publicClient();
  if (!c) return DEMO;
  const { data, error } = await c
    .from('items')
    .select('*')
    .order('pos', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) {
    console.error('No se pudo leer items:', error && error.message);
    return [];
  }
  return data;
});

export const ofType = (items, ...types) => items.filter((i) => types.includes(i.type));

export function thumbOf(i) {
  if (i.image_url) return i.image_url;
  const id = ytId(i.url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

export function hrefOf(i) {
  if (!i.slug) return '';
  if (i.type === 'review') return `/criticas/${i.slug}`;
  if (i.type === 'video') return `/videos/${i.slug}`;
  if (i.type === 'post') return `/analisis/${i.slug}`;
  return '';
}

export function activeAds(items, placement) {
  const today = todayISO();
  return ofType(items, 'ad').filter(
    (a) => a.active !== false && a.placement === placement && (!a.until || String(a.until) >= today)
  );
}

// Versión liviana que viaja al navegador (sin textos largos).
export function toCard(i) {
  return {
    id: String(i.id),
    type: i.type,
    title: i.title || '',
    tagline: i.tagline || '',
    cat: i.cat || '',
    duration: i.duration || '',
    rating: i.rating == null ? null : Number(i.rating),
    excerpt: i.excerpt || '',
    snippet: String(i.body || '').replace(/\s+/g, ' ').slice(0, 150),
    text: i.text || '',
    source: i.source || '',
    date: i.pub_date || '',
    thumb: thumbOf(i),
    href: hrefOf(i),
    bg: bgFor(i.title || i.text),
    kind: i.kind || '',
    when: i.when_text || '',
    descr: i.descr || '',
    effect: i.effect || '',
  };
}

export function toAd(a) {
  return {
    id: String(a.id),
    title: a.title || '',
    text: a.text || '',
    cta: a.cta || 'Ver más',
    url: safeUrl(a.url),
    image: a.image_url || '',
    format: a.format || 'tarjeta',
  };
}
