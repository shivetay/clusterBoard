/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { styled, Typography } from '@mui/material';

export const PageHeaderStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 2,
  fontSize: theme.typography.h3.fontSize,
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    fontSize: theme.typography.h4.fontSize,
  },
}));
