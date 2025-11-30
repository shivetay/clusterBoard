/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { styled } from '@mui/material';

export const HeaderContainer = styled('header')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '64px',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  paddingTop: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingRight: 0,
  },
}));
