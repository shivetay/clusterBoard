/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Stack, styled } from '@mui/material';

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3.75, 1),
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

export const ProjectsContainer = styled(Stack)(() => ({}));
