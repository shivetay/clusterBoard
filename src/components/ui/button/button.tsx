'use client';
import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';

export function CustomButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      sx={{ margin: '0 0.5rem 0 0.5rem', borderRadius: '1px' }}
      {...props}
    >
      {children}
    </Button>
  );
}
