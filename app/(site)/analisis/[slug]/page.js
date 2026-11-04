import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Card, AdSlot } from '@/components/Cards';
import { Crumbs } from '@/components/Blocks';
import { getItems, ofType, toCard, toAd, activeAds, thumbOf } from '@/lib/data';
import { paragraphs, fmtDateLong } from '@/lib/util';
import { SITE_URL } from '@/lib/env';

export const revalidate = 60;

async function load(params) {
  const { slug } = await params;
  const items = await getItems();
  const item = items.find((i) => i.type === 'post' && i.slug === slug);
  return { items, item, slug };
}

export async function generateMetadata({ params }) {
  const { item, slug } = await load(params);
  if (!item) return { title: 'No encontrado', robots: { index: false } };
  const desc = String(item.excerpt || item.body || '').replace(/\s+/g, ' ').slice(0, 155);
  const img = thumbOf(item);
  return {
    title: item.title,
    description: desc,
    alternates: { canonical: `/analisis/${slug}` },
    openGraph: { title: item.title, description: desc, type: 'article', images: img ? [img] : undefined },
  };
}

export default async function Page({ params }) {
  const { items, item, slug } = await load(params);
  if (!item) notFound();
  const img = thumbOf(item);
  const related = ofType(items, 'post').filter((i) => i.id !== item.id).slice(0, 3).map(toCard);
  const ad = activeAds(items, 'feed').map(toAd)[0];
  return (
    <main className="wrap">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: item.title,
          description: String(item.excerpt || '').slice(0, 300),
          image: img ? [img] : undefined,
          datePublished: item.pub_date || item.created_at || undefined,
          author: { '@type': 'Organization', name: 'Proyecto Urbano' },
          publisher: { '@type': 'Organization', name: 'Proyecto Urbano' },
          mainEntityOfPage: `${SITE_URL}/analisis/${slug}`,
        }}
      />
      <article className="article">
        <Crumbs items={[['/', 'Inicio'], ['/analisis', 'Análisis'], [null, item.title]]} />
        <h1>{item.title}</h1>
        <div className="meta">
          <span>{item.cat || 'Análisis'}</span>
          {item.pub_date ? <span>{fmtDateLong(item.pub_date)}</span> : null}
        </div>
        {item.excerpt ? <p className="lead">{item.excerpt}</p> : null}
        {img ? <img className="hero-img" src={img} alt={item.title} /> : null}
        <div className="prose">
          {paragraphs(item.body).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p>
          <Link className="btn btn-sm" href="/analisis">
            ← Más análisis
          </Link>
        </p>
      </article>
      <AdSlot ad={ad} />
      {related.length ? (
        <>
          <div className="sec">
            <h2>Más análisis</h2>
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
