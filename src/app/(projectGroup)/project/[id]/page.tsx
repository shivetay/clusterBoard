import { serverGet } from '@/lib/api/projects/serverApiClient';
import type { IProjectData } from '@/types';
import { ProjectDetailsView } from '@/views';

interface IProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: IProjectPageProps) {
  const { id } = await params;

  const response = await serverGet<{ data: { project: IProjectData } }>(
    `/projects/${id}`,
    {
      params: {
        next: { revalidate: 0 },
      },
    },
  );

  const projectData = response.data.project;

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return <ProjectDetailsView projectData={projectData} />;
}
