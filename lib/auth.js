import { redirect } from 'next/navigation';
import { supabaseServer } from './supabase';
import { hasDb, isAdminEmail } from './env';

export async function getAdmin() {
  if (!hasDb) return null;
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;
  if (!isAdminEmail(user.email)) return null;
  return { user, sb };
}

export async function requireAdmin() {
  const a = await getAdmin();
  if (!a) redirect('/admin/login');
  return a;
}
