import { getItems, hrefOf } from '@/lib/data';
import { SITE_URL } from '@/lib/env';

export const revalidate = 3600;

export default async function sitemap() {
  const items = await getItems();
  const now = new Date();
  const fixed = ['', '/criticas', '/videos', '/analisis', '/nosotros', '/contacto', '/privacidad', '/terminos', '/cookies'].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'daily' : 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
  const pages = items
    .filter((i) => hrefOf(i))
    .map((i) => ({
      url: `${SITE_URL}${hrefOf(i)}`,
      lastModified: i.created_at ? new Date(i.created_at) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  return [...fixed, ...pages];
}
