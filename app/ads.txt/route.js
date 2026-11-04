import { ADSENSE } from '@/lib/env';

// Archivo que Google AdSense pide en la raíz del sitio (tudominio.com/ads.txt).
export async function GET() {
  const pub = ADSENSE.replace(/^ca-/, '');
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : '# Se completa al cargar NEXT_PUBLIC_ADSENSE_CLIENT\n';
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
