'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { resolveApiErrorMessage } from '@/lib/utils/resolve-api-error-message';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { TFormData } from '@/types';
import apiClient from '../apiClient';

export const useEditProject = (projectId: string) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    mutate: editProject,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: TFormData) => {
      try {
        await apiClient.patch(`/projects/${projectId}`, data);
      } catch (error: unknown) {
        showAlert({
          message: resolveApiErrorMessage(error),
          severity: 'error',
        });
      }
    },
    onSuccess: () => {
      router.refresh();

      setIsOpen(false);
      showAlert({
        message: TRANSLATION_GROUPS.PROJECTS.PROJECT_EDITED_SUCCESSFULLY,
        severity: 'success',
      });
    },
    onError: (error: unknown) => {
      setIsOpen(true);
      showAlert({
        message: resolveApiErrorMessage(error),
        severity: 'error',
      });
    },
  });

  return {
    editProject,
    isPending,
    error,
  };
};
