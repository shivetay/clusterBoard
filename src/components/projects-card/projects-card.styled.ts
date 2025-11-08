import { Box, Card, styled } from '@mui/material';

export const CardWrapper = styled(Box)<{ cardColor: string }>(
  ({ theme, cardColor }) => ({
    position: 'relative',
    maxWidth: theme.spacing(24),
    minHeight: theme.spacing(24),
    width: theme.spacing(24),
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
  width: theme.spacing(24),
  height: '100%',
  minHeight: theme.spacing(24),
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
