'use client';

import { PageContainer, ProjectDetailCard } from '@/components';
import { ProjectStageContainer } from '@/components/features';
import type { IProjectData } from '@/types';

interface IProjectDetailsViewProps {
  projectData: IProjectData;
}

export function ProjectDetailsView({ projectData }: IProjectDetailsViewProps) {
  const { project_stages } = projectData;
  return (
    <PageContainer>
      <ProjectDetailCard projectData={projectData} />
      <ProjectStageContainer
        project_stages={project_stages}
        projectData={projectData}
      />
    </PageContainer>
  );
}
