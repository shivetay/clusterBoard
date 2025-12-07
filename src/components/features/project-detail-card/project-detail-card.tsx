'use client';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import { AddStageModal, RemoveProjectModal, StatusModal } from '../modal';
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
  project_name: string;
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
  description: string;
  investors: string[];
  start_date: string;
  end_date: string;
  projectId: string;
}

export function ProjectDetailCard({
  project_name,
  project_status,
  description,
  investors,
  start_date,
  end_date,
  projectId,
}: IProjectDetailCardProps) {
  const { t } = useTranslation();
  const { setModalContent } = useModal();

  return (
    <ProjectInfoContainer>
      <ProjectHeaderContainer>
        <Header variant="h3" as="h1" sx={{ margin: 0 }}>
          {project_name}
        </Header>
        <StatusTags status={project_status} />
      </ProjectHeaderContainer>
      <ProjectDescription>{description}'asdasda'</ProjectDescription>
      <SectionDivider />
      <ProjectInvestorContainer>
        <Box>
          <Label>Investors</Label>
          {investors.map((investor) => {
            return <StatusTags investor={investor} key={investor} />;
          })}
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Label>startDate</Label>
          <Label>{start_date || Date.now()}</Label>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Label>endDate</Label>
          <Label>{end_date || Date.now()}</Label>
        </Box>
      </ProjectInvestorContainer>
      <ProjectsActionsContainer>
        <ProjectAddStageButton
          color="primary"
          variant="contained"
          startIcon={<PersonAddAltOutlinedIcon />}
        >
          {t(TRANSLATIONS.ADD_INVESTOR)}
        </ProjectAddStageButton>
        <ProjectAddStageButton
          color="secondary"
          variant="outlined"
          startIcon={<PostAddOutlinedIcon />}
          onClick={() =>
            setModalContent(<AddStageModal projectId={projectId} />)
          }
        >
          {t(TRANSLATIONS.ADD_STAGE)}
        </ProjectAddStageButton>
        <ProjectAddStageButton
          color="secondary"
          variant="outlined"
          startIcon={<EditNoteOutlinedIcon />}
          onClick={() => setModalContent(<StatusModal />)}
        >
          {t(TRANSLATIONS.STATUS_CHANGE)}
        </ProjectAddStageButton>
        <ProjectAddStageButton
          color="secondary"
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
        >
          {t(TRANSLATIONS.PROJECT_EDIT_BTN)}
        </ProjectAddStageButton>
        <ProjectAddStageButton
          color="secondary"
          variant="outlined"
          startIcon={<AddTaskOutlinedIcon />}
        >
          {t(TRANSLATIONS.PROJECT_END_BTN)}
        </ProjectAddStageButton>
        <ProjectAddStageButton
          color="secondary"
          variant="outlined"
          startIcon={<DeleteForeverOutlinedIcon />}
          onClick={() =>
            setModalContent(<RemoveProjectModal projectId={projectId} />)
          }
        >
          {t(TRANSLATIONS.PROJECT_REMOVE_BTN)}
        </ProjectAddStageButton>
      </ProjectsActionsContainer>
    </ProjectInfoContainer>
  );
}
export default ProjectDetailCard;
