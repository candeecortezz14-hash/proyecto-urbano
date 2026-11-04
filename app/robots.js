import { SITE_URL } from '@/lib/env';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/buscar'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
