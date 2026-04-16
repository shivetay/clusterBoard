import { useMutation } from '@tanstack/react-query';
import { normalizeAppError, resolveApiErrorMessage } from '@/lib/utils';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { AppError } from '@/types';
import apiClient from '../apiClient';

type TSendInvitationData = {
  invitee_email: string;
  project_id?: string;
};

export const useSendInvitation = () => {
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    mutate: sendInvitation,
    isPending,
    error,
  } = useMutation<void, AppError, TSendInvitationData>({
    mutationFn: async (data: TSendInvitationData) => {
      try {
        await apiClient.post('/invitations/invite', data);
      } catch (error: unknown) {
        const appError = normalizeAppError(error);
        throw appError;
      }
    },
    onSuccess: () => {
      setIsOpen(false);
      showAlert({
        message: TRANSLATION_GROUPS.INVITATIONS.INVITATION_SENT_SUCCESSFULLY,
        severity: 'success',
      });
    },
    onError: (error: AppError) => {
      showAlert({
        message: resolveApiErrorMessage(error),
        severity: 'error',
      });
    },
  });

  return {
    sendInvitation,
    isPending,
    error,
  };
};
