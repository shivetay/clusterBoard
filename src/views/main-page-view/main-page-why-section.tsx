import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import {
  WhyCard,
  WhyCardDescription,
  WhyCardIcon,
  WhyCardIconSecondary,
  WhyCardTitle,
  WhyContainer,
  WhyGrid,
  WhyHeader,
  WhySection,
  WhyTitle,
  WhyTitleSpan,
} from './main-page.styled';

export function MainPageWhySection() {
  const { t } = useTranslation();
  return (
    <WhySection>
      <WhyContainer>
        <WhyHeader>
          <WhyTitle variant="h2">
            {t(TRANSLATIONS.MAIN_PAGE_WHY_TITLE_PREFIX)}
            <WhyTitleSpan>
              {t(TRANSLATIONS.MAIN_PAGE_WHY_TITLE_SPAN)}
            </WhyTitleSpan>
            {t(TRANSLATIONS.MAIN_PAGE_WHY_TITLE_SUFFIX)}
          </WhyTitle>
        </WhyHeader>

        <WhyGrid>
          <Box>
            <WhyCard>
              <WhyCardIcon>
                <GraphicEqOutlinedIcon />
              </WhyCardIcon>
              <WhyCardTitle variant="h3">
                {t(TRANSLATIONS.MAIN_PAGE_WHY_CARD_1_TITLE)}
              </WhyCardTitle>
              <WhyCardDescription>
                {t(TRANSLATIONS.MAIN_PAGE_WHY_CARD_1_DESC)}
              </WhyCardDescription>
            </WhyCard>
          </Box>

          <Box>
            <WhyCard>
              <WhyCardIconSecondary>
                <Diversity3OutlinedIcon />
              </WhyCardIconSecondary>
              <WhyCardTitle variant="h3">
                {t(TRANSLATIONS.MAIN_PAGE_WHY_CARD_2_TITLE)}
              </WhyCardTitle>
              <WhyCardDescription>
                {t(TRANSLATIONS.MAIN_PAGE_WHY_CARD_2_DESC)}
              </WhyCardDescription>
            </WhyCard>
          </Box>
        </WhyGrid>
      </WhyContainer>
    </WhySection>
  );
}

export default MainPageWhySection;
