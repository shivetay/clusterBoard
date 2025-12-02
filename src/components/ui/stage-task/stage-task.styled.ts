'use client';
import { FormControlLabel, styled } from '@mui/material';

export const StageTaskContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  border: `1px solid ${theme.palette.border.main}`,
  padding: theme.spacing(2),
}));

export const TaskRadio = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
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
