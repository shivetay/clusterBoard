'use client';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, IconButton } from '@mui/material';
import { useModal } from '@/providers';
import {
  CloseButtonWrapper,
  ModalContainer,
  ModalContentWrapper,
} from './modal.styled';

export function Modal() {
  const { isOpen, setIsOpen, modalContent } = useModal();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContainer open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <CloseButtonWrapper>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </CloseButtonWrapper>
      <DialogContent>
        <ModalContentWrapper>{modalContent}</ModalContentWrapper>
      </DialogContent>
    </ModalContainer>
  );
}

export default Modal;
