'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { useModal } from '@/providers';
import { CloseButtonWrapper, ModalContentWrapper } from './modal.styled';

export function Modal() {
  const { isOpen, setIsOpen, modalContent } = useModal();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          background: 'rgba(35, 34, 40, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
      }}
    >
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
    </Dialog>
  );
}

export default Modal;
