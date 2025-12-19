'use client';
import {
  Box,
  Dialog,
  DialogContent,
  FormHelperText,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { CustomButton, FormComponent } from '@/components/ui';

export const DialogContainer = styled(DialogContent)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  transition: 'color 0.3s ease',
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover svg': {
    color: theme.palette.background.gradientText,
  },

  [theme.breakpoints.down('sm')]: {
    padding: 0,

    '& svg': {
      width: '16px',
      height: '16px',
    },
  },
}));

export const ModalContainer = styled(Dialog)(({ theme }) => ({
  background: theme.palette.background.transparent,
  boxShadow: `0 4px 30px ${theme.palette.border.main}`,
  backdropFilter: 'blur(16px)',

  '& .MuiDialog-paper': {
    background: theme.palette.background.bgLightTransparent,
    backdropFilter: 'blur(16px)',
    maxWidth: '450px',
    border: `1px solid ${theme.palette.border.secondary}`,
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
  fontSize: theme.typography.h3.fontSize,
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
}));

export const AddProjectModalForm = styled(FormComponent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
}));

export const HelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  marginLeft: 0,
}));

export const AddProjectModalHeader = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

export const ModalButton = styled(CustomButton)(({ theme }) => ({
  transition: 'background-color 0.3s ease, color 0.3s ease',
  width: '100%',
  margin: 0,
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}AA`,
    color: theme.palette.text.primary,
  },
}));
