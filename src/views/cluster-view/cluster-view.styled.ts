/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, styled } from '@mui/material';

export const ClusterCardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  maxWidth: theme.spacing(144),
  gap: theme.spacing(3),
  margin: theme.spacing(0, 'auto'),

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    padding: theme.spacing(0, '1.5rem', '1.5rem', '1.5rem'),
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    padding: theme.spacing(0, '1.5rem', '1.5rem', '1.5rem'),
  },
}));
