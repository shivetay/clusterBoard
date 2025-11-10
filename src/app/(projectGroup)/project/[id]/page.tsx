import { ProjectDetailsView } from '@/views';

interface IProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: IProjectPageProps) {
  const { id } = await params;

  return <ProjectDetailsView projectId={id} />;
}
