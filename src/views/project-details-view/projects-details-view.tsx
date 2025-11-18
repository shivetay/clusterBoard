'use client';
import { Stack, Step, StepButton, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageContainer, StatusModal, StatusTags } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import { DUMMY_DATA } from './dummy_data';
import {
  Header,
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
  const { setModalContent } = useModal();
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
      <ProjectInfoContainer>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Header gutterBottom variant="h3" as="h1">
            {projectData.project_title}
          </Header>
          <StatusTags status={projectData.project_status as TStatusTagProps} />
        </Stack>
        <ProjectInvestorContainer>
          {projectData.investors.map((investor) => {
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
