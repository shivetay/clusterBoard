import { serverGet } from '@/lib/api/projects/serverApiClient';
import type { IInvitationData } from '@/types';
import { ProjectInvitationsView } from '@/views';

interface IProjectInvitationsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectInvitationsPage({
  params,
}: IProjectInvitationsPageProps) {
  const { id } = await params;

  const response = await serverGet<{
    data: { invitations: IInvitationData[] };
  }>(`invitations/project/${id}`);

  const invitations = response.data.invitations;
  if (!invitations) {
    return <div>Invitations not found</div>;
  }

  return <ProjectInvitationsView invitations={invitations} />;
}
