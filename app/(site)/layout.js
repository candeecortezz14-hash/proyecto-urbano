import Script from 'next/script';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import Radio from '@/components/Radio';
import CookieBanner from '@/components/CookieBanner';
import { ADSENSE } from '@/lib/env';

export default function SiteLayout({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
      <Radio />
      <CookieBanner />
      {ADSENSE ? (
        <Script
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE)}`}
        />
      ) : null}
    </>
  );
}
