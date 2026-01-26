'use client';

import { PageContainer } from '@/components';

import MainPageHero from './main-page-hero';
import MainPageModuleSection from './main-page-module-section';
import MainPagePricingSection from './main-page-pricing-section';
import MainPageWhySection from './main-page-why-section';

export function MainPageView() {
  return (
    <PageContainer>
      <MainPageHero />
      {/* Why Section */}
      <MainPageWhySection />

      {/* Modules Section */}
      <MainPageModuleSection />
      {/* Pricing Section */}
      <MainPagePricingSection />
    </PageContainer>
  );
}

export default MainPageView;
