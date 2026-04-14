import { Box } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components';
import { TRANSLATION_GROUPS } from '@/locales';
import {
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroDescription,
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
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_HERO_TITLE_1)}
              <HeroTitleSpan as="span">
                {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_HERO_TITLE_2)}
              </HeroTitleSpan>
            </HeroTitle>

            <HeroDescription>
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_HERO_DESCRIPTION)}
            </HeroDescription>

            <HeroActions>
              <CustomButton variant="contained" color="primary" href="/sign-up">
                {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_FREE_BUTTON_TEXT)}
              </CustomButton>
            </HeroActions>
          </HeroContent>
        </Box>

        <Box>
          <HeroImageContainer>
            <HeroImageCard>
              <Image
                src="/assets/images/board-mockup.jpg"
                width={500}
                height={500}
                sizes="(max-width: 500px) 100vw, 500px"
                style={{ width: '100%', height: 'auto' }}
                alt={t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_HERO_IMAGE_ALT)}
              />
            </HeroImageCard>
            <HeroStatCardBottom>
              <HeroStatValue>100%</HeroStatValue>
              <HeroStatLabel>
                {t(
                  TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_HERO_STAT_TRANSPARENCY,
                )}
              </HeroStatLabel>
            </HeroStatCardBottom>
            <HeroStatCardTop>
              <HeroStatValue sx={{ color: 'secondary.main' }}>0</HeroStatValue>
              <HeroStatLabel>
                {t(
                  TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_HERO_STAT_LOST_EMAILS,
                )}
              </HeroStatLabel>
            </HeroStatCardTop>
          </HeroImageContainer>
        </Box>
      </HeroContainer>
    </HeroSection>
  );
}

export default MainPageHero;
