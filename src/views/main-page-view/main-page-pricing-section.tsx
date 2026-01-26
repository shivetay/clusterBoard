import { Box } from '@mui/material';
import Link from 'next/link';
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
  PricingCardPriceCurrency,
  PricingCardPricePeriod,
  PricingCardPriceSavings,
  PricingCardPriceValue,
  PricingCardSubtitle,
  PricingCardTitle,
  PricingDescription,
  PricingGrid,
  PricingHeader,
  PricingSection,
  PricingTitle,
  PricingTitleSpan,
} from './main-page.styled';

export function MainPagePricingSection() {
  const { t } = useTranslation();
  return (
    <PricingSection id="pricing">
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
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <PricingCard>
            <PricingCardHeader>
              <PricingCardTitle variant="h3">
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_TITLE)}
              </PricingCardTitle>
              <PricingCardSubtitle>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_SUBTITLE)}
              </PricingCardSubtitle>
            </PricingCardHeader>
            <PricingCardPrice>
              <PricingCardPriceAmount>
                <PricingCardPriceValue>49</PricingCardPriceValue>
                <PricingCardPriceCurrency>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CURRENCY)}
                </PricingCardPriceCurrency>
              </PricingCardPriceAmount>
              <PricingCardPricePeriod>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_PERIOD)}
              </PricingCardPricePeriod>
            </PricingCardPrice>
            <PricingCardFeatures>
              <PricingCardFeature>
                <span>
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_1_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_1_REST)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_2_PREFIX)}
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_2_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_2_SUFFIX)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_3_PREFIX)}
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_3_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_3_SUFFIX)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_4_PREFIX)}
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_1_FEATURE_4_BOLD)}
                  </strong>
                </span>
              </PricingCardFeature>
            </PricingCardFeatures>
            <CustomButton variant="contained" color="primary">
              <Link href="/dashboard" style={{ color: '#000' }}>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CTA)}
              </Link>
            </CustomButton>
          </PricingCard>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <PricingCardFeatured>
            <PricingCardBadge>
              {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_BADGE)}
            </PricingCardBadge>
            <PricingCardHeader>
              <PricingCardTitle variant="h3">
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_TITLE)}
              </PricingCardTitle>
              <PricingCardSubtitle>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_SUBTITLE)}
              </PricingCardSubtitle>
            </PricingCardHeader>
            <PricingCardPrice>
              <PricingCardPriceAmount>
                <PricingCardPriceValue>N/A</PricingCardPriceValue>
                <PricingCardPriceCurrency>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CURRENCY)}
                </PricingCardPriceCurrency>
              </PricingCardPriceAmount>
              <PricingCardPricePeriod>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_PERIOD)}
              </PricingCardPricePeriod>
            </PricingCardPrice>
            <PricingCardFeatures>
              <PricingCardFeature>
                <span>
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_1_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_1_REST)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_2_PREFIX)}
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_2_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_2_SUFFIX)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_3_PREFIX)}
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_3_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_3_SUFFIX)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_4_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_2_FEATURE_4_REST)}
                </span>
              </PricingCardFeature>
            </PricingCardFeatures>
            <CustomButton variant="contained" color="primary">
              <Link href="/dashboard" style={{ color: '#000' }}>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CTA)}
              </Link>
            </CustomButton>
          </PricingCardFeatured>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <PricingCard>
            <PricingCardHeader>
              <PricingCardTitle variant="h3">
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_TITLE)}
              </PricingCardTitle>
              <PricingCardSubtitle>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_SUBTITLE)}
              </PricingCardSubtitle>
            </PricingCardHeader>
            <PricingCardPrice>
              <PricingCardPriceAmount>
                <PricingCardPriceValue>N/A</PricingCardPriceValue>
                <PricingCardPriceCurrency>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CURRENCY)}
                </PricingCardPriceCurrency>
              </PricingCardPriceAmount>
              <PricingCardPricePeriod>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_PERIOD)}
              </PricingCardPricePeriod>
              <PricingCardPriceSavings>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_SAVINGS)}
              </PricingCardPriceSavings>
            </PricingCardPrice>
            <PricingCardFeatures>
              <PricingCardFeature>
                <span>
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_1_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_1_REST)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_2_PREFIX)}
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_2_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_2_SUFFIX)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_3_PREFIX)}
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_3_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_3_SUFFIX)}
                </span>
              </PricingCardFeature>
              <PricingCardFeature>
                <span>
                  <strong>
                    {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_4_BOLD)}
                  </strong>
                  {t(TRANSLATIONS.MAIN_PAGE_PRICING_CARD_3_FEATURE_4_REST)}
                </span>
              </PricingCardFeature>
            </PricingCardFeatures>
            <CustomButton variant="contained" color="primary">
              <Link href="/dashboard" style={{ color: '#000' }}>
                {t(TRANSLATIONS.MAIN_PAGE_PRICING_CTA)}
              </Link>
            </CustomButton>
          </PricingCard>
        </Box>
      </PricingGrid>
    </PricingSection>
  );
}

export default MainPagePricingSection;
