import { getInvitationDetails } from '@/lib/api/invitations/getInvitationDetails';
import { InvitationAcceptView } from '@/views';

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    throw new Error('Token is required');
  }

  const invitationDetails = await getInvitationDetails(token);

  return <InvitationAcceptView invitationDetails={invitationDetails} />;
}
