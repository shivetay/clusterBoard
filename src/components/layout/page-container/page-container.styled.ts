/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  margin: '0 auto',
  padding: theme.spacing(0, 4.25, 3, 4.25),
  paddingLeft: `max(${theme.spacing(4.25)}, env(safe-area-inset-left, 0px))`,
  paddingRight: `max(${theme.spacing(4.25)}, env(safe-area-inset-right, 0px))`,
  maxWidth: theme.spacing(160),
  width: '100%',
  minWidth: 0,

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 3, 3, 3),
    paddingLeft: `max(${theme.spacing(3)}, env(safe-area-inset-left, 0px))`,
    paddingRight: `max(${theme.spacing(3)}, env(safe-area-inset-right, 0px))`,
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2, 2, 2),
    paddingLeft: `max(${theme.spacing(2)}, env(safe-area-inset-left, 0px))`,
    paddingRight: `max(${theme.spacing(2)}, env(safe-area-inset-right, 0px))`,
  },
}));
