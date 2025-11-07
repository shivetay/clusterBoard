'use client';
import { styled } from '@mui/material';

export const HeaderContainer = styled('header')(({ theme }) => ({
  gridArea: 'header',
  borderBottom: `1px solid ${theme.palette.border.main}`,
  display: 'flex',
  width: '100%',
  height: '64px',
  alignItems: 'center',
}));
