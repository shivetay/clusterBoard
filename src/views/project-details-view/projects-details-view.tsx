'use client';
import { Step, StepButton, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageContainer, StatusTags } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import { DUMMY_DATA } from './dummy_data';
import {
  ProjectAddStageButton,
  ProjectInfoContainer,
  ProjectInvestorContainer,
  ProjectStageContainer,
  ProjectStepperContainer,
} from './project-details-view.styled';

// TODO add global type
type TStatusTagProps = 'zakończony' | 'w toku' | 'w przygotowaniu';

interface IProjectDetailsViewProps {
  projectId: string;
}

export function ProjectDetailsView({ projectId }: IProjectDetailsViewProps) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
  const projectData =
    projectId in DUMMY_DATA
      ? DUMMY_DATA[projectId as keyof typeof DUMMY_DATA]
      : undefined;

  if (!projectData) {
    return (
      <PageContainer>
        <div>Project not found</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProjectInfoContainer cardColor={projectData.color}>
        <Typography gutterBottom variant="h3" component="h1">
          {projectData.project_title}
        </Typography>
        <ProjectInvestorContainer>
          {projectData.investors.map((investor) => {
            return (
              <Typography key={investor} component="h6" variant="h6">
                <span>{investor}</span>
              </Typography>
            );
          })}
          <StatusTags status={projectData.project_status as TStatusTagProps} />
        </ProjectInvestorContainer>
      </ProjectInfoContainer>
      <ProjectStageContainer>
        <ProjectAddStageButton onClick={() => setIsOpen(true)}>
          {t(TRANSLATIONS.ADD_STAGE)}
        </ProjectAddStageButton>
        <ProjectAddStageButton>
          {t(TRANSLATIONS.END_PROJECT)}
        </ProjectAddStageButton>
        <ProjectStepperContainer>
          <Stepper>
            {Object.keys(projectData.project_stages).map((stageKey) => {
              return (
                <Step key={stageKey}>
                  <StepButton />
                </Step>
              );
            })}
          </Stepper>
        </ProjectStepperContainer>
        {Object.entries(projectData.project_stages).map(([stageKey, stages]) =>
          stages.map((stage) => (
            <div
              key={`${stageKey}-${stage.stage_description}-${stage.stage_tasks[0]?.task_id || ''}`}
            >
              <div>{stage.stage_description}</div>
              {stage.stage_tasks.map((task) => (
                <div key={task.task_id}>
                  <div>{task.task_description}</div>
                  <div>
                    {task.task_comments.map((comment) => {
                      return comment.comment_text;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )),
        )}
      </ProjectStageContainer>
    </PageContainer>
  );
}

export default ProjectDetailsView;
