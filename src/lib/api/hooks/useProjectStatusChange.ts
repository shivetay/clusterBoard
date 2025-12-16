import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAlert, useModal } from '@/providers';
import apiClient from '../apiClient';

type TProjectStatus = 'zakończony' | 'w toku' | 'w przygotowaniu';

export const useProjectStatusChange = (
  projectId: string,
  successMessage: string,
) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();

  const {
    mutate: changeStatus,
    isPending,
    error,
  } = useMutation({
    mutationFn: (project_status: TProjectStatus) => {
      try {
        return apiClient.patch(`projects/${projectId}/status`, {
          project_status,
        });
      } catch (error: any) {
        showAlert({
          message: error?.response?.data?.message,
          severity: 'error',
        });
        throw new Error(error?.response?.data?.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
      router.refresh();
      setIsOpen(false);
      showAlert({
        message: successMessage,
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
    changeStatus,
    isPending,
    error,
  };
};
