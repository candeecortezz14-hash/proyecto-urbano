import { Listing } from '@/components/Blocks';
import { getItems, ofType, toCard } from '@/lib/data';

export const metadata = { title: 'Buscar', robots: { index: false, follow: true } };

export default async function Page({ searchParams }) {
  const sp = await searchParams;
  const q = String((sp && sp.q) || '').trim().slice(0, 80);
  const items = await getItems();
  const needle = q.toLowerCase();
  const found = needle
    ? ofType(items, 'video', 'post', 'quote', 'review').filter((i) =>
        [i.title, i.tagline, i.body, i.excerpt, i.text, i.source, i.cat].join(' ').toLowerCase().includes(needle)
      )
    : [];
  return (
    <Listing
      title={q ? `Resultados para “${q}”` : 'Buscar'}
      intro={q ? `${found.length} resultado${found.length === 1 ? '' : 's'}.` : 'Escribí una película, una escena o un tema.'}
      cards={found.map(toCard)}
      empty={q ? 'No encontramos nada con esa búsqueda.' : 'Usá la lupa de arriba para buscar.'}
    />
  );
}
