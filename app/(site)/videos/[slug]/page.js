import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Card, AdSlot } from '@/components/Cards';
import { Crumbs } from '@/components/Blocks';
import { getItems, ofType, toCard, toAd, activeAds, thumbOf } from '@/lib/data';
import { paragraphs, ytId, safeUrl, isFileVideo } from '@/lib/util';
import { SITE_URL } from '@/lib/env';

export const revalidate = 60;

async function load(params) {
  const { slug } = await params;
  const items = await getItems();
  const item = items.find((i) => i.type === 'video' && i.slug === slug);
  return { items, item, slug };
}

export async function generateMetadata({ params }) {
  const { item, slug } = await load(params);
  if (!item) return { title: 'No encontrado', robots: { index: false } };
  const desc = String(item.body || `Mirá ${item.title} en Proyecto Urbano.`).replace(/\s+/g, ' ').slice(0, 155);
  const img = thumbOf(item);
  return {
    title: item.title,
    description: desc,
    alternates: { canonical: `/videos/${slug}` },
    openGraph: { title: item.title, description: desc, type: 'video.other', images: img ? [img] : undefined },
  };
}

export default async function Page({ params }) {
  const { items, item, slug } = await load(params);
  if (!item) notFound();
  const id = ytId(item.url);
  const link = safeUrl(item.url);
  const own = !id && isFileVideo(link);
  const img = thumbOf(item);
  const related = ofType(items, 'video').filter((i) => i.id !== item.id).slice(0, 3).map(toCard);
  const ad = activeAds(items, 'feed').map(toAd)[0];
  return (
    <main className="wrap">
      {id || own ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: item.title,
            description: String(item.body || item.title).slice(0, 300),
            thumbnailUrl: img ? [img] : undefined,
            uploadDate: item.created_at || undefined,
            ...(id ? { embedUrl: `https://www.youtube-nocookie.com/embed/${id}` } : { contentUrl: link }),
            url: `${SITE_URL}/videos/${slug}`,
          }}
        />
      ) : null}
      <article className="article">
        <Crumbs items={[['/', 'Inicio'], ['/videos', 'Videos'], [null, item.title]]} />
        <h1>{item.title}</h1>
        <div className="meta">
          <span>{item.cat || 'Video'}</span>
          {item.duration ? <span>{item.duration}</span> : null}
        </div>
        {id ? (
          <div className="yt">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={item.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        ) : own ? (
          <div className="yt">
            <video controls playsInline preload="metadata" poster={img || undefined} src={link} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#000' }}>
              Tu navegador no puede reproducir este video.
            </video>
          </div>
        ) : link ? (
          <p>
            <a className="btn btn-gold" href={link} target="_blank" rel="noopener">
              Ver el video
            </a>
          </p>
        ) : (
          <div className="empty" style={{ marginBottom: 24 }}>
            Este video todavía no tiene enlace.
          </div>
        )}
        <div className="prose">
          {paragraphs(item.body).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p>
          <Link className="btn btn-sm" href="/videos">
            ← Más videos
          </Link>
        </p>
      </article>
      <AdSlot ad={ad} />
      {related.length ? (
        <>
          <div className="sec">
            <h2>Más videos</h2>
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
