'use client';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CustomButton, PageContainer, ProjectsCard } from '@/components';
import AddProjectModal from '@/components/modal/modals/add-project';
import { useModal } from '@/providers';
import { ActionContainer, ProjectsContainer } from './projects-view.styled';

type ProjectStatus = 'zakończony' | 'w toku' | 'w przygotowaniu';

interface ProjectData {
  id: string;
  project_name: string;
  investors: string[];
  project_status: ProjectStatus;
}

const PROJECT_INFO_DATA: ProjectData[] = [
  {
    id: '1234',
    project_name: 'Projekt mieszkanie m3',
    investors: ['Jan Kowalski', 'Grażyna Kowalska'],
    project_status: 'w toku',
  },
  {
    id: '1235',
    project_name: 'Kuchnia w przyczepie',
    investors: ['Adam Potocki', 'Jan Wilczur'],
    project_status: 'zakończony',
  },
  {
    id: '1275',
    project_name: 'Kuchnia w przyczepie 2',
    investors: ['Jan Wilczur'],
    project_status: 'zakończony',
  },
  {
    id: '3235',
    project_name: 'Kuchnia w przyczepie 3',
    investors: ['Jan Wilczur'],
    project_status: 'zakończony',
  },
];

export function ProjectsView() {
  const { setModalContent } = useModal();

  const handleModalOpen = () => {
    setModalContent(<AddProjectModal />);
  };
  return (
    <PageContainer>
      <ActionContainer>
        <span>2/5</span>
        <CustomButton onClick={handleModalOpen}>
          <AddCircleOutlineOutlinedIcon />
        </CustomButton>
      </ActionContainer>
      <ProjectsContainer>
        {PROJECT_INFO_DATA.map((data) => {
          return (
            <ProjectsCard
              key={data.id}
              id={data.id}
              investors={data.investors}
              project_status={data.project_status}
              project_name={data.project_name}
            />
          );
        })}
      </ProjectsContainer>
    </PageContainer>
  );
}

export default ProjectsView;
