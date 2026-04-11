/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, styled } from '@mui/material';

export const ClusterCardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  maxWidth: theme.spacing(144),
  gap: theme.spacing(3),
  margin: theme.spacing(0, 'auto'),
  width: '100%',
  minWidth: 0,

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: `max(${theme.spacing(2)}, env(safe-area-inset-left, 0px))`,
    paddingRight: `max(${theme.spacing(2)}, env(safe-area-inset-right, 0px))`,
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: theme.spacing(1.5),
    paddingBottom: theme.spacing(2),
    paddingLeft: `max(${theme.spacing(1.5)}, env(safe-area-inset-left, 0px))`,
    paddingRight: `max(${theme.spacing(1.5)}, env(safe-area-inset-right, 0px))`,
  },
}));
