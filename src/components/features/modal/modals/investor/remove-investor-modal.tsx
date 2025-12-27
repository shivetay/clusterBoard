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

export function RemoveInvestorModal({
  projectId,
  investorId,
}: {
  projectId: string;
  investorId: string;
}) {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleRemoveInvestor = async () => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/investors/${projectId}/delete/${investorId}`);
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
      router.refresh();
      setIsOpen(false);
      showAlert({
        message: t(TRANSLATIONS.INVESTOR_REMOVED_SUCCESSFULLY),
        severity: 'success',
      });
      setIsDeleting(false);
    } catch {
      showAlert({
        message: t(TRANSLATIONS.ERROR_REMOVE_INVESTOR),
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
              {t(TRANSLATIONS.REMOVE_INVESTOR_MODAL_TITLE)}
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
              onClick={handleRemoveInvestor}
              variant="contained"
              color="primary"
            >
              {t(TRANSLATIONS.INVESTOR_REMOVE_BTN)}
            </ModalButton>
          </Box>
        </>
      )}
    </AddProjectModalContainer>
  );
}
