import { useMutation } from '@tanstack/react-query';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import apiClient from '../apiClient';

export const useSendInvitation = () => {
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    mutate: sendInvitation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: any) => {
      try {
        await apiClient.post('/invitations/invite', data);
      } catch (error: any) {
        showAlert({
          message: error?.response?.data?.message,
          severity: 'error',
        });
        throw new Error(error);
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
