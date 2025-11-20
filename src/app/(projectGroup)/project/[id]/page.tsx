import { getProjectById } from '@/lib';
import { ProjectDetailsView } from '@/views';

interface IProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: IProjectPageProps) {
  const { id } = await params;
  const projectData = await getProjectById(id);

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return <ProjectDetailsView projectData={projectData} />;
}
