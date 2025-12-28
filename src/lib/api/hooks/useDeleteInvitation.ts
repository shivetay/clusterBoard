import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TRANSLATIONS } from '@/locales';
import { useAlert } from '@/providers';
import apiClient from '../apiClient';

const ALERT_TIMEOUT = 100;

export const useDeleteInvitation = () => {
  const { showAlert } = useAlert();
  const router = useRouter();

  const {
    mutate: deleteInvitation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (invitationId: string) => {
      const response = await apiClient.delete(`/invitations/${invitationId}`);
      return response.data;
    },
    onSuccess: () => {
      showAlert({
        message: TRANSLATIONS.INVITATION_DELETED_SUCCESSFULLY,
        severity: 'success',
      });
      // Refresh the page to update the invitations list
      // Use setTimeout to ensure the alert is shown before refresh
      setTimeout(() => {
        router.refresh();
      }, ALERT_TIMEOUT);
    },
    onError: (error: any) => {
      showAlert({
        message:
          error?.response?.data?.message ||
          TRANSLATIONS.ERROR_DELETE_INVITATION,
        severity: 'error',
      });
    },
  });

  return {
    deleteInvitation,
    isPending,
    error,
  };
};
