'use client';
import { CustomButton, PageContainer, ProjectsCard } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { ActionContainer, ProjectsContainer } from './projects-view.styled';

type ProjectStatus = 'zakończony' | 'w toku' | 'w przygotowaniu';

interface ProjectData {
  id: string;
  project_name: string;
  color: string;
  investors: string[];
  project_status: ProjectStatus;
}

const PROJECT_INFO_DATA: ProjectData[] = [
  {
    id: '1234',
    project_name: 'Projekt mieszkanie m3',
    color: '#01c3a8',
    investors: ['Jan Kowalski', 'Grażyna Kowalska'],
    project_status: 'w toku',
  },
  {
    id: '1235',
    project_name: 'Kuchnia w przyczepie',
    investors: ['Adam Potocki', 'Jan Wilczur'],
    color: '#c301a8',
    project_status: 'zakończony',
  },
  {
    id: '1235',
    project_name: 'Kuchnia w przyczepie 2',
    investors: ['Jan Wilczur'],
    color: '#c301a8',
    project_status: 'zakończony',
  },
  {
    id: '3235',
    project_name: 'Kuchnia w przyczepie 3',
    investors: ['Jan Wilczur'],
    color: '#c301a8',
    project_status: 'zakończony',
  },
];

export function ProjectsView() {
  return (
    <PageContainer>
      <ActionContainer>
        <span>2/5</span>
        <CustomButton>{TRANSLATIONS.ADD_NEW_PROJECT}</CustomButton>
      </ActionContainer>
      <ProjectsContainer>
        {PROJECT_INFO_DATA.map((data) => {
          return (
            <ProjectsCard
              key={data.id}
              id={data.id}
              color={data.color}
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
