/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Input, InputLabel, styled, TextareaAutosize } from '@mui/material';

export const Label = styled(InputLabel)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.tertiary,
  fontWeight: 500,
  lineHeight: 1.25,
  marginBottom: theme.spacing(1),
}));

export const HelperText = styled('p')(({ theme }) => ({
  color: theme.palette.text.tertiary,
  fontSize: theme.typography.pxToRem(10),
}));

export const InputField = styled(Input)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.secondary}`,
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(10),
  backgroundColor: theme.palette.background.bgLight,
}));

export const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.secondary}`,
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(10),
  backgroundColor: theme.palette.background.bgLight,
  color: theme.palette.text.primary,
}));
