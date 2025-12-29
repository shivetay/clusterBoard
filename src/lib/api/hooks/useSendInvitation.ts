import { useMutation } from '@tanstack/react-query';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
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
  } = useMutation({
    mutationFn: async (data: TSendInvitationData) => {
      try {
        await apiClient.post('/invitations/invite', data);
      } catch (error: any) {
        showAlert({
          message: error?.response?.data?.message,
          severity: 'error',
        });
        throw new Error(error?.response?.data?.message);
      }
    },
    onSuccess: () => {
      setIsOpen(false);
      showAlert({
        message: TRANSLATIONS.INVITATION_SENT_SUCCESSFULLY,
        severity: 'success',
      });
    },
    onError: (error: any) => {
      showAlert({
        message: error?.response?.data?.message,
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
