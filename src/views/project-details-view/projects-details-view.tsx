'use client';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageContainer, StatusModal, StatusTags } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import type { IProjectData } from '@/types';
import {
  Header,
  ProjectAddStageButton,
  ProjectInfoContainer,
  ProjectInvestorContainer,
  ProjectStageContainer,
  ProjectStepperContainer,
} from './project-details-view.styled';

interface IProjectDetailsViewProps {
  projectData: IProjectData;
}

export function ProjectDetailsView({ projectData }: IProjectDetailsViewProps) {
  const { t } = useTranslation();
  const { setModalContent } = useModal();

  const { project_name, project_status, investors } = projectData;

  return (
    <PageContainer>
      <ProjectInfoContainer>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Header variant="h3" as="h1">
            {project_name}
          </Header>
          <StatusTags status={project_status} />
        </Stack>
        <ProjectInvestorContainer>
          {investors.map((investor) => {
            return (
              <Header key={investor} as="h6" variant="h6">
                <span>{investor}</span>
              </Header>
            );
          })}
        </ProjectInvestorContainer>
      </ProjectInfoContainer>
      <ProjectStageContainer>
        <ProjectAddStageButton>
          {t(TRANSLATIONS.ADD_STAGE)}
        </ProjectAddStageButton>
        <ProjectAddStageButton onClick={() => setModalContent(<StatusModal />)}>
          {t(TRANSLATIONS.END_PROJECT)}
        </ProjectAddStageButton>
        <ProjectStepperContainer></ProjectStepperContainer>
      </ProjectStageContainer>
    </PageContainer>
  );
}

export default ProjectDetailsView;
