'use client';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import type { IProjectData } from '@/types';
import { ProjectModal, StageModal } from '../modal';
import { StatusTags } from '../tags';
import {
  Header,
  Label,
  ProjectAddStageButton,
  ProjectDescription,
  ProjectHeaderContainer,
  ProjectInfoContainer,
  ProjectInvestorContainer,
  ProjectsActionsContainer,
  SectionDivider,
} from './project-detail-card.styled';

interface IProjectDetailCardProps {
  projectData: IProjectData;
}

export function ProjectDetailCard({ projectData }: IProjectDetailCardProps) {
  const {
    id,
    project_name,
    project_status,
    project_description,
    investors,
    start_date,
    end_date,
  } = projectData;
  const { t } = useTranslation();
  const { setModalContent } = useModal();
  const isDisabled = project_status === 'zakończony';

  return (
    <ProjectInfoContainer>
      <ProjectHeaderContainer>
        <Header variant="h3" as="h1" sx={{ margin: 0 }}>
          {project_name}
        </Header>
        <StatusTags status={project_status} />
      </ProjectHeaderContainer>
      <ProjectDescription>{project_description}</ProjectDescription>
      <SectionDivider />
      <ProjectInvestorContainer>
        <Box>
          <Label>{t(TRANSLATIONS.INVESTORS)}</Label>
          {investors.map((investor) => {
            return <StatusTags investor={investor} key={investor} />;
          })}
        </Box>
        {start_date && (
          <Box display="flex" flexDirection="column" gap={1}>
            <Label>{t(TRANSLATIONS.START_DATE)}</Label>
            <Label>{formatDate(start_date)}</Label>
          </Box>
        )}
        {end_date && (
          <Box display="flex" flexDirection="column" gap={1}>
            <Label>{t(TRANSLATIONS.END_DATE)}</Label>
            <Label>{formatDate(end_date)}</Label>
          </Box>
        )}
      </ProjectInvestorContainer>
      <ProjectsActionsContainer>
        <ProjectAddStageButton
          disabled={isDisabled}
          color="primary"
          variant="contained"
          startIcon={<PersonAddAltOutlinedIcon />}
        >
          {t(TRANSLATIONS.ADD_INVESTOR)}
        </ProjectAddStageButton>
        <ProjectAddStageButton
          disabled={isDisabled}
          color="secondary"
          variant="outlined"
          startIcon={<PostAddOutlinedIcon />}
          onClick={() =>
            setModalContent(<StageModal type="add-stage" projectId={id} />)
          }
        >
          {t(TRANSLATIONS.ADD_STAGE)}
        </ProjectAddStageButton>
        <ProjectAddStageButton
          color="secondary"
          variant="outlined"
          startIcon={<EditNoteOutlinedIcon />}
          onClick={() =>
            setModalContent(
              <ProjectModal type="change-status" projectData={projectData} />,
            )
          }
        >
          {t(TRANSLATIONS.STATUS_CHANGE)}
        </ProjectAddStageButton>

        <ProjectAddStageButton
          disabled={isDisabled}
          color="secondary"
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={() =>
            setModalContent(
              <ProjectModal type="edit-project" projectData={projectData} />,
            )
          }
        >
          {t(TRANSLATIONS.PROJECT_EDIT_BTN)}
        </ProjectAddStageButton>

        <ProjectAddStageButton
          disabled={isDisabled}
          color="secondary"
          variant="outlined"
          startIcon={<AddTaskOutlinedIcon />}
          onClick={() =>
            setModalContent(
              <ProjectModal type="end-project" projectData={projectData} />,
            )
          }
        >
          {t(TRANSLATIONS.PROJECT_END_BTN)}
        </ProjectAddStageButton>

        <ProjectAddStageButton
          disabled={isDisabled}
          color="secondary"
          variant="outlined"
          startIcon={<DeleteForeverOutlinedIcon />}
          onClick={() =>
            setModalContent(
              <ProjectModal type="delete-project" projectData={projectData} />,
            )
          }
        >
          {t(TRANSLATIONS.PROJECT_REMOVE_BTN)}
        </ProjectAddStageButton>
      </ProjectsActionsContainer>
    </ProjectInfoContainer>
  );
}
export default ProjectDetailCard;
