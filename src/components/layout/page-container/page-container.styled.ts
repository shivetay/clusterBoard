/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  gridArea: 'main',
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    width: '100vw',
  },
}));
