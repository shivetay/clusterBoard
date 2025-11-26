/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  margin: theme.spacing(0, 'auto'),
  padding: theme.spacing(0, '1.5rem', '1.5rem', '1.5rem'),
  maxWidth: theme.spacing(160),
  width: '100%',

  [theme.breakpoints.down('sm')]: {},
}));
