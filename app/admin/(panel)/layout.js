import AdminShell from '@/components/AdminShell';
import { requireAdmin } from '@/lib/auth';

export const metadata = { title: 'Administración', robots: { index: false, follow: false } };

export default async function PanelLayout({ children }) {
  const { user } = await requireAdmin();
  return <AdminShell email={user.email}>{children}</AdminShell>;
}
