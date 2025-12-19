'use client';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormHelperText, Loader } from '@/components/ui';
import { useEditStage } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import {
  AddProjectModalContainer,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

export function CloseStageModal({ stage_id }: { stage_id: string }) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
  const { editStage, isPending } = useEditStage(stage_id);

  const handleCloseStage = async () => {
    editStage({ is_done: true });
  };

  return (
    <AddProjectModalContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATIONS.CLOSE_STAGE_MODAL_TITLE)}
            </AddProjectModalTitle>
            <FormHelperText>
              {t(TRANSLATIONS.CLOSE_STAGE_MODAL_HELPER)}
            </FormHelperText>
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
              onClick={handleCloseStage}
              variant="contained"
              color="primary"
            >
              {t(TRANSLATIONS.CLOSE_STAGE_BTN)}
            </ModalButton>
          </Box>
        </>
      )}
    </AddProjectModalContainer>
  );
}
