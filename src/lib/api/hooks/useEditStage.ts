'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { TStageFormData } from '@/types';
import apiClient from '../apiClient';

export const useEditStage = (stage_id: string) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    mutate: editStage,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: TStageFormData) => {
      try {
        await apiClient.patch(`/stages/${stage_id}`, data);
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
        message: TRANSLATIONS.STAGE_EDITED_SUCCESSFULLY,
        severity: 'success',
      });
    },
    onError: () => {
      showAlert({
        message: TRANSLATIONS.ERROR_EDIT_STAGE,
        severity: 'error',
      });
    },
  });

  return {
    editStage,
    isPending,
    error,
  };
};
