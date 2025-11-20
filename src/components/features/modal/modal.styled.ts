'use client';
import { Box, Dialog, FormHelperText, styled, Typography } from '@mui/material';
import { FormComponent } from '@/components/ui';

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

export const AddProjectModalContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const AddProjectModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const AddProjectModalForm = styled(FormComponent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const HelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  marginLeft: 0,
}));
