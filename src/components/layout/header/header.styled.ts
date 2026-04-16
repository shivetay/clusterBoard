/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { styled } from '@mui/material';
import { glassEffects } from '@/theme';

export const HeaderContainer = styled('header')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  minHeight: '54px',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(4, 2),
  paddingLeft: `max(${theme.spacing(2)}, env(safe-area-inset-left, 0px))`,
  paddingRight: `max(${theme.spacing(2)}, env(safe-area-inset-right, 0px))`,
  ...glassEffects.light,

  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: `max(${theme.spacing(1.5)}, env(safe-area-inset-left, 0px))`,
    paddingRight: `max(${theme.spacing(1.5)}, env(safe-area-inset-right, 0px))`,
  },
}));
