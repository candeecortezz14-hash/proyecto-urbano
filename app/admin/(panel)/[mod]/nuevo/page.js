import { notFound, redirect } from 'next/navigation';
import ItemForm from '@/components/ItemForm';
import { MODS } from '@/lib/mods';
import { TYPE_LABEL } from '@/lib/fields';
import { todayISO } from '@/lib/util';

export default async function Nuevo({ params, searchParams }) {
  const { mod } = await params;
  const sp = await searchParams;
  const m = MODS[mod];
  if (!m || !m.types.length) notFound();
  const type = (sp && sp.tipo) || (m.types.length === 1 ? m.types[0] : '');
  if (!m.types.includes(type)) redirect(`/admin/${mod}`);
  return (
    <>
      <div className="mtit">
        <h2>Nuevo: {TYPE_LABEL[type].toLowerCase()}</h2>
      </div>
      <ItemForm type={type} mod={mod} item={null} today={todayISO()} />
    </>
  );
}
