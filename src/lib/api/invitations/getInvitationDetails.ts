import type { IInvitationData } from '@/types';
import { serverGet } from '../projects';

export async function getInvitationDetails(token: string) {
  try {
    const response = await serverGet<{ data: { invitation: IInvitationData } }>(
      `/invitations/accept/${token}`,
    );

    if (!response.data) {
      throw new Error('Failed to get invitation details');
    }

    return response.data.invitation;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get invitation details: ${error.message}`);
    }
    throw new Error('Failed to get invitation details');
  }
}
