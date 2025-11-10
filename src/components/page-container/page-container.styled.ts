/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  gridArea: 'main',
  // marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  padding: theme.spacing(3.75, 1),
}));
