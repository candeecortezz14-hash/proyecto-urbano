import { redirect } from 'next/navigation';
import { supabaseServer } from './supabase';
import { hasDb, ADMIN_EMAIL } from './env';

export async function getAdmin() {
  if (!hasDb) return null;
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;
  if (ADMIN_EMAIL && String(user.email || '').toLowerCase() !== ADMIN_EMAIL) return null;
  return { user, sb };
}

export async function requireAdmin() {
  const a = await getAdmin();
  if (!a) redirect('/admin/login');
  return a;
}
