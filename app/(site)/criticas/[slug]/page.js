import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Card, AdSlot, Stars } from '@/components/Cards';
import { Crumbs } from '@/components/Blocks';
import { getItems, ofType, toCard, toAd, activeAds, thumbOf } from '@/lib/data';
import { paragraphs } from '@/lib/util';
import { SITE_URL } from '@/lib/env';

export const revalidate = 60;

async function load(params) {
  const { slug } = await params;
  const items = await getItems();
  const item = items.find((i) => i.type === 'review' && i.slug === slug);
  return { items, item, slug };
}

export async function generateMetadata({ params }) {
  const { item, slug } = await load(params);
  if (!item) return { title: 'No encontrado', robots: { index: false } };
  const desc = String(item.tagline || item.body || '').replace(/\s+/g, ' ').slice(0, 155);
  const img = thumbOf(item);
  return {
    title: `${item.title}: crítica y reseña`,
    description: desc,
    alternates: { canonical: `/criticas/${slug}` },
    openGraph: { title: item.title, description: desc, type: 'article', images: img ? [img] : undefined },
  };
}

export default async function Page({ params }) {
  const { items, item, slug } = await load(params);
  if (!item) notFound();
  const img = thumbOf(item);
  const related = ofType(items, 'review').filter((i) => i.id !== item.id).slice(0, 3).map(toCard);
  const ad = activeAds(items, 'feed').map(toAd)[0];
  return (
    <main className="wrap">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Review',
          name: `${item.title}: crítica`,
          itemReviewed: { '@type': 'Movie', name: item.title },
          reviewRating: { '@type': 'Rating', ratingValue: Number(item.rating || 5), bestRating: 5, worstRating: 1 },
          author: { '@type': 'Organization', name: 'Proyecto Urbano' },
          datePublished: item.created_at || undefined,
          reviewBody: String(item.body || '').slice(0, 500),
          url: `${SITE_URL}/criticas/${slug}`,
        }}
      />
      <article className="article">
        <Crumbs items={[['/', 'Inicio'], ['/criticas', 'Críticas'], [null, item.title]]} />
        <h1>{item.title}</h1>
        <div className="meta">
          {item.rating != null ? <Stars r={Number(item.rating)} /> : null}
          <span>{item.cat || 'Críticas'}</span>
        </div>
        {item.tagline ? <p className="lead">{item.tagline}</p> : null}
        {img ? <img className="hero-img" src={img} alt={`Imagen de ${item.title}`} /> : null}
        <div className="prose">
          {paragraphs(item.body).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p>
          <Link className="btn btn-sm" href="/criticas">
            ← Más críticas
          </Link>
        </p>
      </article>
      <AdSlot ad={ad} />
      {related.length ? (
        <>
          <div className="sec">
            <h2>Más críticas</h2>
          </div>
          <section className="grid">
            {related.map((c) => (
              <Card key={c.id} c={c} />
            ))}
          </section>
        </>
      ) : null}
    </main>
  );
}
