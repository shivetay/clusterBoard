'use client';
import { Box, styled } from '@mui/material';

export const ModalContentWrapper = styled(Box)({
  padding: '1rem',
  minHeight: '100px',
});

export const CloseButtonWrapper = styled(Box)({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  zIndex: 1,
});
