'use client';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/ui';
import apiClient from '@/lib/api/apiClient';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import {
  AddProjectModalContainer,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

export function RemoveStageModal({ stage_id }: { stage_id: string }) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemoveStage = async () => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/stages/${stage_id}`);

      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
      router.refresh();

      setIsOpen(false);
      showAlert({
        message: t(TRANSLATIONS.SUCCESS_REMOVE_STAGE),
        severity: 'success',
      });
    } catch {
      showAlert({
        message: t(TRANSLATIONS.ERROR_REMOVE_STAGE),
        severity: 'error',
      });
      setIsDeleting(false);
    }
  };

  return (
    <AddProjectModalContainer>
      {isDeleting ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATIONS.REMOVE_STAGE_MODAL_TITLE)}
            </AddProjectModalTitle>
          </AddProjectModalHeader>
          <Box display="flex" flexDirection="row" gap={2} width="100%">
            <ModalButton
              onClick={() => setIsOpen(false)}
              variant="outlined"
              color="secondary"
            >
              {t(TRANSLATIONS.CANCEL)}
            </ModalButton>
            <ModalButton
              onClick={handleRemoveStage}
              variant="contained"
              color="primary"
            >
              {t(TRANSLATIONS.PROJECT_REMOVE_BTN)}
            </ModalButton>
          </Box>
        </>
      )}
    </AddProjectModalContainer>
  );
}
