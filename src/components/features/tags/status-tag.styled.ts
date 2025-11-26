/** biome-ignore-all lint/style/noMagicNumbers: <styled> */
'use client';
import { Chip, styled } from '@mui/material';

export const StatusTagStyled = styled(Chip)(({ theme }) => ({
  fontSize: theme.spacing(1.5),
  fontWeight: 500,
  color: theme.palette.background.gradientText,
  backgroundColor: theme.palette.background.primaryTransparent,
  borderRadius: 0,
  border: `1px solid ${theme.palette.background.gradientText}`,
  padding: theme.spacing(0, 1),
  marginTop: theme.spacing(1),
}));
