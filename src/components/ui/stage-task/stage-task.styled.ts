'use client';
import { Box, FormControlLabel, styled } from '@mui/material';
import { glassEffects } from '@/theme';

export const StageTaskContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  border: `1px solid ${theme.palette.border.main}`,
  padding: theme.spacing(2),
}));

export const TaskRadio = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  width: 'max-content',
  '& .MuiRadio-root': {
    width: '20px',
    height: '20px',
    color: theme.palette.text.primary,
    '&.Mui-checked': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    marginLeft: theme.spacing(1),
  },
  '&:has(.MuiRadio-root.Mui-checked) .MuiFormControlLabel-label': {
    color: theme.palette.text.tertiary,
    textDecoration: 'line-through',
  },
}));

export const CommentContainer = styled(Box)(({ theme }) => ({
  ...glassEffects.light,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const CommentText = styled('span')(({ theme }) => ({
  color: theme.palette.text.tertiary,
  fontSize: theme.typography.body2.fontSize,
  padding: theme.spacing(1),
}));

export const CommentDetails = styled('span')(({ theme }) => ({
  color: theme.palette.text.tertiary,
  fontSize: theme.typography.body2.fontSize,
  padding: theme.spacing(1),
}));
