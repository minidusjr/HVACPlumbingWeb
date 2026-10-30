import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { CSSProperties } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import rawData from '@/config/data.json';
import type { SiteConfig } from '@/types';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteData = rawData as SiteConfig;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lonestarflowplumbing.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteData.theme.primary,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteData.seo.title,
  description: siteData.seo.description,
  keywords: siteData.seo.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteData.seo.title,
    description: siteData.seo.description,
    url: siteUrl,
    siteName: siteData.business.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.seo.title,
    description: siteData.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeVariables = {
    '--color-primary': siteData.theme.primary,
    '--color-primary-hover': siteData.theme.primaryHover,
    '--color-secondary': siteData.theme.secondary,
    '--color-accent': siteData.theme.accent,
  } as CSSProperties;

  // JSON-LD Structured Data for Local SEO & Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: siteData.business.name,
    description: siteData.seo.description,
    url: siteUrl,
    telephone: siteData.business.phoneDisplay,
    email: siteData.business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.business.address,
      addressLocality: 'Dallas',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: siteData.footer.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$',
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      style={themeVariables}
    >
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        {/* Accessibility Skip Link for 100/100 Lighthouse Score */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-brand-primary focus:px-5 focus:py-3 focus:font-bold focus:text-white focus:shadow-xl"
        >
          Skip to main content
        </a>

        {/* Schema.org LocalBusiness / Plumber Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
