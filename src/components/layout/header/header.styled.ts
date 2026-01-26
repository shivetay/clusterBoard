/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { styled } from '@mui/material';
import { glassEffects } from '@/theme';

export const HeaderContainer = styled('header')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '64px',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(6, 2),
  ...glassEffects.light,

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingRight: 0,
  },
}));
