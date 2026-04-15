'use client';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/ui';
import apiClient from '@/lib/api/apiClient';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import {
  AddProjectModalContainer,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

export function RemoveProjectModal({ projectId }: { projectId: string }) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
  const { showAlert } = useAlert();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemoveProject = async () => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/projects/${projectId}`);

      queryClient.invalidateQueries({ queryKey: ['user-projects'] });

      setIsOpen(false);
      router.push('/projects');
    } catch {
      showAlert({
        message: t(TRANSLATION_GROUPS.ERRORS.ERROR_REMOVE_PROJECT),
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
              {t(TRANSLATION_GROUPS.PROJECTS.REMOVE_PROJECT_MODAL_TITLE)}
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
              onClick={handleRemoveProject}
              variant="contained"
              color="primary"
            >
              {t(TRANSLATION_GROUPS.PROJECTS.PROJECT_REMOVE_BTN)}
            </ModalButton>
          </Box>
        </>
      )}
    </AddProjectModalContainer>
  );
}
