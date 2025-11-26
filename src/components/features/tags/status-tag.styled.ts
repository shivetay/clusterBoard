/** biome-ignore-all lint/style/noMagicNumbers: <styled> */
'use client';
import { Chip, styled } from '@mui/material';

export const StatusTagStyled = styled(Chip)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.body2.fontWeight,
  lineHeight: theme.typography.body2.lineHeight,
  letterSpacing: theme.typography.body2.letterSpacing,
  color: theme.palette.background.gradientText,
  backgroundColor: theme.palette.background.primaryTransparent,
  borderRadius: '1px',
  border: `1px solid ${theme.palette.background.gradientText}`,
  padding: theme.spacing(0, 1),
  marginTop: theme.spacing(1),
}));
