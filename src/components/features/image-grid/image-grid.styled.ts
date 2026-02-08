'use client';
import { styled } from '@mui/material';
import { CustomButton } from '@/components/ui';

export const ActionButtons = styled(CustomButton)(({ theme }) => ({
  padding: 0,
  margin: 0,
  marginLeft: theme.spacing(1),
  minWidth: '24px',

  '& svg': {
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.background.gradientText,
  },
}));
