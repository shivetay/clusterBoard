'use client';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  modalContent: ReactNode | null;
  setModalContent: (content: ReactNode | null) => void;
}

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
  modalContent: null,
  setModalContent: () => {},
});

export function ModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Clear content when closing modal
      setModalContent(null);
    }
  };

  const handleSetModalContent = (content: ReactNode | null) => {
    setModalContent(content);
    if (content) {
      setIsOpen(true);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen: handleSetIsOpen,
        modalContent,
        setModalContent: handleSetModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
