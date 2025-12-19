'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TRANSLATIONS } from '@/locales';
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
        message: TRANSLATIONS.PROJECT_EDITED_SUCCESSFULLY,
        severity: 'success',
      });
    },
    onError: (error: any) => {
      setIsOpen(true);
      showAlert({
        message: error?.response?.data?.message,
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
