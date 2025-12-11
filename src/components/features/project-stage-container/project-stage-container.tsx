'use client';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { Box } from '@mui/material';
import { useState } from 'react';
import { PageHeader, StageTaskComponent } from '@/components/ui';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import type { IProjectStage } from '@/types';
import { AddStageTaskModal, RemoveStageModal } from '../modal/modals';
import {
  ActionButtons,
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
  const { setModalContent } = useModal();

  const handleRemoveStage = (stage_id: string) => {
    setModalContent(<RemoveStageModal stage_id={stage_id} />);
  };

  const handleAddStageTask = (stage_id: string) => {
    setModalContent(<AddStageTaskModal stage_id={stage_id} />);
  };

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
              <ActionButtons
                startIcon={<PlaylistAddOutlinedIcon />}
                onClick={() => handleAddStageTask(stage.id)}
              />
              <StageDivider />
              <Box display="flex" flexDirection="row">
                <ActionButtons startIcon={<EditOutlinedIcon />} />
                <ActionButtons startIcon={<CheckCircleOutlineOutlinedIcon />} />
                <ActionButtons
                  startIcon={
                    <DeleteForeverOutlinedIcon
                      onClick={() => {
                        handleRemoveStage(stage.id);
                      }}
                    />
                  }
                />
              </Box>
            </ProjectStageHeaderContainer>
            <StageDescription as="h4" variant="h4">
              {stage.stage_description}
            </StageDescription>

            {visibleStage === stage.stage_name && (
              <StageTaskComponent stage_tasks={stage.stage_tasks} />
            )}
          </ProjectStageListContainer>
        );
      })}
    </ProjectStageContainerStyled>
  );
}

export default ProjectStageContainer;
