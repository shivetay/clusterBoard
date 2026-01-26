import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components';
import { TRANSLATIONS } from '@/locales';
import {
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroFeatureItem,
  HeroFeatures,
  HeroImageCard,
  HeroImageContainer,
  HeroSection,
  HeroStatCardBottom,
  HeroStatCardTop,
  HeroStatLabel,
  HeroStatValue,
  HeroTitle,
  HeroTitleSpan,
} from './main-page.styled';

export function MainPageHero() {
  const { t } = useTranslation();
  return (
    <HeroSection>
      <HeroContainer>
        <Box>
          <HeroContent>
            <HeroTitle variant="h1">
              {t(TRANSLATIONS.MAIN_PAGE_HERO_TITLE_1)}
              <HeroTitleSpan as="span">
                {t(TRANSLATIONS.MAIN_PAGE_HERO_TITLE_2)}
              </HeroTitleSpan>
            </HeroTitle>

            <HeroDescription>
              {t(TRANSLATIONS.MAIN_PAGE_HERO_DESCRIPTION)}
            </HeroDescription>

            <HeroActions>
              <CustomButton variant="contained" color="primary">
                {t(TRANSLATIONS.MAIN_PAGE_BUTTON_TEXT)}
              </CustomButton>
            </HeroActions>

            <HeroFeatures>
              <HeroFeatureItem>
                <CheckCircleOutlineOutlinedIcon />
                <span>{t(TRANSLATIONS.MAIN_PAGE_HERO_FEATURE_NO_CARD)}</span>
              </HeroFeatureItem>
              <HeroFeatureItem>
                <CheckCircleOutlineOutlinedIcon />
                <span>{t(TRANSLATIONS.MAIN_PAGE_HERO_FEATURE_SETUP)}</span>
              </HeroFeatureItem>
            </HeroFeatures>
          </HeroContent>
        </Box>

        <Box>
          <HeroImageContainer>
            <HeroImageCard>
              <Image
                src="/assets/images/board-mockup.jpg"
                width={500}
                height={500}
                alt={t(TRANSLATIONS.MAIN_PAGE_HERO_IMAGE_ALT)}
              />
            </HeroImageCard>
            <HeroStatCardBottom>
              <HeroStatValue>100%</HeroStatValue>
              <HeroStatLabel>
                {t(TRANSLATIONS.MAIN_PAGE_HERO_STAT_TRANSPARENCY)}
              </HeroStatLabel>
            </HeroStatCardBottom>
            <HeroStatCardTop>
              <HeroStatValue sx={{ color: 'secondary.main' }}>0</HeroStatValue>
              <HeroStatLabel>
                {t(TRANSLATIONS.MAIN_PAGE_HERO_STAT_LOST_EMAILS)}
              </HeroStatLabel>
            </HeroStatCardTop>
          </HeroImageContainer>
        </Box>
      </HeroContainer>
    </HeroSection>
  );
}

export default MainPageHero;
