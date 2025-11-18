'use client';
import { Stack, styled } from '@mui/material';
import { CustomButton } from '../button';

export const MenuContainer = styled(Stack)(({ theme }) => ({
  gridArea: 'menu',
  width: '74px',

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const MenuButton = styled(CustomButton)(({ theme }) => ({
  width: '124px',
  height: '40px',
  margin: theme.spacing(2),
}));
