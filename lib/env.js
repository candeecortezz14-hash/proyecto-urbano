export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');
// Podés poner varios administradores separados por coma: uno@gmail.com,otro@gmail.com
const ADMIN_LIST = (process.env.ADMIN_EMAIL || '')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
export const ADMIN_EMAIL = ADMIN_LIST.join(',');
export function isAdminEmail(email) {
  return ADMIN_LIST.length === 0 || ADMIN_LIST.includes(String(email || '').toLowerCase());
}
export const ADSENSE = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '').trim();
export const CONTACT_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim();
export const hasDb = Boolean(SUPABASE_URL && SUPABASE_KEY);
export const SITE_NAME = 'Proyecto Urbano';
