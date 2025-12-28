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
  } catch (error: any) {
    // Check if it's an axios error with response data
    if (error?.response?.data?.message) {
      const errorMessage = error.response.data.message;
      // If the backend returns INVITATION_CANCELLED, throw a specific error
      if (
        errorMessage === 'INVITATION_CANCELLED' ||
        errorMessage.includes('CANCELLED')
      ) {
        throw new Error('INVITATION_CANCELLED');
      }
      throw new Error(errorMessage);
    }
    if (error instanceof Error) {
      throw new Error(`Failed to get invitation details: ${error.message}`);
    }
    throw new Error('Failed to get invitation details');
  }
}
