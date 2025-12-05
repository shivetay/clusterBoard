'use client';

import { PageContainer, ProjectDetailCard } from '@/components';
import { ProjectStageContainer } from '@/components/features';
import type { IProjectData } from '@/types';

interface IProjectDetailsViewProps {
  projectData: IProjectData;
}

export function ProjectDetailsView({ projectData }: IProjectDetailsViewProps) {
  const {
    project_name,
    project_status,
    investors,
    description,
    start_date,
    end_date,
    project_stages,
    id,
  } = projectData;

  return (
    <PageContainer>
      <ProjectDetailCard
        projectId={id}
        project_name={project_name}
        project_status={project_status}
        investors={investors}
        description={description}
        start_date={start_date}
        end_date={end_date}
      />
      <ProjectStageContainer project_stages={project_stages} />
    </PageContainer>
  );
}

export default ProjectDetailsView;
