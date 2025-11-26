/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { styled } from '@mui/material';

export const Hex = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-4),
  right: theme.spacing(-4),
  width: theme.spacing(12),
  height: theme.spacing(12),

  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  backgroundColor: theme.palette.background.primaryTransparent,
}));
