'use client';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components';
import { TRANSLATIONS } from '@/locales';
import {
  PricingCard,
  PricingCardBadge,
  PricingCardFeature,
  PricingCardFeatured,
  PricingCardFeatures,
  PricingCardHeader,
  PricingCardPrice,
  PricingCardPriceAmount,
  PricingCardPricePeriod,
  PricingCardPriceValue,
  PricingCardSubtitle,
  PricingCardTitle,
  PricingDescription,
  PricingFullBleed,
  PricingFullBleedInner,
  PricingGrid,
  PricingHeader,
  PricingSection,
  PricingTitle,
  PricingTitleSpan,
} from './main-page.styled';

const DISABLED_OPACITY = 0.78;

type LandingPlanId = 'free' | 'one_time' | 'basic' | 'pro';

type LandingPlanRow =
  | {
      id: 'free';
      available: true;
      featured: true;
      title: string;
      subtitle: string;
      featureLines: string[];
      priceValue: string;
      pricePeriod: string;
    }
  | {
      id: Exclude<LandingPlanId, 'free'>;
      available: false;
      featured: false;
      title: string;
    };

const LANDING_PLANS: LandingPlanRow[] = [
  {
    id: 'free',
    available: true,
    featured: true,
    title: TRANSLATIONS.MAIN_PAGE_PLAN_FREE_TITLE,
    subtitle: TRANSLATIONS.MAIN_PAGE_PLAN_FREE_SUBTITLE,
    featureLines: [
      TRANSLATIONS.MAIN_PAGE_PLAN_FREE_F1,
      TRANSLATIONS.MAIN_PAGE_PLAN_FREE_F2,
      TRANSLATIONS.MAIN_PAGE_PLAN_FREE_F3,
      TRANSLATIONS.MAIN_PAGE_PLAN_FREE_F4,
      TRANSLATIONS.MAIN_PAGE_PLAN_FREE_F5,
      TRANSLATIONS.MAIN_PAGE_PLAN_FREE_F6,
    ],
    priceValue: TRANSLATIONS.MAIN_PAGE_PLAN_FREE_PRICE,
    pricePeriod: TRANSLATIONS.MAIN_PAGE_PLAN_FREE_PERIOD,
  },
  {
    id: 'one_time',
    available: false,
    featured: false,
    title: TRANSLATIONS.MAIN_PAGE_PLAN_ONETIME_TITLE,
  },
  {
    id: 'basic',
    available: false,
    featured: false,
    title: TRANSLATIONS.MAIN_PAGE_PLAN_BASIC_TITLE,
  },
  {
    id: 'pro',
    available: false,
    featured: false,
    title: TRANSLATIONS.MAIN_PAGE_PLAN_PRO_TITLE,
  },
];

export function MainPagePricingSection() {
  const { t } = useTranslation();

  return (
    <PricingFullBleed id="pricing">
      <PricingFullBleedInner>
        <PricingSection>
          <PricingHeader>
            <PricingTitle variant="h2">
              {t(TRANSLATIONS.MAIN_PAGE_PRICING_TITLE_PREFIX)}
              <PricingTitleSpan>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_TITLE_SPAN)}
              </PricingTitleSpan>
            </PricingTitle>
            <PricingDescription>
              {t(TRANSLATIONS.MAIN_PAGE_PRICING_DESCRIPTION)}
            </PricingDescription>
          </PricingHeader>

          <PricingGrid>
            {LANDING_PLANS.map((plan) => {
              const CardComponent = plan.featured
                ? PricingCardFeatured
                : PricingCard;
              return (
                <Box
                  key={plan.id}
                  sx={{
                    minWidth: 0,
                    display: 'flex',
                    width: '100%',
                    opacity: plan.available ? 1 : DISABLED_OPACITY,
                  }}
                >
                  <CardComponent
                    sx={{
                      width: '100%',
                      position: 'relative',
                      ...(plan.available
                        ? {}
                        : { justifyContent: 'flex-start' }),
                    }}
                  >
                    {plan.available ? (
                      <PricingCardBadge>
                        {t(TRANSLATIONS.MAIN_PAGE_PLAN_AVAILABLE_BADGE)}
                      </PricingCardBadge>
                    ) : null}

                    {plan.available ? (
                      <>
                        <PricingCardHeader>
                          <PricingCardTitle variant="h3">
                            {t(plan.title)}
                          </PricingCardTitle>
                          <PricingCardSubtitle>
                            {t(plan.subtitle)}
                          </PricingCardSubtitle>
                        </PricingCardHeader>

                        <PricingCardPrice>
                          <PricingCardPriceAmount>
                            <PricingCardPriceValue>
                              {t(plan.priceValue)}
                            </PricingCardPriceValue>
                          </PricingCardPriceAmount>
                          <PricingCardPricePeriod>
                            {t(plan.pricePeriod)}
                          </PricingCardPricePeriod>
                        </PricingCardPrice>

                        <PricingCardFeatures>
                          {plan.featureLines.map((line, index) => (
                            <PricingCardFeature
                              key={`${plan.id}-${String(index)}`}
                            >
                              <span>{t(line)}</span>
                            </PricingCardFeature>
                          ))}
                        </PricingCardFeatures>

                        <CustomButton
                          href="/sign-up"
                          variant="contained"
                          color="primary"
                        >
                          {t(TRANSLATIONS.MAIN_PAGE_PRICING_CTA_FREE)}
                        </CustomButton>
                      </>
                    ) : (
                      <>
                        <PricingCardHeader>
                          <PricingCardTitle variant="h3">
                            {t(plan.title)}
                          </PricingCardTitle>
                        </PricingCardHeader>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            py: 3,
                            fontStyle: 'italic',
                          }}
                        >
                          {t(TRANSLATIONS.MAIN_PAGE_PLAN_COMING_SOON)}
                        </Typography>
                      </>
                    )}
                  </CardComponent>
                </Box>
              );
            })}
          </PricingGrid>
        </PricingSection>
      </PricingFullBleedInner>
    </PricingFullBleed>
  );
}

export default MainPagePricingSection;
