'use client';
import { useState } from 'react';
import { PageHeader, StageTaskComponent } from '@/components/ui';
import { TRANSLATIONS } from '@/locales';
import type { IProjectStage } from '@/types';
import {
  ProjectStageContainer as ProjectStageContainerStyled,
  ProjectStageHeaderContainer,
  ProjectStageListContainer,
  StageButton,
  StageDescription,
  StageDivider,
} from './project-stage-container.styled';

interface IProjectStageData {
  project_stages: IProjectStage[];
}

export function ProjectStageContainer({ project_stages }: IProjectStageData) {
  const [visibleStage, setVisibleStage] = useState<string | null>(null);

  return (
    <ProjectStageContainerStyled>
      <PageHeader title={TRANSLATIONS.PROJECT_STAGES} />
      {project_stages.map((stage) => {
        return (
          <ProjectStageListContainer key={stage.stage_name}>
            <ProjectStageHeaderContainer>
              <StageButton
                onClick={() => {
                  setVisibleStage((prev) =>
                    prev === stage.stage_name ? null : stage.stage_name,
                  );
                }}
              >
                {stage.stage_name}
              </StageButton>
              <StageDivider />
            </ProjectStageHeaderContainer>
            <StageDescription as="h4" variant="h4">
              {stage.stage_description}
            </StageDescription>

            {visibleStage === stage.stage_name && <StageTaskComponent />}
          </ProjectStageListContainer>
        );
      })}
    </ProjectStageContainerStyled>
  );
}

export default ProjectStageContainer;
