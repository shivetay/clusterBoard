'use client';
import { PageHeader } from '@/components/ui';
import { TRANSLATIONS } from '@/locales';
import { ProjectStageContainer as ProjectStageContainerStyled } from './project-stage-container.styled';

export function ProjectStageContainer() {
  return (
    <ProjectStageContainerStyled>
      <PageHeader title={TRANSLATIONS.PROJECT_STAGES} />
    </ProjectStageContainerStyled>
  );
}

export default ProjectStageContainer;
