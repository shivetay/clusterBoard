import type { Metadata } from 'next';
import { getSiteUrl } from './site-url';

const LANDING_TITLE =
  'Cluster Board — tablica projektowa dla zespołów i klientów';
const LANDING_DESCRIPTION =
  'Pierwsza tablica dla branż kreatywnych i wykonawczych. Zgromadź inspiracje, dokumenty i etapy prac w jednym, profesjonalnym miejscu. Przejrzystość dla Ciebie i spokój dla klienta.';

const KEYWORDS = [
  'Cluster Board',
  'zarządzanie projektami',
  'tablica projektowa',
  'współpraca z klientem',
  'branża kreatywna',
  'etapy projektu',
  'inspiracje projektowe',
];

export function getLandingPageMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const ogImagePath = '/assets/images/board-mockup.jpg';
  const ogImageUrl = `${siteUrl}${ogImagePath}`;

  return {
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    keywords: KEYWORDS,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      url: siteUrl,
      siteName: 'Cluster Board',
      title: LANDING_TITLE,
      description: LANDING_DESCRIPTION,
      images: [
        {
          url: ogImageUrl,
          width: 500,
          height: 500,
          alt: 'Cluster Board — podgląd tablicy projektowej',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: LANDING_TITLE,
      description: LANDING_DESCRIPTION,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
