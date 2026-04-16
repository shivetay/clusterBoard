'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { normalizeAppError, resolveApiErrorMessage } from '@/lib/utils';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { AppError, TStageFormData } from '@/types';
import apiClient from '../apiClient';

export const useEditStage = (stage_id: string) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    mutate: editStage,
    isPending,
    error,
  } = useMutation<void, AppError, TStageFormData>({
    mutationFn: async (data: TStageFormData) => {
      try {
        await apiClient.patch(`/stages/${stage_id}`, data);
      } catch (error: unknown) {
        const appError = normalizeAppError(error);
        showAlert({
          message: resolveApiErrorMessage(appError),
          severity: 'error',
        });
        throw appError;
      }
    },
    onSuccess: () => {
      router.refresh();

      setIsOpen(false);
      showAlert({
        message: TRANSLATION_GROUPS.STAGES.STAGE_EDITED_SUCCESSFULLY,
        severity: 'success',
      });
    },
    onError: (error: AppError) => {
      setIsOpen(true);
      showAlert({
        message: resolveApiErrorMessage(error),
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
