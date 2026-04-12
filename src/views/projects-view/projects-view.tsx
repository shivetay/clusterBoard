'use client';
import { useAuth } from '@clerk/nextjs';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useSearchParams } from 'next/navigation';
import {
  CollectionPagination,
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
  const searchParams = useSearchParams();
  const currentPage = Math.max(
    1,
    Number.parseInt(searchParams.get('page') || '1', 10) || 1,
  );

  const { setModalContent } = useModal();
  const { userInfo } = useUser();
  const {
    data: userProjects,
    isLoading,
    pagination,
  } = useGetUserProjects(currentPage);
  const { isLoaded } = useAuth();

  const projectsUsed =
    userInfo?.subscription?.usage?.active_owned_projects ?? 0;
  const projectsLimit =
    userInfo?.subscription?.limits?.max_projects ??
    userInfo?.projects_limit ??
    0;
  const handleModalOpen = () => {
    setModalContent(<ProjectModal type="add-project" />);
  };

  return (
    <PageContainer>
      <ActionContainer>
        <ActionContainerHeader>
          <PageHeader title={TRANSLATIONS.AKTYWNE_PROJEKTY} />
          <ProjectsCount>
            {projectsUsed}/{projectsLimit}
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
      <CollectionPagination pagination={pagination} />
    </PageContainer>
  );
}

export default ProjectsView;
