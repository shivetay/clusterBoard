import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cluster',
        '/projects',
        '/project/',
        '/messages',
        '/invite/',
        '/api/',
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
