import { serverGet } from '@/lib/api/projects/serverApiClient';
import { TRANSLATIONS } from '@/locales/pl/locales';
import type { IInvitationData, IProjectData } from '@/types';
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

  const invitationsRes = await serverGet<{
    data: { invitations: IInvitationData[] };
  }>(`invitations/project/${id}`);

  const invitations = invitationsRes.data.invitations;
  if (!invitations) {
    return <div>{TRANSLATIONS.NO_INVITATIONS_FOUND}</div>;
  }

  let investorSlots: { used: number; max: number | null } | undefined;
  try {
    const projectRes = await serverGet<{ data: { project: IProjectData } }>(
      `/projects/${id}`,
    );
    investorSlots = projectRes.data?.project?.investor_slots;
  } catch {
    investorSlots = undefined;
  }

  return (
    <ProjectInvitationsView
      invitations={invitations}
      projectId={id}
      investorSlots={investorSlots}
    />
  );
}
