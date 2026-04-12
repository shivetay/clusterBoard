/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Stack, styled } from '@mui/material';

const FOOTER_FONT_SIZE = 1;
const FOOTER_PADDING = 1;
const FOOTER_HEIGHT = 12;

export const FooterContainer = styled('footer')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
  alignItems: 'center',
  columnGap: theme.spacing(2),
  minHeight: theme.spacing(FOOTER_HEIGHT),
  paddingTop: theme.spacing(1),
  paddingBottom: `max(${theme.spacing(1)}, env(safe-area-inset-bottom, 0px))`,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  backdropFilter: 'blur(16px)',
  width: '100%',
  borderTop: `1px solid ${theme.palette.border.secondary}`,
  backgroundColor: theme.palette.background.transparent,

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(1.5),
  },
}));

/** Privacy / cookies / terms + copyright: visually centered in the footer bar */
export const FooterContent = styled(Stack)(({ theme }) => ({
  gridColumn: 2,
  gridRow: 1,
  justifySelf: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minWidth: 0,
  [theme.breakpoints.down('sm')]: {
    gridColumn: 'auto',
    gridRow: 'auto',
    justifySelf: 'center',
    alignSelf: 'center',
    order: 1,
  },
  '& span': {
    fontSize: theme.spacing(FOOTER_FONT_SIZE),
    padding: theme.spacing(FOOTER_PADDING),
  },
}));

/** Contact block: right column on wide screens, bottom-right on narrow screens */
export const FooterContact = styled(Stack)(({ theme }) => ({
  gridColumn: 3,
  gridRow: 1,
  justifySelf: 'end',
  flexDirection: 'column',
  alignItems: 'flex-end',
  textAlign: 'right',
  minWidth: 0,
  [theme.breakpoints.down('sm')]: {
    gridColumn: 'auto',
    gridRow: 'auto',
    alignSelf: 'flex-end',
    order: 2,
  },
  '& span': {
    fontSize: theme.spacing(FOOTER_FONT_SIZE),
  },
}));
