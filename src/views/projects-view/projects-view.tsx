'use client';
import { useAuth } from '@clerk/nextjs';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  Loader,
  PageContainer,
  PageHeader,
  ProjectModal,
  ProjectsCard,
} from '@/components';
import { useGetUserProjects } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import { useUser } from '@/stores';
import {
  ActionContainer,
  ActionContainerHeader,
  ProjectAddButton,
  ProjectsContainer,
  ProjectsCount,
} from './projects-view.styled';

export function ProjectsView() {
  const { setModalContent } = useModal();
  const { userInfo } = useUser();
  const { data: userProjects, isLoading } = useGetUserProjects();
  const { isLoaded } = useAuth();

  const projectsCount = userInfo?.cluster_projects?.length || 0;
  const projectsLimit = userInfo?.projects_limit || 0;
  const handleModalOpen = () => {
    setModalContent(<ProjectModal type="add-project" />);
  };

  return (
    <PageContainer>
      <ActionContainer>
        <ActionContainerHeader>
          <PageHeader title={TRANSLATIONS.AKTYWNE_PROJEKTY} />
          <ProjectsCount>
            {projectsCount}/{projectsLimit}
          </ProjectsCount>
        </ActionContainerHeader>
        <ProjectAddButton onClick={handleModalOpen}>
          <AddCircleOutlineOutlinedIcon />
        </ProjectAddButton>
      </ActionContainer>
      <ProjectsContainer>
        {isLoading || !isLoaded ? (
          <Loader />
        ) : (
          userProjects?.map((data) => {
            return (
              <ProjectsCard
                key={data.id}
                id={data.id}
                investors={data.investors}
                project_status={data.project_status}
                project_name={data.project_name}
                start_date={data.start_date}
                end_date={data.end_date}
                investors_name={data.investors_name}
                isOwner={data.is_owner}
                isInvestor={data.is_investor}
                owner_name={data.owner_name}
              />
            );
          })
        )}
      </ProjectsContainer>
    </PageContainer>
  );
}

export default ProjectsView;
