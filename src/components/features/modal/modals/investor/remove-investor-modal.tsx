'use client';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/ui';
import apiClient from '@/lib/api/apiClient';
import { resolveApiErrorMessage } from '@/lib/utils/resolve-api-error-message';
import { TRANSLATION_GROUPS } from '@/locales';
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
        message: t(TRANSLATION_GROUPS.INVESTORS.INVESTOR_REMOVED_SUCCESSFULLY),
        severity: 'success',
      });
      setIsDeleting(false);
    } catch (error: unknown) {
      const message = resolveApiErrorMessage(error);
      showAlert({
        message:
          message || t(TRANSLATION_GROUPS.INVESTORS.ERROR_REMOVE_INVESTOR),
        severity: 'error',
      });
      setIsDeleting(false);
      throw new Error(message);
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
              {t(TRANSLATION_GROUPS.INVESTORS.REMOVE_INVESTOR_MODAL_TITLE)}
            </AddProjectModalTitle>
          </AddProjectModalHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              width: '100%',
            }}
          >
            <ModalButton
              onClick={() => setIsOpen(false)}
              variant="outlined"
              color="secondary"
            >
              {t(TRANSLATION_GROUPS.COMMON.CANCEL)}
            </ModalButton>
            <ModalButton
              onClick={handleRemoveInvestor}
              variant="contained"
              color="primary"
            >
              {t(TRANSLATION_GROUPS.INVESTORS.INVESTOR_REMOVE_BTN)}
            </ModalButton>
          </Box>
        </>
      )}
    </AddProjectModalContainer>
  );
}
