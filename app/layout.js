import './globals.css';
import { SITE_URL } from '@/lib/env';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Proyecto Urbano | Cine, historias y entretenimiento',
    template: '%s | Proyecto Urbano',
  },
  description:
    'Críticas de cine, análisis, clásicos de culto y las mejores historias. El archivo de Proyecto Urbano para los amantes del buen cine.',
  applicationName: 'Proyecto Urbano',
  openGraph: { type: 'website', siteName: 'Proyecto Urbano', locale: 'es_PY' },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { themeColor: '#0a0a0a', colorScheme: 'dark' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,500&family=JetBrains+Mono:wght@400;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
