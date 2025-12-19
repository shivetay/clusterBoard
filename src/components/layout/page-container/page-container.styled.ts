/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  margin: '0 auto',
  padding: theme.spacing(0, 4.25, 3, 4.25),
  maxWidth: theme.spacing(160),
  width: '100%',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 3, 3, 3),
  },
}));
