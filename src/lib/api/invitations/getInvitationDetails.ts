'use server';
import { parseAppError } from '@/lib/utils/parse-app-error';
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
  } catch (error: unknown) {
    const parsedError = parseAppError(error);
    const errorMessage = parsedError.translationKey ?? parsedError.message;

    if (
      errorMessage === 'INVITATION_CANCELLED' ||
      errorMessage.includes('CANCELLED')
    ) {
      throw new Error('INVITATION_CANCELLED');
    }

    if (error instanceof Error) {
      throw new Error(`Failed to get invitation details: ${error.message}`);
    }
    throw new Error('Failed to get invitation details');
  }
}
