import Hero from '@/components/Hero';
import RouletteHost from '@/components/Roulette';
import Feed from '@/components/Feed';
import SuggestionForm from '@/components/SuggestionForm';
import JsonLd from '@/components/JsonLd';
import { AdSlot } from '@/components/Cards';
import { DebateCard, RetroCard, Section } from '@/components/Blocks';
import { getItems, ofType, toCard, toAd, activeAds } from '@/lib/data';
import { SITE_URL } from '@/lib/env';

export const revalidate = 60;
export const metadata = { alternates: { canonical: '/' } };

export default async function Home() {
  const items = await getItems();
  const feed = ofType(items, 'video', 'post', 'quote', 'review').map(toCard);
  const pool = feed.filter((c) => c.type !== 'quote');
  const adsFeed = activeAds(items, 'feed').map(toAd);
  const adsSec = activeAds(items, 'seccion').map(toAd);
  const debates = ofType(items, 'debate').map(toCard);
  const retros = ofType(items, 'retro').map(toCard);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Proyecto Urbano',
          url: SITE_URL,
          inLanguage: 'es',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/buscar?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <main className="wrap" id="inicio">
        <Hero />
        <Feed cards={feed} ads={adsFeed} />
        <AdSlot ad={adsSec[0]} />

        <Section id="comunidad" title="Comunidad & Debates" note="Sumate a la conversación">
          <section className="grid">
            {debates.length ? debates.map((c) => <DebateCard key={c.id} c={c} />) : <div className="empty">Todavía no hay debates abiertos.</div>}
          </section>
        </Section>
        <AdSlot ad={adsSec[1]} />

        <Section id="retro" title="Retro Lab" note="CRT · VHS · glitch">
          <section className="grid">
            {retros.length ? retros.map((c) => <RetroCard key={c.id} c={c} />) : <div className="empty">El laboratorio está vacío por ahora.</div>}
          </section>
        </Section>
        <AdSlot ad={adsSec[2]} />

        <Section id="buzon" title="Buzón de sugerencias" note="Decinos qué querés ver">
          <SuggestionForm />
        </Section>
      </main>
      <RouletteHost pool={pool} />
    </>
  );
}
