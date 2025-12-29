import { notFound } from 'next/navigation';
import { getInvitationDetails } from '@/lib/api/invitations/getInvitationDetails';
import { InvitationAcceptView } from '@/views';

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  try {
    const invitationDetails = await getInvitationDetails(token);
    return <InvitationAcceptView invitationDetails={invitationDetails} />;
  } catch (error) {
    // Pass error to client component to handle
    const errorMessage = error instanceof Error ? error.message : 'unknown';
    return (
      <InvitationAcceptView
        invitationDetails={null}
        error={errorMessage === 'INVITATION_CANCELLED' ? 'cancelled' : 'error'}
      />
    );
  }
}
