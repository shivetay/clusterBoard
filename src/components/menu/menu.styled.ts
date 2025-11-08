'use client';
import { Stack, styled } from '@mui/material';
import { CustomButton } from '../button';

export const MenuContainer = styled(Stack)(() => ({
  gridArea: 'menu',
  width: '74px',
}));

export const MenuButton = styled(CustomButton)(({ theme }) => ({
  width: '124px',
  height: '40px',
  margin: theme.spacing(2),
}));
