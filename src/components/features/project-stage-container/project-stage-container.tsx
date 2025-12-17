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
import type { IStageData } from '@/types';
import { StageModal } from '../modal/modals';
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
  project_stages: IStageData[];
}

export function ProjectStageContainer({ project_stages }: IProjectStageData) {
  const [visibleStage, setVisibleStage] = useState<string | null>(null);
  const { setModalContent } = useModal();

  const handleRemoveStage = (stageData: IStageData) => {
    setModalContent(<StageModal type="delete-stage" stageData={stageData} />);
  };

  const handleAddStageTask = (stageData: IStageData) => {
    setModalContent(<StageModal type="add-stage-task" stageData={stageData} />);
  };

  const handleEditStage = (stageData: IStageData) => {
    setModalContent(<StageModal type="edit-stage" stageData={stageData} />);
  };

  const handleCloseStage = (stageData: IStageData) => {
    setModalContent(<StageModal type="close-stage" stageData={stageData} />);
  };

  return (
    <ProjectStageContainerStyled>
      <PageHeader title={TRANSLATIONS.PROJECT_STAGES} />
      {project_stages.map((stage) => {
        return (
          <ProjectStageListContainer key={stage.stage_name}>
            <ProjectStageHeaderContainer>
              <StageButton
                isDisabled={stage.is_done}
                onClick={() => {
                  setVisibleStage((prev) =>
                    prev === stage.stage_name ? null : stage.stage_name,
                  );
                }}
              >
                {stage.stage_name}
              </StageButton>
              <ActionButtons
                disabled={stage.is_done}
                startIcon={<PlaylistAddOutlinedIcon />}
                onClick={() => handleAddStageTask(stage)}
              />
              <StageDivider isDisabled={stage.is_done} />
              <Box display="flex" flexDirection="row">
                <ActionButtons
                  disabled={stage.is_done}
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => handleEditStage(stage)}
                />
                <ActionButtons
                  disabled={stage.is_done}
                  startIcon={<CheckCircleOutlineOutlinedIcon />}
                  onClick={() => handleCloseStage(stage)}
                />
                <ActionButtons
                  disabled={stage.is_done}
                  startIcon={
                    <DeleteForeverOutlinedIcon
                      onClick={() => {
                        handleRemoveStage(stage);
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
              <StageTaskComponent
                stage_tasks={stage.stage_tasks}
                isStageClosed={stage.is_done}
              />
            )}
          </ProjectStageListContainer>
        );
      })}
    </ProjectStageContainerStyled>
  );
}

export default ProjectStageContainer;
