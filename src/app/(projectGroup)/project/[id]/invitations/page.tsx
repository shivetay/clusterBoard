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

  const [invitationsSettled, projectSettled] = await Promise.allSettled([
    serverGet<{ data: { invitations: IInvitationData[] } }>(
      `invitations/project/${id}`,
    ),
    serverGet<{ data: { project: IProjectData } }>(`/projects/${id}`),
  ]);

  if (invitationsSettled.status === 'rejected') {
    throw invitationsSettled.reason;
  }

  const invitationsRes = invitationsSettled.value;
  const invitations = invitationsRes.data.invitations;
  if (!invitations) {
    return <div>{TRANSLATIONS.NO_INVITATIONS_FOUND}</div>;
  }

  let investorSlots: { used: number; max: number | null } | undefined;
  if (projectSettled.status === 'fulfilled') {
    investorSlots = projectSettled.value.data?.project?.investor_slots;
  }

  return (
    <ProjectInvitationsView
      invitations={invitations}
      projectId={id}
      investorSlots={investorSlots}
    />
  );
}
