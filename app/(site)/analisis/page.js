import { Listing } from '@/components/Blocks';
import { getItems, ofType, toCard, toAd, activeAds } from '@/lib/data';

export const revalidate = 60;
export const metadata = {
  title: 'Análisis de cine',
  description: 'Artículos y análisis sobre cine, estética, historia y películas de culto.',
  alternates: { canonical: '/analisis' },
};

export default async function Page() {
  const items = await getItems();
  const ad = activeAds(items, 'feed').map(toAd)[0];
  return (
    <Listing
      title="Análisis"
      intro="Artículos sobre cine, estética, historia y películas de culto."
      cards={ofType(items, 'post').map(toCard)}
      ad={ad}
    />
  );
}
