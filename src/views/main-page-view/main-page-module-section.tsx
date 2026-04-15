import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_GROUPS } from '@/locales';
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
          {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULES_TITLE)}
          <ModulesTitleSpan>
            {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULES_TITLE_SPAN)}
          </ModulesTitleSpan>
        </ModulesTitle>
        <ModulesDescription>
          {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULES_DESCRIPTION)}
        </ModulesDescription>
      </ModulesHeader>

      <ModulesGrid>
        <Box sx={{ minWidth: 0, display: 'flex', width: '100%' }}>
          <ModuleCard>
            <ModuleCardIcon>
              <ViewInArOutlinedIcon />
            </ModuleCardIcon>
            <ModuleCardTitle variant="h3">
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_1_TITLE)}
            </ModuleCardTitle>
            <ModuleCardDescription>
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_1_DESC)}
            </ModuleCardDescription>
            <ModuleCardFeature>
              <span>
                {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_1_FEATURE)}
              </span>
            </ModuleCardFeature>
          </ModuleCard>
        </Box>

        <Box sx={{ minWidth: 0, display: 'flex', width: '100%' }}>
          <ModuleCardSecondary>
            <ModuleCardIconSecondary>
              <PictureAsPdfOutlinedIcon />
            </ModuleCardIconSecondary>
            <ModuleCardTitle variant="h3">
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_2_TITLE)}
            </ModuleCardTitle>
            <ModuleCardDescription>
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_2_DESC)}
            </ModuleCardDescription>
            <ModuleCardFeature>
              <span>
                {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_2_FEATURE)}
              </span>
            </ModuleCardFeature>
          </ModuleCardSecondary>
        </Box>

        <Box sx={{ minWidth: 0, display: 'flex', width: '100%' }}>
          <ModuleCard>
            <ModuleCardIcon>
              <ViewInArOutlinedIcon />
            </ModuleCardIcon>
            <ModuleCardTitle variant="h3">
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_3_TITLE)}
            </ModuleCardTitle>
            <ModuleCardDescription>
              {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_3_DESC)}
            </ModuleCardDescription>
            <ModuleCardFeature>
              <span>
                {t(TRANSLATION_GROUPS.MAIN_PAGE.MAIN_PAGE_MODULE_3_FEATURE)}
              </span>
            </ModuleCardFeature>
          </ModuleCard>
        </Box>
      </ModulesGrid>
    </ModulesSection>
  );
}

export default MainPageModuleSection;
