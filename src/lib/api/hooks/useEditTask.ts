import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { TTaskData } from '@/types';
import apiClient from '../apiClient';

export const useEditTask = (taskId: string) => {
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: editTask,
    isPending,
    error,
  } = useMutation({
    mutationFn: (taskData: TTaskData) => {
      try {
        return apiClient.patch(`/tasks/${taskId}`, taskData);
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
        message: TRANSLATIONS.TASK_EDITED_SUCCESSFULLY,
        severity: 'success',
      });
    },
  });

  return {
    editTask,
    isPending,
    error,
  };
};
