'use client';
import { useState } from 'react';
import { PageHeader, StageTaskComponent } from '@/components/ui';
import { TRANSLATIONS } from '@/locales';
import {
  ProjectStageContainer as ProjectStageContainerStyled,
  ProjectStageHeaderContainer,
  ProjectStageListContainer,
  StageButton,
  StageDescription,
  StageDivider,
} from './project-stage-container.styled';

export function ProjectStageContainer() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ProjectStageContainerStyled>
      <PageHeader title={TRANSLATIONS.PROJECT_STAGES} />
      <ProjectStageListContainer>
        <ProjectStageHeaderContainer>
          <StageButton
            onClick={() => {
              setIsVisible((prev) => !prev);
            }}
          >
            {'etap 1'}
          </StageButton>
          <StageDivider />
        </ProjectStageHeaderContainer>
        <StageDescription as="h4" variant="h4">
          'description'
        </StageDescription>
        {isVisible && <StageTaskComponent />}
      </ProjectStageListContainer>
    </ProjectStageContainerStyled>
  );
}

export default ProjectStageContainer;
