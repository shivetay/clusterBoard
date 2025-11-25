'use client';
import { useAuth } from '@clerk/nextjs';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  AddProjectModal,
  CustomButton,
  Loader,
  PageContainer,
  ProjectsCard,
} from '@/components';
import { useGetUserProjects } from '@/lib';
import { useModal } from '@/providers';
import { useUser } from '@/stores';
import { ActionContainer, ProjectsContainer } from './projects-view.styled';

export function ProjectsView() {
  const { setModalContent } = useModal();
  const { userInfo } = useUser();
  const { data: userProjects, isLoading } = useGetUserProjects();
  const { isLoaded } = useAuth();

  const projectsCount = userInfo?.cluster_projects?.length || 0;
  const projectsLimit = userInfo?.projects_limit || 0;
  const handleModalOpen = () => {
    setModalContent(<AddProjectModal />);
  };

  return (
    <PageContainer>
      <ActionContainer>
        <span>
          {projectsCount}/{projectsLimit}
        </span>
        <CustomButton onClick={handleModalOpen}>
          <AddCircleOutlineOutlinedIcon />
        </CustomButton>
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
              />
            );
          })
        )}
      </ProjectsContainer>
    </PageContainer>
  );
}

export default ProjectsView;
