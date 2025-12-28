'use client';

import { Box, IconButton, styled } from '@mui/material';
import { CustomButton } from '@/components';
import { glassEffects } from '@/theme';

export const BackButton = styled(CustomButton)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginLeft: 0,
}));

export const InvitationsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  ...glassEffects.medium,
  borderRadius: '2px',
  position: 'relative',
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: 0,
  margin: 0,
  minWidth: '24px',
  color: theme.palette.text.secondary,
  '& svg': {
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.background.gradientText,
  },
}));
