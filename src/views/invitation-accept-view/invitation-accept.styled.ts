/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, styled, Typography } from '@mui/material';
import { glassEffects } from '@/theme';

export const InvitationAcceptContainer = styled(Box)(({ theme }) => ({
  height: 'max-content',
  width: '448px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '100%',
    width: '100%',
  },
}));

export const InvitationAcceptCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  padding: theme.spacing(4),
}));

export const InvitationAcceptHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: theme.typography.h3.fontSize,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h4.fontSize,
    marginBottom: theme.spacing(2),
  },
}));

export const InvitationAcceptContent = styled(Box)(({ theme }) => ({
  ...glassEffects.light,
  color: theme.palette.text.secondary,
}));

export const ProjectTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.tertiary,
}));

export const Header = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));
