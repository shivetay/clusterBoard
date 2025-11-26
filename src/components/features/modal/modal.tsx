'use client';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useModal } from '@/providers';
import {
  CloseButton,
  CloseButtonWrapper,
  DialogContainer,
  ModalContainer,
  ModalContentWrapper,
} from './modal.styled';

export function Modal() {
  const { isOpen, setIsOpen, modalContent, showCloseButton } = useModal();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      setContainer(modalRoot);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!container) {
    return null;
  }

  return (
    <ModalContainer
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      container={container}
    >
      {showCloseButton && (
        <CloseButtonWrapper>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </CloseButtonWrapper>
      )}
      <DialogContainer>
        <ModalContentWrapper>{modalContent}</ModalContentWrapper>
      </DialogContainer>
    </ModalContainer>
  );
}

export default Modal;
