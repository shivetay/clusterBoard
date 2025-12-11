import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';

export const useAddStageTasks = (stageId: string) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();

  const {
    mutate: addTasks,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (data: string[]) => {
      try {
        await apiClient.post(`/tasks/${stageId}/add`, { stage_task: data });
      } catch (error: any) {
        showAlert({
          message: error?.response?.data?.message,
          severity: 'error',
        });
      }
    },
    onSuccess: () => {
      router.refresh();
      setIsOpen(false);
      showAlert({
        message: TRANSLATIONS.PROJECT_STAGE_ADDED_SUCCESSFULLY,
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
    addTasks,
    error,
    isPending,
  };
};
