import type { MetadataRoute } from 'next';
import rawData from '@/config/data.json';
import type { SiteConfig } from '@/types';

const siteData = rawData as SiteConfig;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteData.business.name,
    short_name: siteData.business.name,
    description: siteData.seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: siteData.theme.secondary,
    theme_color: siteData.theme.primary,
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

