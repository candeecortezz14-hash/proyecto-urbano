import { Listing } from '@/components/Blocks';
import { getItems, ofType, toCard, toAd, activeAds } from '@/lib/data';

export const revalidate = 60;
export const metadata = {
  title: 'Críticas y reseñas de cine',
  description: 'Críticas de películas con calificación de 1 a 5 estrellas y análisis de cada una.',
  alternates: { canonical: '/criticas' },
};

export default async function Page() {
  const items = await getItems();
  const ad = activeAds(items, 'feed').map(toAd)[0];
  return (
    <Listing
      title="Críticas & Reseñas"
      intro="Películas, calificaciones de 1 a 5 estrellas y análisis."
      cards={ofType(items, 'review').map(toCard)}
      ad={ad}
    />
  );
}
