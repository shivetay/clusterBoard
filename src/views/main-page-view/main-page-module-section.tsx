import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import {
  ModuleCard,
  ModuleCardDescription,
  ModuleCardFeature,
  ModuleCardIcon,
  ModuleCardIconSecondary,
  ModuleCardSecondary,
  ModuleCardTitle,
  ModulesDescription,
  ModulesGrid,
  ModulesHeader,
  ModulesSection,
  ModulesTitle,
  ModulesTitleSpan,
} from './main-page.styled';

export function MainPageModuleSection() {
  const { t } = useTranslation();
  return (
    <ModulesSection id="features">
      <ModulesHeader>
        <ModulesTitle variant="h2">
          {t(TRANSLATIONS.MAIN_PAGE_MODULES_TITLE)}
          <ModulesTitleSpan>
            {t(TRANSLATIONS.MAIN_PAGE_MODULES_TITLE_SPAN)}
          </ModulesTitleSpan>
        </ModulesTitle>
        <ModulesDescription>
          {t(TRANSLATIONS.MAIN_PAGE_MODULES_DESCRIPTION)}
        </ModulesDescription>
      </ModulesHeader>

      <ModulesGrid>
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <ModuleCard>
            <ModuleCardIcon>
              <ViewInArOutlinedIcon />
            </ModuleCardIcon>
            <ModuleCardTitle variant="h3">
              {t(TRANSLATIONS.MAIN_PAGE_MODULE_1_TITLE)}
            </ModuleCardTitle>
            <ModuleCardDescription>
              {t(TRANSLATIONS.MAIN_PAGE_MODULE_1_DESC)}
            </ModuleCardDescription>
            <ModuleCardFeature>
              <span>{t(TRANSLATIONS.MAIN_PAGE_MODULE_1_FEATURE)}</span>
            </ModuleCardFeature>
          </ModuleCard>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <ModuleCardSecondary>
            <ModuleCardIconSecondary>
              <PictureAsPdfOutlinedIcon />
            </ModuleCardIconSecondary>
            <ModuleCardTitle variant="h3">
              {t(TRANSLATIONS.MAIN_PAGE_MODULE_2_TITLE)}
            </ModuleCardTitle>
            <ModuleCardDescription>
              {t(TRANSLATIONS.MAIN_PAGE_MODULE_2_DESC)}
            </ModuleCardDescription>
            <ModuleCardFeature>
              <span>{t(TRANSLATIONS.MAIN_PAGE_MODULE_2_FEATURE)}</span>
            </ModuleCardFeature>
          </ModuleCardSecondary>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <ModuleCard>
            <ModuleCardIcon>
              <ViewInArOutlinedIcon />
            </ModuleCardIcon>
            <ModuleCardTitle variant="h3">
              {t(TRANSLATIONS.MAIN_PAGE_MODULE_3_TITLE)}
            </ModuleCardTitle>
            <ModuleCardDescription>
              {t(TRANSLATIONS.MAIN_PAGE_MODULE_3_DESC)}
            </ModuleCardDescription>
            <ModuleCardFeature>
              <span>{t(TRANSLATIONS.MAIN_PAGE_MODULE_3_FEATURE)}</span>
            </ModuleCardFeature>
          </ModuleCard>
        </Box>
      </ModulesGrid>
    </ModulesSection>
  );
}

export default MainPageModuleSection;
