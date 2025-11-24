import { ClerkLoaded } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { getProjectById } from '@/lib';
import { ProjectDetailsView } from '@/views';

interface IProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: IProjectPageProps) {
  const { id } = await params;
  const { getToken } = await auth();
  const token = await getToken();

  const projectData = await getProjectById(id, token);

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return (
    <ClerkLoaded>
      <ProjectDetailsView projectData={projectData} />
    </ClerkLoaded>
  );
}
