import { notFound } from 'next/navigation';
import ItemForm from '@/components/ItemForm';
import { requireAdmin } from '@/lib/auth';
import { MODS } from '@/lib/mods';
import { TYPE_LABEL } from '@/lib/fields';
import { todayISO } from '@/lib/util';

export default async function Editar({ params }) {
  const { mod, id } = await params;
  const m = MODS[mod];
  if (!m || !m.types.length) notFound();
  const { sb } = await requireAdmin();
  const { data: item } = await sb.from('items').select('*').eq('id', id).maybeSingle();
  if (!item || !m.types.includes(item.type)) notFound();
  return (
    <>
      <div className="mtit">
        <h2>Editar: {TYPE_LABEL[item.type].toLowerCase()}</h2>
      </div>
      <ItemForm type={item.type} mod={mod} item={item} today={todayISO()} />
    </>
  );
}
