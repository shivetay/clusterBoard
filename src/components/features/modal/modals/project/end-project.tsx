import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/ui';
import { useProjectStatusChange } from '@/lib/api/hooks/useProjectStatusChange';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import {
  AddProjectModalContainer,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

const PROJECT_STATUS = 'zakończony';

export function EndProjectModal({ projectId }: { projectId: string }) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
  const { changeStatus, isPending } = useProjectStatusChange(
    projectId,
    t(TRANSLATIONS.PROJECT_ENDED_SUCCESSFULLY),
  );

  const handleEndProject = () => {
    changeStatus(PROJECT_STATUS);
  };

  return (
    <AddProjectModalContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATIONS.PROJECT_END_MODAL_TITLE)}
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
              onClick={handleEndProject}
              variant="contained"
              color="primary"
            >
              {t(TRANSLATIONS.PROJECT_END_BTN)}
            </ModalButton>
          </Box>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default EndProjectModal;
