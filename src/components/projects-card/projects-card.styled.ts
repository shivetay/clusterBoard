/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, styled, Typography } from '@mui/material';
import Link from 'next/link';

export const ProjectsCardWrapper = styled(Link)(({ theme }) => ({
  margin: theme.spacing(3, 0),
}));

export const CardWrapper = styled(Box)<{ cardColor: string }>(
  ({ theme, cardColor }) => ({
    position: 'relative',
    width: theme.spacing(48),
    borderRadius: '2.25rem',
    backdropFilter: 'blur(7px)',
    WebkitBackdropFilter: 'blur(7px)',
    background: `linear-gradient(
      45deg,
      rgba(35, 34, 40, 0.35),
      rgba(35, 34, 40, 0.35),
      rgba(35, 34, 40, 0.35),
      rgba(35, 34, 40, 0.35),
      ${cardColor}
    )`,
  }),
);

export const CardContainer = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'cardColor',
})<{ cardColor: string }>(({ cardColor, theme }) => ({
  position: 'relative',
  width: theme.spacing(48),
  height: '100%',
  display: 'grid',
  placeContent: 'center',
  placeItems: 'center',
  textAlign: 'center',
  borderRadius: '2.25rem',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  background: `radial-gradient(
      ellipse at right top,
      ${cardColor}ed 0%,
rgba(21, 20, 25, 0.4) 47%,
rgba(21, 20, 25, 0.4) 100%
    )`,
  boxShadow: `0.063em 0.75em 1.563em ${cardColor}80`,
  border: 'none',
  '& .MuiCardActionArea-root': {
    borderRadius: '2.25rem',
    height: '100%',
  },
}));

export const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3),
}));

export const ProjectInfoContainer = styled(Box)(() => ({
  display: 'flex',
  alignContent: 'space-between',
  justifyContent: 'center',
}));

export const ProjectInvestors = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  margin: theme.spacing(0, 1),
  '& span': {
    marginLeft: theme.spacing(1),
  },
}));
