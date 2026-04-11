import type { Metadata } from 'next';
import { getLandingPageMetadata } from '@/lib/seo';
import { MainPageView } from '@/views';

export const metadata: Metadata = getLandingPageMetadata();

export default function Home() {
  return (
    <div>
      <main>
        <MainPageView />
      </main>
    </div>
  );
}
