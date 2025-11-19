'use client';
import { Box, Dialog, styled } from '@mui/material';

export const ModalContainer = styled(Dialog)(({ theme }) => ({
  borderRadius: '16px',
  background: theme.palette.background.transparent,
  boxShadow: `0 4px 30px ${theme.palette.border.main}`,
  backdropFilter: 'blur(8.4px)',
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    background: theme.palette.background.transparent,
    backdropFilter: 'blur(8.4px)',
  },
}));

export const ModalContentWrapper = styled(Box)(() => ({
  padding: '1rem',
  minHeight: '100px',
}));

export const CloseButtonWrapper = styled(Box)({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  zIndex: 1,
});
