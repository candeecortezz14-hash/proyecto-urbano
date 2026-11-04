import { Listing } from '@/components/Blocks';
import { getItems, ofType, toCard, toAd, activeAds } from '@/lib/data';

export const revalidate = 60;
export const metadata = {
  title: 'Videos de cine',
  description: 'Escenas, tráilers y videos de cine clásico, ciencia ficción y más.',
  alternates: { canonical: '/videos' },
};

export default async function Page() {
  const items = await getItems();
  const ad = activeAds(items, 'feed').map(toAd)[0];
  return (
    <Listing
      title="Videos"
      intro="Escenas, tráilers y videos para ver sin salir del sitio."
      cards={ofType(items, 'video').map(toCard)}
      ad={ad}
    />
  );
}
